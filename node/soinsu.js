const readline = require("readline");
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});
rl.question("素因数分解する数を入力してください\n", (num) => {
	if(!Number(num).isNaN){
		console.log("\n以下が素因数分解の結果です");
		num = Number(num);
		let prime = getPrimeNumbers(num);
		while(num != 1){
			for(let i = 0; i < prime.length; i++){
				if(num % prime[i] == 0){
					console.log(prime[i]);
					num /= prime[i];
					break;
				}
			}
		}
	}else{
		console.log("入力された数値の値が不正です");
	}
	rl.close();
});
function getPrimeNumbers(max){
	let res = [];
	let nums = new Array(max - 1);
	for(let i = 0; i < nums.length; i++){
		nums[i] = i + 2;
	}
	for(let i = 0; i < Math.sqrt(max); i++){
		if(nums[i] != 0){
			res.push(nums[i]);
			for(let j = i + nums[i]; j < nums.length; j += nums[i]){
				nums[j] = 0;
			}
			nums[i] = 0;
		}
	}
	for(let i = 0; i < nums.length; i++){
		if(nums[i] != 0) res.push(nums[i]);
	}
	return res;
}