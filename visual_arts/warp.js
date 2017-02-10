var canvas;
var ctx;
var points;
window.addEventListener("load", function(){
	canvas = document.getElementsByTagName("canvas")[0];
	ctx = canvas.getContext("2d");
	ctx.strokeStyle = "#39f";
	ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
	points = [];
	move();
})
function move(){
	ctx.fillRect(0, 0, 400, 400);
	ctx.strokeStyle = "#39f";
	var rnd = Math.floor(Math.random() * 7);
	for(var i = 0; i < rnd; i++){
		points.push(new point(Math.random() * Math.PI * 2));
	}
	for(var i = 0; i < points.length; i++){
		ctx.lineWidth = Math.floor(1 + points[i].f / 3);
		ctx.beginPath();
		ctx.moveTo(200 + Math.cos(points[i].r) * 30 * points[i].f, 200 - Math.sin(points[i].r) * 30 * points[i].f);
		points[i].f += points[i].f / 6;
		ctx.lineTo(200 + Math.cos(points[i].r) * 30 * points[i].f, 200 - Math.sin(points[i].r) * 30 * points[i].f);
		ctx.stroke();
		if(points[i].f > 10){
			points.splice(i, 1);
			i--;
		}
	}
	ctx.strokeStyle = "rgba(48, 144, 255, 0.3)";
	ctx.lineWidth = Math.floor(Math.random() * 4);
	ctx.beginPath();
	ctx.arc(200, 200, Math.floor(Math.random() * 20) + 5, 0, Math.PI * 2, 0);
	ctx.stroke();
	setTimeout(move, 50);
}
function point(_r){
	this.r = _r;
	this.f = 1;
}