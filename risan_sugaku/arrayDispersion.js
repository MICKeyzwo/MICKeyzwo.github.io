const sfrq = 44100;
const tmax = 2;
let val = new Uint16Array(sfrq * tmax);
let frq = 440;
for(let i = 0; i < val.length; i++){
    val[i] = ((127 * Math.cos(frq / sfrq * Math.PI * 2 * i)) | 0) + 128;
}

function average(arr){
    let s = 0;
    for(let i = 0; i < arr.length; i++){
        s += arr[i];
    }
    return s / arr.length;
}
function stepAverage(arr, start, step){
    let s = 0;
    let len = (arr.length / step) | 0;
    for(let i = start; i < arr.length; i += step){
        s += arr[i | 0];
    }
    return s / len;
}
function stepDispersion(arr, start, step){
    let avg = stepAverage(arr, start, step);
    let s = 0;
    let len = (arr.length / step) | 0;
    for(let i = start; i < arr.length; i += step){
        s += Math.pow(arr[i | 0] - avg, 2);
    }
    return s / len;
}
function maxReverse(arr){
    let max = 0;
    for(let i = 0; i < arr.length; i++){
        if(arr[i] > max) max = arr[i];
    }
    for(let i = 0; i < arr.length; i++){
        arr[i] = max - arr[i];
    }
    return arr;
}

let keys = new Array(20);
for(let i = 0; i < 20; i++){
    keys[i] = i + 431;
}
let res = [];
for(let i = 0; i < keys.length; i++){
    let temp = [];
    let dis = sfrq / keys[i];
    for(let j = 0; j < dis; j++){
        temp.push(stepDispersion(val, j, dis));
    }
    res.push(average(temp));
}
//res = maxReverse(res);

console.log(res);
