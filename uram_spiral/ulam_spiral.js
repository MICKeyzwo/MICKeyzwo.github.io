window.addEventListener("load", () => {
	
	let canvas = document.getElementById("canvas");
	let ctx = canvas.getContext("2d");
	canvas.width = canvas.height = 400;
	
	const MAX_NUMBER = 150000;
	
	let pn = getPrimeNumbers(MAX_NUMBER);
	console.log(pn);
	drawUlamSpiral();
	
	function drawUlamSpiral(){
		let x = 200;
		let y = 200;
		let vector = 0;
		let length = 1;
		let count = 0;
		let turn = 0;
		let pnpointer = 0;
		let pd = new PixelDrawer(ctx.getImageData(0, 0, 400, 400));
		for(let i = 0; i < MAX_NUMBER; i++){
			if(pn[pnpointer] == i + 1){
				pd.setColor(x, y, 0, 0, 0, 255);
				pnpointer += 1;
			}
			if(vector == 0){
				x += 1;
			}else if(vector == 1){
				y -= 1;
			}else if(vector == 2){
				x -= 1;
			}else if(vector == 3){
				y += 1;
			}
			count += 1;
			if(count == length){
				count = 0;
				vector = (vector + 1) % 4;
				turn += 1;
			}
			if(turn == 2){
				turn = 0;
				length += 1;
			}
		}
		ctx.putImageData(pd.getImageData(), 0, 0);
	}
	
	function getPrimeNumbers(max){
		let arr = new Array(max - 1);
		let res = [];
		for(let i = 0; i < max - 1; i++){
			arr[i] = i + 2;
		}
		for(let i = 0; i < Math.sqrt(max); i++){
			if(arr[i] != 0){
				let n = arr[i];
				res.push(n);
				for(let j = i; j < max - 1; j += n){
					arr[j] = 0;
				}
			}
		}
		for(let i = 0; i < max - 1; i++){
			if(arr[i] != 0) res.push(arr[i]);
		}
		return res;
	}
	
});