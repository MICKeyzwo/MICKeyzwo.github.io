getScript("js/mediaLoader.js");
getScript("js/entyties.js");

window.addEventListener("load", () => {
    
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    canvas.width = 400;
    canvas.height = 600;

    let entyties = {};

    function prepare(){
        let ml = MediaLoader.create();
        ml.loadImage({

        }, setEntyties);
        function setEntyties(source){
            window._setEntyties(source);
            gemeMain();
        }
    }

    function gemeMain(){

        let state = 0;
        let 

    }

});