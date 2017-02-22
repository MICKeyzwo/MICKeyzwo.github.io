window.addEventListener("load", () => {

  let time = document.getElementById("time");
  let flags = document.getElementById("flag");
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");

  let numColor = ["blue", "green", "red", "navy", "brown", "cyan", "gray"];
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
    ctx.strokeRect(this.x, this.y, 20, 20);
  }

  let width = 12;
  let height = 9;
  let mines = 10;
  let panels;
  let gameState = 0; //0: stop, 1: playing, 2: gameOver
  let startTime;
  let timer;

  function ruleSet(){
    panels = new Array(height);
    for(let i = 0; i < height; i++){
      panels[i] = new Array(width);
    }
    for(let i = 0; i < height; i++){
      for(let j = 0; j < width; j++){
        panels[i][j] = new Panel(j * 20, i * 20);
      }
    }
    canvas.width = 20 * width;
    canvas.height = 20 * height;
  }
  function preSet(){
    clearInterval(timer);
    time.innerHTML = "0";
    flag.innerHTML = "0";
    gameState = 0;
    for(let i = 0; i < height; i++){
      for(let j = 0; j < width; j++){
        panels[i][j].mine = false;
        panels[i][j].open = false;
        panels[i][j].num = 0;
        panels[i][j].flag = false;
      }
    }
    drawPanels();
  }
  function setUp(x, y){
    for(let i = 0; i < mines; i++){
      let rnd = ~~(Math.random() * (height * width));
      if(!panels[~~(rnd / width)][rnd % height].mine && rnd % height != x && ~~(rnd / width) != y){
        panels[~~(rnd / width)][rnd % height].mine = true;
      }else{
        i--;
      }
    }
  }
  function drawPanels(){
    for(let i = 0; i < height; i++){
      for(let j = 0; j < width; j++){
        panels[i][j].draw();
      }
    }
  }

  ruleSet();
  preSet();
  setUp();

});
