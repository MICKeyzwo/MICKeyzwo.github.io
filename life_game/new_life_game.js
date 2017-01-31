function LifeGame(elm, opt){

	let cells;
	let state;
	let timer;
	let row = opt.row ? opt.row : 50;
	let col = opt.column ? opt.column : 50;

	var str = "<table width='" + (7 * col + col + 1) + "' height='" + (7 * row + row + 1) + "' cellpadding='0' cellspacing='1'>";
	for(let n = 0; n < row; n++){
		str += "<tr>";
		for(let i = 0; i < col; i++){
			str += "<td class='white'></td>";
		}
		str += "</tr>";
	}
	str += "</table>" +
           "<div style='text-align: center; width: " + (7 * col + col) + "px;'>" +
           "<form>" +
           "<input type='button' value='reset!' onclick='setUp()'>" +
           "</form>" +
           "</div>";
	elm.innerHTML += str;
	cells = new Array(row);
	state = new Array(row);
	for(let n = 0; n < row; n++){
		cells[n] = new Array(col);
		state[n] = new Array(col);
	}
	let table = elm.getElementsByTagName("table")[0];
	for(let n = 0; n < row; n++){
		for(let i = 0; i < col; i++){
			cells[n][i] = table.rows[n].cells[i];
		}
	}

	function setUp(){
		clearInterval(timer);
		for(let n = 0; n < row; n++){
			for(let i = 0; i < col; i++){
				state[n][i] = [0, 0];
				state[n][i][0] = Math.floor(Math.random() * 2.5);
				if(state[n][i][0] != 1) state[n][i][0] = 0;
				if(state[n][i][0] == 1) cells[n][i].className = "black"; else cells[n][i].className = "white";
			}
		}

		timer = setInterval(() => {
			for(let n = 0; n < row; n++){
				for(let i = 0; i < col; i++){
					let cnt = 0;
					for(let j = 0; j < 9; j++){
						let vy = Math.floor(j / 3) - 1;
						let vx = j % 3 - 1;
						if(state[((n + vy) + row) % row][((i + vx) + col) % col][0] == 1 && !(vy == 0 && vx == 0)) cnt++;
					}
					state[n][i][1] = ruleBook(state[n][i][0], cnt);
				}
			}
			for(let n = 0; n < row; n++){
				for(let i = 0; i < col; i++){
					state[n][i][0] = state[n][i][1];
					if(state[n][i][0] == 1) cells[n][i].className = "black"; else cells[n][i].className = "white";
				}
			}
		}, 250);
	}

	function ruleBook(live, cnt){
		if(live == 0){
			if(opt.spawn.indexOf(cnt) >= 0){
				return 1;
			}else{
				return 0;
			}
		}else{
			if(opt.survive.indexOf(cnt) >= 0){
				return 1;
			}else{
				return 0;
			}
		}
	}

}
