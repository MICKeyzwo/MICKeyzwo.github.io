(() => {
  window.PixelDrawer = function(data){
    this.imageData = data;
  }
  PixelDrawer.prototype.colors = [{"name":"AliceBlue","color":"#F0F8FF"},{"name":"AntiqueWhite","color":"#FAEBD7"},{"name":"Aqua","color":"#00FFFF"},{"name":"Aquamarine","color":"#7FFFD4"},{"name":"Azure","color":"#F0FFFF"},{"name":"Beige","color":"#F5F5DC"},{"name":"Bisque","color":"#FFE4C4"},{"name":"Black","color":"#000000"},{"name":"BlanchedAlmond","color":"#FFEBCD"},{"name":"Blue","color":"#0000FF"},{"name":"BlueViolet","color":"#8A2BE2"},{"name":"Brown","color":"#A52A2A"},{"name":"BurlyWood","color":"#DEB887"},{"name":"CadetBlue","color":"#5F9EA0"},{"name":"Chartreuse","color":"#7FFF00"},{"name":"Chocolate","color":"#D2691E"},{"name":"Coral","color":"#FF7F50"},{"name":"CornflowerBlue","color":"#6495ED"},{"name":"Cornsilk","color":"#FFF8DC"},{"name":"Crimson","color":"#DC143C"},{"name":"Cyan","color":"#00FFFF"},{"name":"DarkBlue","color":"#00008B"},{"name":"DarkCyan","color":"#008B8B"},{"name":"DarkGoldenrod","color":"#B8860B"},{"name":"DarkGray","color":"#A9A9A9"},{"name":"DarkGreen","color":"#006400"},{"name":"DarkKhaki","color":"#BDB76B"},{"name":"DarkMagenta","color":"#8B008B"},{"name":"DarkOliveGreen","color":"#556B2F"},{"name":"DarkOrange","color":"#FF8C00"},{"name":"DarkOrchid","color":"#9932CC"},{"name":"DarkRed","color":"#8B0000"},{"name":"DarkSalmon","color":"#E9967A"},{"name":"DarkSeaGreen","color":"#8FBC8F"},{"name":"DarkSlateBlue","color":"#483D8B"},{"name":"DarkSlateGray","color":"#2F4F4F"},{"name":"DarkTurquoise","color":"#00CED1"},{"name":"DarkViolet","color":"#9400D3"},{"name":"DeepPink","color":"#FF1493"},{"name":"DeepSkyBlue","color":"#00BFFF"},{"name":"DimGray","color":"#696969"},{"name":"DodgerBlue","color":"#1E90FF"},{"name":"FireBrick","color":"#B22222"},{"name":"FloralWhite","color":"#FFFAF0"},{"name":"ForestGreen","color":"#228B22"},{"name":"Fuchsia","color":"#FF00FF"},{"name":"Gainsboro","color":"#DCDCDC"},{"name":"GhostWhite","color":"#F8F8FF"},{"name":"Gold","color":"#FFD700"},{"name":"Goldenrod","color":"#DAA520"},{"name":"Gray","color":"#808080"},{"name":"Green","color":"#008000"},{"name":"GreenYellow","color":"#ADFF2F"},{"name":"Honeydew","color":"#F0FFF0"},{"name":"HotPink","color":"#FF69B4"},{"name":"IndianRed","color":"#CD5C5C"},{"name":"Indigo","color":"#4B0082"},{"name":"Ivory","color":"#FFFFF0"},{"name":"Khaki","color":"#F0E68C"},{"name":"Lavender","color":"#E6E6FA"},{"name":"LavenderBlush","color":"#FFF0F5"},{"name":"LawnGreen","color":"#7CFC00"},{"name":"LemonChiffon","color":"#FFFACD"},{"name":"LightBlue","color":"#ADD8E6"},{"name":"LightCoral","color":"#F08080"},{"name":"LightCyan","color":"#E0FFFF"},{"name":"LightGoldenrodYellow","color":"#FAFAD2"},{"name":"LightGreen","color":"#90EE90"},{"name":"LightGrey","color":"#D3D3D3"},{"name":"LightPink","color":"#FFB6C1"},{"name":"LightSalmon","color":"#FFA07A"},{"name":"LightSeaGreen","color":"#20B2AA"},{"name":"LightSkyBlue","color":"#87CEFA"},{"name":"LightSlateGray","color":"#778899"},{"name":"LightSteelBlue","color":"#B0C4DE"},{"name":"LightYellow","color":"#FFFFE0"},{"name":"Lime","color":"#00FF00"},{"name":"LimeGreen","color":"#32CD32"},{"name":"Linen","color":"#FAF0E6"},{"name":"Magenta","color":"#FF00FF"},{"name":"Maroon","color":"#800000"},{"name":"MediumAquamarine","color":"#66CDAA"},{"name":"MediumBlue","color":"#0000CD"},{"name":"MediumOrchid","color":"#BA55D3"},{"name":"MediumPurple","color":"#9370DB"},{"name":"MediumSeaGreen","color":"#3CB371"},{"name":"MediumSlateBlue","color":"#7B68EE"},{"name":"MediumSpringGreen","color":"#00FA9A"},{"name":"MediumTurquoise","color":"#48D1CC"},{"name":"MediumVioletRed","color":"#C71585"},{"name":"MidnightBlue","color":"#191970"},{"name":"MintCream","color":"#F5FFFA"},{"name":"MistyRose","color":"#FFE4E1"},{"name":"Moccasin","color":"#FFE4B5"},{"name":"NavajoWhite","color":"#FFDEAD"},{"name":"Navy","color":"#000080"},{"name":"OldLace","color":"#FDF5E6"},{"name":"Olive","color":"#808000"},{"name":"OliveDrab","color":"#6B8E23"},{"name":"Orange","color":"#FFA500"},{"name":"OrangeRed","color":"#FF4500"},{"name":"Orchid","color":"#DA70D6"},{"name":"PaleGoldenrod","color":"#EEE8AA"},{"name":"PaleGreen","color":"#98FB98"},{"name":"PaleTurquoise","color":"#AFEEEE"},{"name":"PaleVioletRed","color":"#DB7093"},{"name":"PapayaWhip","color":"#FFEFD5"},{"name":"PeachPuff","color":"#FFDAB9"},{"name":"Peru","color":"#CD853F"},{"name":"Pink","color":"#FFC0CB"},{"name":"Plum","color":"#DDA0DD"},{"name":"PowderBlue","color":"#B0E0E6"},{"name":"Purple","color":"#800080"},{"name":"Red","color":"#FF0000"},{"name":"RosyBrown","color":"#BC8F8F"},{"name":"RoyalBlue","color":"#4169E1"},{"name":"SaddleBrown","color":"#8B4513"},{"name":"Salmon","color":"#FA8072"},{"name":"SandyBrown","color":"#F4A460"},{"name":"SeaGreen","color":"#2E8B57"},{"name":"Seashell","color":"#FFF5EE"},{"name":"Sienna","color":"#A0522D"},{"name":"Silver","color":"#C0C0C0"},{"name":"SkyBlue","color":"#87CEEB"},{"name":"SlateBlue","color":"#6A5ACD"},{"name":"SlateGray","color":"#708090"},{"name":"Snow","color":"#FFFAFA"},{"name":"SpringGreen","color":"#00FF7F"},{"name":"SteelBlue","color":"#4682B4"},{"name":"Tan","color":"#D2B48C"},{"name":"Teal","color":"#008080"},{"name":"Thistle","color":"#D8BFD8"},{"name":"Tomato","color":"#FF6347"},{"name":"Turquoise","color":"#40E0D0"},{"name":"Violet","color":"#EE82EE"},{"name":"Wheat","color":"#F5DEB3"},{"name":"White","color":"#FFFFFF"},{"name":"WhiteSmoke","color":"#F5F5F5"},{"name":"Yellow","color":"#FFFF00"},{"name":"YellowGreen","color":"#9ACD32"}];
  PixelDrawer.prototype.getColor = function(_x, _y, stringify){
    if(_x >= 0 && _x < this.imageData.width && _y >= 0 && _y < this.imageData.height){
      let index = (_y * this.imageData.width + _x) * 4;
      let color = {
        r: this.imageData.data[index],
        g: this.imageData.data[index + 1],
        b: this.imageData.data[index + 2],
        a: this.imageData.data[index + 3]
      };
      if(stringify){
        return `rgba(${color.r},${color.g},${color.b},${color.a / 255})`;
      }
      return color;
    }
  };
  PixelDrawer.prototype.setColor = function(_x, _y, _r, _g, _b, _a){
    if(_x >= 0 && _x < this.imageData.width && _y >= 0 && _y < this.imageData.height){
      let index = (_y * this.imageData.width + _x) * 4;
      let type = typeof(_r);
      if(type == "number"){
        this.imageData.data[index] = _r;
        this.imageData.data[index + 1] = _g;
        this.imageData.data[index + 2] = _b;
        this.imageData.data[index + 3] = _a;
      }else if(type == "string"){
        let c = _r;
        if(c.indexOf("#") == 0){
          c = c.replace("#", "");
          if(c.length == 6){
            this.imageData.data[index] = parseInt(c[0] + c[1], 16);
            this.imageData.data[index + 1] = parseInt(c[2] + c[3], 16);
            this.imageData.data[index + 2] = parseInt(c[4] + c[5], 16);
            this.imageData.data[index + 3] = 255;
          }else if(c.length == 3){
            this.imageData.data[index] = Math.floor(parseInt(c[0], 16) / 16 * 255);
            this.imageData.data[index + 1] = Math.floor(parseInt(c[1], 16) / 16 * 255);
            this.imageData.data[index + 2] = Math.floor(parseInt(c[2], 16) / 16 * 255);
            this.imageData.data[index + 3] = 255;
          }else if(c.length == 1){
            this.imageData.data[index] = Math.floor(parseInt(c[0], 16) / 16 * 255);
            this.imageData.data[index + 1] = Math.floor(parseInt(c[0], 16) / 16 * 255);
            this.imageData.data[index + 2] = Math.floor(parseInt(c[0], 16) / 16 * 255);
            this.imageData.data[index + 3] = 255;
          }
        }else{
          let val = null;
          for(let i = 0; i < this.colors.length; i++){
            if(c.toLowerCase() == this.colors[i].name.toLowerCase()){
              val = this.colors[i].color;
            }
          }
          if(val){
            c = val.replace("#", "");
            this.imageData.data[index] = parseInt(c[0] + c[1], 16);
            this.imageData.data[index + 1] = parseInt(c[2] + c[3], 16);
            this.imageData.data[index + 2] = parseInt(c[4] + c[5], 16);
            this.imageData.data[index + 3] = 255;
          }
        }
      }else if(type == "object"){
        this.imageData.data[index] = _r.r;
        this.imageData.data[index + 1] = _r.g;
        this.imageData.data[index + 2] = _r.b;
        this.imageData.data[index + 3] = _r.a;
      }
    }
  };
  PixelDrawer.prototype.drawLine = function(sx, sy, ex, ey, r, g, b, a, lw = 1, lh = 1){
    let dis = Math.sqrt(Math.pow(ex - sx, 2) + Math.pow(ey - sy, 2));
    let pat = {x: (ex - sx) / dis, y: (ey - sy) / dis};
    for(let i = 0; i < dis; i++){
      for(let j = 0; j < lw; j++){
        if(sx + pat.x * i + j < this.imageData.width){
          this.setColor(Math.ceil(sx + pat.x * i) + j, Math.ceil(sy + pat.y * i), r, g, b, a);
        }
      }
      for(let j = 0; j < lh; j++){
        if(sy + pat.y * i + j < this.imageData.height){
          this.setColor(Math.ceil(sx + pat.x * i), Math.ceil(sy + pat.y * i) + j, r, g, b, a);
        }
      }
    }
  }
  PixelDrawer.prototype.getImageData = function(){
    return this.imageData;
  };
  PixelDrawer.prototype.putImageData = function(data){
    this.imageData = data;
  };
})()
