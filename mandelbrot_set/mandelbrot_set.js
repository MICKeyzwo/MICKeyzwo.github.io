window.addEventListener("load", () => {

  let canvas = getE("canvas");
  let ctx = canvas.getContext("2d");
  let ImaginaryNumber = getImaginaryNumberClass();
  let x1 = Number(getE("x1").value);
  let y1 = Number(getE("y1").value);
  let dis = Number(getE("dis").value);
  let deep = Number(getE("deep").value);
  let width = Number(getE("width").value);
  let height = ~~(width / 3 * 2);
  canvas.width = width;
  canvas.height = height;
  getE("x1").addEventListener("input", (e) => {
    x1 = Number(e.target.value);
  });
  getE("y1").addEventListener("input", (e) => {
    y1 = Number(e.target.value);
  });
  getE("dis").addEventListener("input", (e) => {
    dis = Number(e.target.value);
  });
  getE("deep").addEventListener("input", (e) => {
    deep = Number(e.target.value);
  });
  getE("width").addEventListener("input", (e) => {
    width = Number(e.target.value);
  });
  getE("repaint").addEventListener("click", () => {
    height = ~~(width / 3 * 2);
    canvas.width = width;
    canvas.height = height;
    makeMandelbrotSet(canvas, x1, y1, dis, deep, ctx);
  });
  makeMandelbrotSet(canvas, x1, y1, dis, deep, ctx);

  function makeMandelbrotSet(can, sx, sy, len, deep, ctx){
    let pd = new PixelDrawer(ctx.getImageData(0, 0, can.width, can.height));
    let colors = ["#ff7fff", "#7f7fff", "#7fffff", "#7fff7f", "#ffff7f"];
    for(let i = 0; i < can.height; i++){
      for(let j = 0; j < can.width; j++){
        let x = sx + j / can.width * len;
        let y = sy + i / can.height * (2 / 3) * len;
        let zr = new ImaginaryNumber(0, 0);
        let zn = new ImaginaryNumber(x, y);
        let flg = false;
        let col = 0;
        for(let k = 0; k < deep; k++){
          zr = zr.pow2().add(zn);
          if(zr.abs() > 2){
            flg = true;
            break;
          }
          col = k;
        }
        if(flg){
          pd.setColor(j, i, colors[col % 5]);
        }else{
          pd.setColor(j, i, 0, 0, 0, 255);
        }
      }
    }
    ctx.putImageData(pd.getImageData(), 0, 0);
  }

  function getImaginaryNumberClass(){
    function ImaginaryNumber(n, i){
      this.n = n;
      this.i = i;
    }
    ImaginaryNumber.prototype.abs = function(){
      return Math.sqrt(Math.pow(this.n, 2) + Math.pow(this.i, 2));
    }
    ImaginaryNumber.prototype.pow2 = function(){
      return new ImaginaryNumber(Math.pow(this.n, 2) - Math.pow(this.i, 2), 2 * this.n * this.i);
    }
    ImaginaryNumber.prototype.add = function(arg){
      return new ImaginaryNumber(this.n + arg.n, this.i + arg.i);
    }
    return ImaginaryNumber;
  }

  function getE(id){
    return document.getElementById(id);
  }
  
});
