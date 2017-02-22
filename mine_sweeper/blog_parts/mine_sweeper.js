(() => {

  //UIを設定、画面上に反映
  let wrapper = document.createElement("div");
  wrapper.style = `
    width: 150px;
    height: 180px;
    border: solid 1px black;
    background-color: white;
    padding: 0px;
    text-align: center;
  `;
  let controls = document.createElement("div");
  controls.style = `
    margin: 5px;
    padding: 0px;
    display: inline-block;
  `;
  let time = document.createElement("span");
  time.style = `
    background-color: #ddd
  `;
  time.innerHTML = "0";
  controls.appendChild(time);
  let reset = document.createElement("button");
  reset.style = `

  `;
  reset.type = "button";
  reset.innerHTML = "reset";
  controls.appendChild(reset);
  let flags = document.createElement("span");
  flags.style = `
    background-color: #ddd;
  `;
  flags.innerHTML = "0";
  controls.appendChild(flags);
  wrapper.appendChild(controls);
  let canvas = document.createElement("canvas");
  canvas.style = `
    border: solid 1px black;
    background-color: white;
    margin-left: 50%;
    transform: translateX(-50%);
  `;
  canvas.width = canvas.height = 135;
  wrapper.appendChild(canvas);
  document.currentScript.parentNode.insertBefore(wrapper, document.currentScript)
  let ctx = canvas.getContext("2d");

  //以下ゲーム処理
  let numColor = ["blue", "green", "red", "navy", "brown", "cyan", "black", "gray"];
  let Panel = function(x, y){
    this.x = x;
    this.y = y;
    this.mine = false;
    this.num = 0;
    this.open = false;
    this.flag = false;
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
    ctx.fillRect(this.x, this.y, 20, 20);
    if(this.open && this.num > 0){
      ctx.fillStyle = numColor[this.num - 1];
      ctx.font = "12pt bolder";
      ctx.fillText(this.num + "" ,this.x + 4, this.y + 13);
    }
    ctx.strokeStyle = "black";
    ctx.strokeRect(this.x, this.y, 15, 15);
  }
  let panels = new Array(9);
  for(let i = 0; i < 9; i++){
    panels[i] = new Array(9);
  }
  for(let i = 0; i < 9; i++){
    for(let j = 0; j < 9; j++){
      panels[i][j] = new Panel(j * 15, i * 15);
    }
  }
  function preSet(){
    clearInterval(timer);
    time.innerHTML = "0";
    flags.innerHTML = "0";
    gameState = 0;
    for(let i = 0; i < 9; i++){
      for(let j = 0; j < 9; j++){
        panels[i][j].mine = false;
        panels[i][j].open = false;
        panels[i][j].num = 0;
        panels[i][j].flag = false;
      }
    }
    drawPanels();
  }
  function setUp(x, y){
    for(let i = 0; i < 10; i++){
      let rnd = ~~(Math.random() * 81);
      if(!panels[~~(rnd / 9)][rnd % 9].mine && rnd % 9 != x && ~~(rnd / 9) != y){
        panels[~~(rnd / 9)][rnd % 9].mine = true;
      }else{
        i--;
      }
    }
    for(let i = 0; i < 9; i++){
      for(let j = 0; j < 9; j++){
        if(!panels[i][j].mine){
          let count = 0;
          for(k = 0; k < 9; k++){
            let dx = k % 3 - 1 + j;
            let dy = ~~(k / 3) - 1 + i;
            if(dy < 0 || dy > 8 || dx < 0 || dx > 8 || (i == dy && j == dx)) continue;
            if(panels[dy][dx].mine) count++;
          }
          if(count > 0) panels[i][j].num = count;
        }
      }
    }
    drawPanels();
  }
  function drawPanels(){
    for(let i = 0; i < 9; i++){
      for(let j = 0; j < 9; j++){
        panels[i][j].draw();
      }
    }
  }
  let gameState = 0; //0: stop, 1: playing, 2: gameOver
  let startTime;
  let timer;
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
    let x = ~~((e.clientX - rect.left) / 15);
    let y = ~~((e.clientY - rect.top) / 15);
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
        for(let i = 0; i < 9; i++){
          for(let j = 0; j < 9; j++){
            if(panels[i][j].open) count++;
          }
        }
        if(count == 71){
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
            flags.innerHTML = Number(flags.innerHTML) - 1;
          }else{
            panels[y][x].flag = true;
            flags.innerHTML = Number(flags.innerHTML) + 1;
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
            let arr = new Array(9);
            for(let i = 0; i < 9; i++){
              arr[i] = new Array(9);
            }
            for(let i = 0; i < 9; i++){
              for(let j = 0; j < 9; j++){
                arr[i][j] = 0;
              }
            }
            arr[y][x] = 1;
            let count = 1;
            while(count > 0){
              count = 0;
              for(let i = 0; i < 9; i++){
                for(let j = 0; j < 9; j++){
                  if(!panels[i][j].open && !panels[i][j].mine){
                    for(k = 0; k < 9; k++){
                      let dx = k % 3 - 1 + j;
                      let dy = ~~(k / 3) - 1 + i;
                      if(dy < 0 || dy > 8 || dx < 0 || dx > 8 || (i == dy && j == dx)) continue;
                      if(arr[dy][dx] == 1 && arr[i][j] == 0){
                        if(panels[i][j].num == 0){
                          arr[i][j] = 1;
                        }else{
                          arr[i][j] = 2;
                        }
                        count++;
                      }
                    }
                  }
                }
              }
            }
            let mineFlg = false;
            for(let i = 0; i < 9; i++){
              for(let j = 0; j < 9; j++){
                if(arr[i][j] > 0 && !panels[i][j].flag){
                  panels[i][j].open = true;
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
        for(let i = 0; i < 9; i++){
          let dx = i % 3 - 1 + x;
          let dy = ~~(i / 3) - 1 + y;
          if(dy < 0 || dy > 8 || dx < 0 || dx > 8 || (y == dy && x == dx)) continue;
          if(panels[dy][dx].flag) count++;
        }
        if(panels[y][x].num == count){
          for(let i = 0; i < 9; i++){
            let dx = i % 3 - 1 + x;
            let dy = ~~(i / 3) - 1 + y;
            if(dy < 0 || dy > 8 || dx < 0 || dx > 8 || (y == dy && x == dx)) continue;
            pushed(dx, dy, false);
          }
        }
      }
    }
  }
  function missed(){
    clearInterval(timer);
    gameState = 2;
    for(let i = 0; i < 9; i++){
      for(let j = 0; j < 9; j++){
        if(panels[i][j].mine) panels[i][j].open = true;
      }
    }
    drawPanels();
    alert("Game Over!!");
  }

  preSet();

})();
