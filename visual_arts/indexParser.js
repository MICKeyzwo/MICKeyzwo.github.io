function xy2index(x, y, w){
    return (y * w + x) * 4;
}
function index2xy(index, w){
    index = (index / 4) | 0;
    return {x: index % w, y: (index / w) | 0};
}