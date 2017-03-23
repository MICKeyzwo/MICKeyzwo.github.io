(() => {
  window.PixelDrawer = function(data){
    this.imageData = data;
  }
  PixelDrawer.prototype.colors = { "aliceblue": "#F0F8FF", "antiquewhite": "#FAEBD7", "aqua": "#00FFFF", "aquamarine": "#7FFFD4", "azure": "#F0FFFF", "beige": "#F5F5DC", "bisque": "#FFE4C4", "black": "#000000", "blanchedalmond": "#FFEBCD", "blue": "#0000FF", "blueviolet": "#8A2BE2", "brown": "#A52A2A", "burlywood": "#DEB887", "cadetblue": "#5F9EA0", "chartreuse": "#7FFF00", "chocolate": "#D2691E", "coral": "#FF7F50", "cornflowerblue": "#6495ED", "cornsilk": "#FFF8DC", "crimson": "#DC143C", "cyan": "#00FFFF", "darkblue": "#00008B", "darkcyan": "#008B8B", "darkgoldenrod": "#B8860B", "darkgray": "#A9A9A9", "darkgreen": "#006400", "darkkhaki": "#BDB76B", "darkmagenta": "#8B008B", "darkolivegreen": "#556B2F", "darkorange": "#FF8C00", "darkorchid": "#9932CC", "darkred": "#8B0000", "darksalmon": "#E9967A", "darkseagreen": "#8FBC8F", "darkslateblue": "#483D8B", "darkslategray": "#2F4F4F", "darkturquoise": "#00CED1", "darkviolet": "#9400D3", "deeppink": "#FF1493", "deepskyblue": "#00BFFF", "dimgray": "#696969", "dodgerblue": "#1E90FF", "firebrick": "#B22222", "floralwhite": "#FFFAF0", "forestgreen": "#228B22", "fuchsia": "#FF00FF", "gainsboro": "#DCDCDC", "ghostwhite": "#F8F8FF", "gold": "#FFD700", "goldenrod": "#DAA520", "gray": "#808080", "green": "#008000", "greenyellow": "#ADFF2F", "honeydew": "#F0FFF0", "hotpink": "#FF69B4", "indianred": "#CD5C5C", "indigo": "#4B0082", "ivory": "#FFFFF0", "khaki": "#F0E68C", "lavender": "#E6E6FA", "lavenderblush": "#FFF0F5", "lawngreen": "#7CFC00", "lemonchiffon": "#FFFACD", "lightblue": "#ADD8E6", "lightcoral": "#F08080", "lightcyan": "#E0FFFF", "lightgoldenrodyellow": "#FAFAD2", "lightgreen": "#90EE90", "lightgrey": "#D3D3D3", "lightpink": "#FFB6C1", "lightsalmon": "#FFA07A", "lightseagreen": "#20B2AA", "lightskyblue": "#87CEFA", "lightslategray": "#778899", "lightsteelblue": "#B0C4DE", "lightyellow": "#FFFFE0", "lime": "#00FF00", "limegreen": "#32CD32", "linen": "#FAF0E6", "magenta": "#FF00FF", "maroon": "#800000", "mediumaquamarine": "#66CDAA", "mediumblue": "#0000CD", "mediumorchid": "#BA55D3", "mediumpurple": "#9370DB", "mediumseagreen": "#3CB371", "mediumslateblue": "#7B68EE", "mediumspringgreen": "#00FA9A", "mediumturquoise": "#48D1CC", "mediumvioletred": "#C71585", "midnightblue": "#191970", "mintcream": "#F5FFFA", "mistyrose": "#FFE4E1", "moccasin": "#FFE4B5", "navajowhite": "#FFDEAD", "navy": "#000080", "oldlace": "#FDF5E6", "olive": "#808000", "olivedrab": "#6B8E23", "orange": "#FFA500", "orangered": "#FF4500", "orchid": "#DA70D6", "palegoldenrod": "#EEE8AA", "palegreen": "#98FB98", "paleturquoise": "#AFEEEE", "palevioletred": "#DB7093", "papayawhip": "#FFEFD5", "peachpuff": "#FFDAB9", "peru": "#CD853F", "pink": "#FFC0CB", "plum": "#DDA0DD", "powderblue": "#B0E0E6", "purple": "#800080", "red": "#FF0000", "rosybrown": "#BC8F8F", "royalblue": "#4169E1", "saddlebrown": "#8B4513", "salmon": "#FA8072", "sandybrown": "#F4A460", "seagreen": "#2E8B57", "seashell": "#FFF5EE", "sienna": "#A0522D", "silver": "#C0C0C0", "skyblue": "#87CEEB", "slateblue": "#6A5ACD", "slategray": "#708090", "snow": "#FFFAFA", "springgreen": "#00FF7F", "steelblue": "#4682B4", "tan": "#D2B48C", "teal": "#008080", "thistle": "#D8BFD8", "tomato": "#FF6347", "turquoise": "#40E0D0", "violet": "#EE82EE", "wheat": "#F5DEB3", "white": "#FFFFFF", "whitesmoke": "#F5F5F5", "yellow": "#FFFF00", "yellowgreen": "#9ACD32" };
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
  }
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
          if(this.colors[c.toLowerCase()]){
            c = this.colors[c.toLowerCase()];
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
  }
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
  }
  PixelDrawer.prototype.putImageData = function(data){
    this.imageData = data;
  }
})()
