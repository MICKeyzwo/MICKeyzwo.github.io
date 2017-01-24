window.addEventListener("load", () => {
	let table = "<table>";
	for(let i = 0; i < 20; i++){
		table += "<tr>";
		for(let j = 0; j < 20; j++){
			table += "<td></td>";
		}
		table += "</tr>"
	}
	table += "</table>";
	document.body.innerHTML += table;
	let map = [
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		[1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		[1,0,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1],
		[1,0,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1],
		[1,0,0,0,0,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1],
		[1,1,1,1,0,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1],
		[1,1,1,1,0,1,0,0,0,1,1,0,1,1,1,1,1,1,1,1],
		[1,1,1,1,0,1,0,1,1,1,1,0,1,1,1,1,1,1,1,1],
		[1,1,1,1,0,1,0,1,1,1,1,0,1,1,1,1,1,1,1,1],
		[1,1,1,1,0,1,0,1,1,1,1,0,1,1,1,1,1,1,1,1],
		[1,1,1,1,0,0,0,1,0,0,0,0,1,1,1,1,1,1,1,1],
		[1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1],
		[1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1],
		[1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1],
		[1,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,1,1,1,1],
		[1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1],
		[1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1],
		[1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,1],
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1],
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
	];
	let tds = document.getElementsByTagName("td");
	tds = (function(t){
		let a = new Array(20);
		for(let i = 0; i < 20; i++){
			a[i] = new Array(20);
		}
		for(let i = 0; i < 20; i++){
			for(let j = 0; j< 20; j++){
				a[i][j] = t[j + i * 20];
			}
		}
		return a;
	})(tds);
	for(let i = 0; i < 20; i++){
		for(let j = 0; j < 20; j++){
			if(map[i][j] == 1){
				tds[i][j].style.backgroundColor = "black";
			}else{
				tds[i][j].style.backgroundColor = "white";
			}
		}
	}
	
	let seeds = new Array(20);
	for(let i = 0; i < 20; i++){
		seeds[i] = new Array(72);
	}
	for(let i = 0; i < 20; i++){
		for(let j = 0; j < 72; j++){
			seeds[i][j] = Math.floor(Math.random() * 4);
		}
	}
	let result = new Array(20);
	let index = new Array(20);
	
	function thick(){
		for(let i = 0; i < 20; i++){
			result[i] = 72 - moveMaze(seeds[i]);
			index[i] = i;
		}
		for(let i = 0; i < 20 - 1; i++){
			for(let j = i + 1; j < 20; j++){
				if(result[i] < result[j]){
					[result[i], result[j]] = [result[j], result[i]];
					[index[i], index[j]] = [index[j], index[i]];
				}
			}
		}
		console.log(result);
		//console.log(index);
		let top = (function(){
			let a = [];
			for(let i = 0; i < 72; i++){
				a.push(seeds[index[0]][i]);
			}
			return a;
		})();
		let sec;
		if(Math.floor(Math.random() * 10) == 0){
			sec = (function(){
				let a = [];
				for(let i = 0; i < 72; i++){
					a.push(seeds[index[6]][i]);
				}
				return a;
			})();
		}else{
			sec = (function(){
				let a = [];
				for(let i = 0; i < 72; i++){
					a.push(Math.floor(Math.random() * 4));
				}
				return a;
			})();
		}
		console.log(top);
		//console.log(sec);
		for(let i = 0; i < 72; i++){
			seeds[0][i] = top[i];
		}
		for(let i = 1; i < 20; i++){
			for(let j = 0; j < 72; j++){
				if(Math.floor(Math.random() * 2) == 0){
					seeds[i][j] = top[j];
				}else{
					seeds[i][j] = sec[j];
				}
			}
		}
	}
	
	thick();
	let timer = setInterval(thick, 2000);
	
	function moveMaze(arr){
		let x = 1;
		let y = 1;
		for(let i = 0; i < 72; i++){
			if(arr[i] == 0 && map[y][x + 1] == 0) x++;
			else if(arr[i] == 1 && map[y + 1][x] == 0) y++;
			else if(arr[i] == 2 && map[y][x - 1] == 0) x--;
			else if(arr[i] == 3 && map[y - 1][x] == 0) y--;
			else break;
		}
		let endFlg = (function(m){
			let a = new Array(20);
			for(let i = 0; i < 20; i++){
				a[i] = new Array(20);
			}
			for(let i = 0; i < 20; i++){
				for(let j = 0; j < 20; j++){
					a[i][j] = map[i][j]
				}
			}
			return a;
		})(map);
		return getDistance(x, y, 0, endFlg);
	}
	
	function getDistance(x, y, n, e){
		if(x == 18 && y == 18) return n;
		e[y][x] = 1;
		let d;
		if(e[y][x + 1] == 0){d = getDistance(x + 1, y, n + 1, e); if(d > 0) return d};
		if(e[y + 1][x] == 0){d = getDistance(x, y + 1, n + 1, e); if(d > 0) return d};
		if(e[y][x - 1] == 0){d = getDistance(x - 1, y, n + 1, e); if(d > 0) return d};
		if(e[y - 1][x] == 0){d = getDistance(x, y - 1, n + 1, e); if(d > 0) return d};
		return -1;
	}
});