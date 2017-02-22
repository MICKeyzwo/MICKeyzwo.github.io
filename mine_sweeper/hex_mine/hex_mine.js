window.addEventListener("load", () => {

  let time = document.getElementById("time");
  let flags = document.getElementById("flag");
  let reset = document.getElementById("reset");
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");

  let numColor = ["blue", "green", "red", "navy", "brown", "cyan"];
  function Panel(x, y, px, py){
    this.x = x;
    this.y = y;
    this.px = px;
    this.py = py;
    this.chain = 0;
    this.mine = false;
    this.num = 0;
    this.open = false;
    this.flag = false;
    this.neighbor = [];
  }
  Panel.prototype.draw = function(){
    if(!this.open){
      if(this.flag){
        ctx.fillStyle = "blue";
      }else{
        ctx.fillStyle = "gray";
      }
    }else{
      if(this.mine){
        ctx.fillStyle = "red";
      }else{
        ctx.fillStyle = "white";
      }
    }
    ctx.strokeStyle = "black";
    let rad = Math.PI / 6;
    ctx.beginPath();
    ctx.moveTo(this.x + 15 * Math.cos(rad), this.y + 15 * Math.sin(rad));
    for(let i = 0; i < 5; i++){
      rad += Math.PI / 3;
      ctx.lineTo(this.x + 15 * Math.cos(rad), this.y + 15 * Math.sin(rad));
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    if(this.open && this.num > 0){
      ctx.fillStyle = numColor[this.num - 1];
      ctx.font = "15pt bolder";
      ctx.fillText(this.num + "" ,this.x - 4, this.y + 6);
    }
  };
  Panel.prototype.addNeighbor = function(arg){
    this.neighbor.push(arg);
    arg.neighbor.push(this);
  };
  Panel.prototype.getLength = function(x, y){
    return Math.sqrt(Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2));
  };

  let length = 6;
  let mines = 10;
  let flagCount = 0;
  let panels;
  let clearPanels;
  let gameState = 0;
  let startTime;
  let timer;

  function ruleSet(){
    panels = new Array(length * 2 - 1);
    for(let i = 0; i < (length * 2 - 1); i++){
      panels[i] = new Array((length * 2 - 1) - Math.abs(i - length + 1));
    }
    for(let i = 0; i < panels.length; i++){
      for(let j = 0; j < panels[i].length; j++){
        panels[i][j] = new Panel(7.5 * Math.sqrt(3) * ((length * 2) - panels[i].length) + j * 15 * Math.sqrt(3),
                                 15 + i * 22.5, j, i);
      }
    }
    for(let i = 0; i < panels.length; i++){
      for(let j = 0; j < panels[i].length; j++){
        if(j < panels[i].length - 1) panels[i][j].addNeighbor(panels[i][j + 1]);
        if(i < Math.floor(panels.length / 2)){
          panels[i][j].addNeighbor(panels[i + 1][j]);
          panels[i][j].addNeighbor(panels[i + 1][j + 1]);
        }else{
          if(i < panels.length - 1 && j < panels[i].length - 1) panels[i][j].addNeighbor(panels[i + 1][j]);
          if(i < panels.length - 1 && j > 0) panels[i][j].addNeighbor(panels[i + 1][j - 1]);
        }
      }
    }
    canvas.width = (length * 2 - 1) * 15 * Math.sqrt(3);
    canvas.height = 7.5 + (length * 2 - 1) * 22.5;
  }
  function preSet(){
    clearInterval(timer);
    time.innerHTML = "0";
    flagCount = 0;
    flags.innerHTML = "0/" + mines;
    gameState = 0;
    for(let i = 0; i < panels.length; i++){
      for(let j = 0; j < panels[i].length; j++){
        panels[i][j].mine = false;
        panels[i][j].open = false;
        panels[i][j].num = 0;
        panels[i][j].flag = false;
      }
    }
    drawPanels();
  }
  function setUp(x, y){
    let rx;
    let ry;
    for(let i = 0; i < mines; i++){
      ry = ~~(Math.random() * panels.length);
      rx = ~~(Math.random() * panels[ry].length);
      if(!panels[ry][rx].mine && rx != x && ry != y){
        panels[ry][rx].mine = true;
      }else{
        i--;
      }
    }
    clearPanels = 0;
    for(let i = 0; i < panels.length; i++){
      for(let j = 0; j < panels[i].length; j++){
        clearPanels++;
        if(!panels[i][j].mine){
          let count = 0;
          for(let k = 0; k < panels[i][j].neighbor.length; k++){
            if(panels[i][j].neighbor[k].mine) count++;
          }
          if(count > 0) panels[i][j].num = count;
        }
      }
    }
    clearPanels -= mines;
  }
  function drawPanels(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let i = 0; i < panels.length; i++){
      for(let j = 0; j < panels[i].length; j++){
        panels[i][j].draw();
      }
    }
  }

  reset.addEventListener("click", () => {
    preSet();
  });
  canvas.addEventListener("contextmenu", function(e){
    e.preventDefault();
  });
  canvas.addEventListener("mousedown", canvasPushed);
  if(window.TouchEvent){
    canvas.addEventListener("touchstart", canvasPushed);
  }
  function canvasPushed(e){
    let rect = e.target.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    let pos = getPosition(x, y);
    if(pos){
      x = pos.x;
      y = pos.y;
      if(e.button == 0){
        if(gameState == 0){
          setUp(x, y);
          startTime = Date.now();
          timer = setInterval(() => {
            time.innerHTML = ~~((Date.now() - startTime) / 100) / 10;
          }, 1000 / 30);
          gameState = 1;
        }
        if(gameState == 1){
          pushed(x, y, true);
          let count = 0;
          for(let i = 0; i < panels.length; i++){
            for(let j = 0; j < panels[i].length; j++){
              if(panels[i][j].open) count++;
            }
          }
          if(count == clearPanels && gameState == 1){
            clearInterval(timer);
            gameState = 2;
            drawPanels();
            alert("Clear!!\nclear time:" + time.innerHTML);
          }
        }
      }else if(e.button == 2){
        if(gameState == 1){
          if(!panels[y][x].open){
            if(panels[y][x].flag){
              panels[y][x].flag = false;
              flags.innerHTML = --flagCount + "/" + mines;
            }else{
              panels[y][x].flag = true;
              flags.innerHTML = ++flagCount + "/" + mines;
            }
          }
        }
      }
    }
    drawPanels();
  }
  function pushed(x, y, flg){
    if(!panels[y][x].flag){
      if(!panels[y][x].open){
        panels[y][x].open = true;
        if(panels[y][x].mine){
          missed();
        }else{
          if(panels[y][x].num == 0){
            panels[y][x].chain = 1;
            let count = 1;
            while(count > 0){
              count = 0;
              for(let i = 0; i < panels.length; i++){
                for(let j = 0; j < panels[i].length; j++){
                  if(!panels[i][j].open && !panels[i][j].mine){
                    for(let k = 0; k < panels[i][j].neighbor.length; k++){
                      if(panels[i][j].neighbor[k].chain == 1 && panels[i][j].chain == 0){
                        if(panels[i][j].num == 0){
                          panels[i][j].chain = 1;
                        }else{
                          panels[i][j].chain = 2;
                        }
                        count++;
                      }
                    }
                  }
                }
              }
            }
            let mineFlg = false;
            for(let i = 0; i < panels.length; i++){
              for(let j = 0; j < panels[i].length; j++){
                if(panels[i][j].chain > 0 && !panels[i][j].flag){
                  panels[i][j].open = true;
                  panels[i][j].chain = 0;
                  if(panels[i][j].mine) mineFlg = true;
                }
              }
            }
            if(mineFlg){
              missed();
            }
          }
        }
      }else if(panels[y][x].num > 0 && flg){
        let count = 0;
        for(let i = 0; i < panels[y][x].neighbor.length; i++){
          if(panels[y][x].neighbor[i].flag) count++;
        }
        if(panels[y][x].num == count){
          for(let i = 0; i < panels[y][x].neighbor.length; i++){
            pushed(panels[y][x].neighbor[i].px, panels[y][x].neighbor[i].py, false);
          }
        }
      }
    }
  }
  function missed(){
    clearInterval(timer);
    gameState = 2;
    for(let i = 0; i < panels.length; i++){
      for(let j = 0; j < panels[i].length; j++){
        if(panels[i][j].mine) panels[i][j].open = true;
      }
    }
    drawPanels();
    alert("Game Over!!");
  }
  function getPosition(x, y){
    let min = Number.MAX_VALUE;
    let minx;
    let miny;
    for(let i = 0; i < panels.length; i++){
      for(let j = 0; j < panels[i].length; j++){
        let dis = panels[i][j].getLength(x, y);
        if(dis < min){
          min = dis;
          minx = j;
          miny = i;
        }
      }
    }
    if(min <= 15){
      return {x: minx, y: miny};
    }else{
      return false;
    }
  }

  document.getElementById("easy").addEventListener("click", () => {
    length = 6;
    mines = 10;
    ruleSet();
    preSet();
  });
  document.getElementById("normal").addEventListener("click", () => {
    length = 10;
    mines = 42;
    ruleSet();
    preSet();
  });
  document.getElementById("hard").addEventListener("click", () => {
    length = 13;
    mines = 96;
    ruleSet();
    preSet();
  });

  ruleSet();
  preSet();

});
