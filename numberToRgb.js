function getRgb(n, s){
    if(typeof s === "string"){
        s = "rgb".split("").indexOf(s);
        if(s === -1) return;
    }
    if(s >= 0 && s <= 2){
        if(typeof n === "string"){
            if(n.indexOf("#") != -1){
                n = parseInt(n.replace("#", ""), 16);
            }else{
                n = parseInt(n, 16);
            }
        }
        if(s == 0){
            return n >> 16;
        }else if(s == 1){
            return n >> 8 & 0xff;
        }else if(s == 2){
            return n & 0xff;
        }else{
            return;
        }
    }else{
        return;
    }
}