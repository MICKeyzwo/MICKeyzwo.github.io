window.addEventListener("load", function(){

  let canvas = document.getElementsByTagName("canvas")[0];
  let ctx = canvas.getContext("2d");
  canvas.width = canvas.height = 400;

  let Missile = createMissileClass();

  canvas.addEventListener("mousedown", canvasPushed);
  canvas.addEventListener("contextmenu", function(e){
    e.preventDefault();
  });
  if(window.TouchEvent){
    canvas.addEventListener("touchstart", canvasPushed);
  }

  let state = 0;
  let timer;
  let msls = [];
  let enem = [];
  let city = [true, true, true, true];
  let des = 0;
  let score = 0;

  function canvasPushed(e){
    let rect = e.target.getBoundingClientRect();
    let x = Math.round(400 * (e.clientX - rect.left) / canvas.clientWidth);
    let y = Math.round(400 * (e.clientY - rect.top) / canvas.clientHeight);
    //console.log(x + ":" + y);
    if(state == 0){
      timer = setInterval(move, 100);
      state = 1;
    }else if(state == 1){
      if(msls.length < 5 && y < 328){
        msls.push(new Missile(200, 380, x, y, 0));
      }
    }else if(state == 2){
      clearInterval(timer);
      state = 1;
      msls = [];
      enem = [];
      city = [true, true, true, true];
      des = 0;
      score = 0;
      timer = setInterval(move, 100);
    }
  }

  function move(){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 400, 400);

    drawCity();

    if(enem.length < 2 + ~~(des / 10)){
      let rnd = ~~(Math.random() * 25);
      if(rnd == 0) enem.push(new Missile(~~(Math.random() * 400), 0, 50 + ~~(Math.random() * 4) * 100, 375, 1));
    }

    for(let i = 0; i < enem.length; i++){
      enem[i].move();
      if(!enem[i].draw()){
        enem.splice(i, 1);
        i--;
      }
    }
    for(let i = 0; i < msls.length; i++){
      msls[i].move();
      if(!msls[i].draw()){
        msls.splice(i, 1);
        i--;
      }
    }

    ctx.strokeStyle = ctx.fillStyle = "gray";
    ctx.fillRect(0, 380, 400, 20);
    ctx.beginPath();
    ctx.arc(200, 380, 10, 0, Math.PI, 1);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(198, 380);
    ctx.lineTo(198, 365);
    ctx.lineTo(202, 365);
    ctx.lineTo(202, 380);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "white";
    ctx.fillText("Score : " + score, 10, 10)

    for(let i = 0; i < msls.length; i++){
      for(let j = 0; j < enem.length; j++){
        if(msls[i].hit(enem[j])){
          enem[j].bomb = true;
          enem[j].vx = 0;
          enem[j].vy = 0;
          des++;
          if(state == 1) score += 100;
        }
      }
    }
    for(let i = 0; i < enem.length; i++){
      for(let j = 0; j < enem.length; j++){
        if(i == j) continue;
        if(enem[i].hit(enem[j])){
          enem[j].bomb = true;
          enem[j].vx = 0;
          enem[j].vy = 0;
          des++;
          if(state == 1) score += 200;
        }
      }
      if(enem[i].hitCity()) city[(enem[i].lx - 50) / 100] = false;
    }
    if(state == 2) drawGameOver();
  }

  let cityPath = [[25,380],[25,360],[35,360],[35,380],
                  [40,380],[40,370],[45,370],[45,380],
                  [47,380],[47,350],[55,350],[55,380],
                  [60,380],[60,365],[75,365],[75,380]];
  let ruinPath = [[25,380],[25,375],[28,377],[35,370],[35,380],
                  [37,380],[40,375],[42,370],[45,380],
                  [47,380],[47,365],[55,370],[55,380],
                  [60,380],[60,365],[66,372],[71,367],[75,370],[75,380]]

  function drawCity(){
    ctx.strokeStyle = ctx.fillStyle = "gray";
    ctx.fillRect(0, 380, 400, 20);

    for(let i = 0; i < 4; i++){
      if(city[i]){
        ctx.beginPath();
        ctx.moveTo(cityPath[0][0] + i * 100, cityPath[0][1]);
        for(let j = 1; j < cityPath.length; j++){
          ctx.lineTo(cityPath[j][0] + i * 100, cityPath[j][1]);
        }
        ctx.closePath();
        ctx.fill();
      }else{
        ctx.beginPath();
        ctx.moveTo(ruinPath[0][0] + i * 100, ruinPath[0][1]);
        for(let j = 1; j < ruinPath.length; j++){
          ctx.lineTo(ruinPath[j][0] + i * 100, ruinPath[j][1]);
        }
        ctx.closePath();
        ctx.fill();
      }
    }
    if(!(city[0] || city[1] || city[2] || city[3])) state = 2;
  }

  function drawGameOver(){
    ctx.fillStyle = "gray";
    ctx.globalAlpha = 0.5;
    ctx.fillRect(0, 0, 400, 400);
    ctx.globalAlpha = 1;
    ctx.fillStyle = "white";
    ctx.fillText("Game Over!", 160, 150);
    ctx.fillText("Your score : " + score, 140, 200);
    ctx.fillText("Click or Touch to restart", 130, 250);
  }

  function main(){
    drawCity();
    ctx.font = "10pt 'sans-serif'"
    ctx.fillStyle = "gray";
    ctx.globalAlpha = 0.5;
    ctx.fillRect(0, 0, 400, 400);
    ctx.globalAlpha = 1;
    ctx.fillStyle = "white";
    ctx.fillText("Click or Touch to start", 130, 200);
  }

  main();

  function createMissileClass(){
    function Missile(_x, _y, _lx, _ly, _s){
      this.side = _s; //0:friend 1:enemy
      this.x = _x;
      this.y = _y;
      this.sx = _x;
      this.sy = _y;
      this.lx = _lx;
      this.ly = _ly;
      let dis = Math.sqrt(Math.pow(_lx - _x, 2) + Math.pow(_ly - _y, 2)) / (_s == 0 ? 9 : 3);
      this.vx = (_lx - _x) / dis;
      this.vy = (_ly - _y) / dis;
      this.bomb = false;
      this.c = false;
      this.r = _s == 0 ? -20 : -26;
    };
    Missile.prototype.color = ["red", "white", "blue"];
    Missile.prototype.draw = function(){
      ctx.strokeStyle = ctx.fillStyle = "white";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(this.sx, this.sy);
      ctx.lineTo(this.x, this.y);
      ctx.closePath();
      ctx.stroke();
      if(!this.bomb){
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2, 0);
        ctx.closePath();
        ctx.fill();
        return true;
      }else{
        let rr = (this.side == 0 ? 22 : 28) - Math.abs(this.r);
        ctx.fillStyle = this.color[Math.abs(this.r) % 3];
        ctx.beginPath();
        ctx.arc(this.x, this.y, rr, 0, Math.PI * 2, 0);
        ctx.closePath();
        ctx.fill();
        this.r += this.side == 0 ? 1 : 2;
        return this.r <= (this.side == 0 ? 21 : 27);
      }
    };
    Missile.prototype.move = function(){
      this.x += this.vx;
      this.y += this.vy;
      if(Math.sqrt(Math.pow(this.lx - this.x, 2) + Math.pow(this.ly - this.y, 2)) <= 5){
        this.bomb = true;
        if(this.side == 1) this.c = true;
        this.vx = 0;
        this.vy = 0;
      }
    };
    Missile.prototype.hit = function(ent){
      let dis = Math.sqrt(Math.pow(this.x - ent.x, 2) + Math.pow(this.y - ent.y, 2));
      let rr = (this.side == 0 ? 22 : 28) - Math.abs(this.r) - 2;
      return !ent.bomb && dis <= rr && !this.c;
    };
    Missile.prototype.hitCity = function(){
      let rr = 28 - Math.abs(this.r);
      return this.y + rr >= 375;
    }
    return Missile;
  }

})
