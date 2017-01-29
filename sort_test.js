let arr = new Array(1000);
for(let i = 0; i < arr.length; i++){
    arr[i] = i;
}
arr.sort(() => {return Math.random() * 2 - 1});
//console.log(babbleSort(arr.concat()));
//console.log(selectionSort(arr.concat()));
let t = Date.now();
console.log(shellSort(arr.concat()));
console.log(Date.now() - t);
t = Date.now();
console.log(shellSort2(arr.concat()));
console.log(Date.now() - t);

function babbleSort(arr){
    for(let i = 0; i < arr.length - 1; i++){
        for(let j = i + 1; j < arr.length; j++){
            if(arr[i] > arr[j])
                [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    return arr;
}

function selectionSort(arr){
    let minv;
    let mini;
    for(let i = 0; i < arr.length - 1; i++){
        minv = Number.MAX_VALUE;
        mini = i;
        for(let j = i + 1; j < arr.length; j++){
            if(arr[j] < minv){
                minv = arr[j];
                mini = j;
            }
        }
        [arr[i], arr[mini]] = [arr[mini], arr[i]];
    }
    return arr;
}

function insertionSort(arr){
    for(let i = 1; i < arr.length; i++){
        for(let j = i; arr[j] < arr[j - 1]; j--){
            if(j <= 0) break;
            [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
        }
    }
    return arr;
}

function shellSort(arr){
    let jump = [];
    for(let i = 1; i < arr.length; i = i * 2 + 1){
        jump.push(i);
    }
    jump.reverse();
    for(let i = 0; i < jump.length; i++){
        for(let j = 0; j < jump[i]; j++){
            for(let k = jump[i] + j; k < arr.length; k += jump[i]){
                for(let l = k; arr[l] < arr[l - jump[i]]; l -= jump[i]){
                    if(l <= j) break;
                    [arr[l], arr[l - jump[i]]] = [arr[l - jump[i]], arr[l]];
                }
            }
        }
    }
    return arr;
}

function shellSort2(arr){
    let jump = [];
    for(let i = 1; i < arr.length; i = i * 3 + 1){
        jump.push(i);
    }
    jump.reverse();
    for(let i = 0; i < jump.length; i++){
        for(let j = 0; j < jump[i]; j++){
            for(let k = jump[i] + j; k < arr.length; k += jump[i]){
                for(let l = k; arr[l] < arr[l - jump[i]]; l -= jump[i]){
                    if(l <= j) break;
                    [arr[l], arr[l - jump[i]]] = [arr[l - jump[i]], arr[l]];
                }
            }
        }
    }
    return arr;
}