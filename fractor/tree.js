window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = canvas.height = 400;
  function treeNode(_x, _y, _l, _r){
    this.x = _x;
    this.y = _y;
    this.l = _l;
    this.r = _r;
  }
  function makeTree(node, n, arr, rad, len){
    node.l *= len;
    let r = new treeNode(
      node.x + Math.cos(node.r) * node.l,
      node.y + Math.sin(node.r) * node.l,
      node.l,
      node.r + rad / 2
    );
    let l = new treeNode(
      node.x + Math.cos(node.r) * node.l,
      node.y + Math.sin(node.r) * node.l,
      node.l,
      node.r - rad / 2
    );
    arr.push(r);
    arr.push(l);
    if(n > 0){
      makeTree(r, n - 1, arr, rad, len);
      makeTree(l, n - 1, arr, rad, len);
    }
  }
  let max = 5;
  let nodeList = [];
  nodeList.push(new treeNode(200, 350, 250, -Math.PI / 2));
  makeTree(nodeList[0], max, nodeList, Math.PI / 2, 3 / 5);
  function draw(){
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    for(let i = 0; i < nodeList.length; i++){
      ctx.beginPath();
      ctx.moveTo(nodeList[i].x, nodeList[i].y);
      ctx.lineTo(
        nodeList[i].x + Math.cos(nodeList[i].r) * nodeList[i].l,
        nodeList[i].y + Math.sin(nodeList[i].r) * nodeList[i].l
      );
      ctx.stroke();
    }
  }
  draw();
});
