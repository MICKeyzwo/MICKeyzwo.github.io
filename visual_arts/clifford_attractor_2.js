window.addEventListener("load", () => {
  "use strict";
  let canvas = getE("canvas");
  let ctx = canvas.getContext("2d");
  let canvasSize = Number(getE("size").value);
  canvas.width = canvas.height = canvasSize;
  getE("size").addEventListener("input", (e) => {
    canvasSize = Number(e.target.value);
  });
  let valuesE = "ABCD".split("").map((item) => {
    return getE("value" + item);
  });
  let values = valuesE.map((item) => {
    return Number(item.value);
  });
  valuesE.map((item) => {
    item.addEventListener("input", (e) => {
      values["ABCD".indexOf(e.target.id[5])] = Number(e.target.value);
    });
  });
  let canvasWrap = getE("canvasWrap");
  canvasWrap.style = `
    width: ${canvasSize}px;
    height: ${canvasSize}px;
  `;
  let fpsE = getE("fps");
  let dotsE = getE("dots");
  getE("gene").addEventListener("click", (e) => {generateSwitch(e)});

  let generating = false;
  let timer;
  let rx;
  let ry;
  let x;
  let y;
  let pd;
  let prop;
  let dotsCount;
  let lastTime;
  let fps;

  function generateSwitch(e){
    if(generating){
      clearInterval(timer);
      e.target.value = "generating start";
      fpsE.innerHTML = "fps:0";
      generating = false;
    }else{
      lastTime = Date.now();
      fps = 0;
      canvas.width = canvas.height = canvasSize;
      canvasWrap.style = `
        width: ${canvasSize}px;
        height: ${canvasSize}px;
      `;
      ctx.clearRect(0, 0, canvasSize, canvasSize);
      pd = new PixelDrawer(ctx.getImageData(0, 0, canvasSize, canvasSize));
      prop = getMaxValues();
      rx = 0;
      ry = 0;
      dotsCount = 0;
      timer = setInterval(generateAttractor, 0);
      e.target.value = "generating stop";
      generating = true;
    }
  }

  function generateAttractor(){
    for(let i = 0; i < 10; i++){
      x = Math.sin(values[0] * ry) + values[2] * Math.cos(values[0] * rx);
      y = Math.sin(values[1] * rx) + values[3] * Math.cos(values[1] * ry);
      rx = x;
      ry = y;
      let px = ~~((x - prop.minX) / prop.scale * canvasSize);
      let py = canvasSize - ~~((y - prop.minY) / prop.scale * canvasSize);
      pd.setColor(px, py, "#003399");
    }
    if(~~(lastTime / 1000) == ~~(Date.now() / 1000)){
      fps++;
    }else{
      fpsE.innerHTML = "fps:" + fps;
      fps = 0;
      lastTime = Date.now();
      ctx.putImageData(pd.getImageData(), 0, 0);
    }
    dotsCount += 10;
    dotsE.innerHTML = "dots:" + dotsCount;
  }

  function getMaxValues(){
    let pointX = [];
    let pointY = [];
    let rx = 0;
    let ry = 0;
    let x;
    let y;
    for(let i = 0; i < 1000; i++){
      x = Math.sin(values[0] * ry) + values[2] * Math.cos(values[0] * rx);
      y = Math.sin(values[1] * rx) + values[3] * Math.cos(values[1] * ry);
      pointX.push(x);
      pointY.push(y);
      rx = x;
      ry = y;
    }
    let minX = Number.MAX_VALUE;
    let maxX = -Number.MAX_VALUE;
    let minY = Number.MAX_VALUE;
    let maxY = -Number.MAX_VALUE;
    for(let i = 0; i < 1000; i++){
      if(pointX[i] < minX) minX = pointX[i];
      if(pointX[i] > maxX) maxX = pointX[i];
      if(pointY[i] < minY) minY = pointY[i];
      if(pointY[i] > maxY) maxY = pointY[i];
    }
    minX *= 1.05;
    maxX *= 1.05;
    minY *= 1.05;
    maxY *= 1.05;
    let scale = maxX - minX > maxY - minY ? maxX - minX : maxY - minY;
    return {
      minX: minX,
      maxX: maxX,
      minY: minY,
      maxY: maxY,
      scale: scale
    };
  }

  function getE(id){
    return document.getElementById(id);
  }
});
