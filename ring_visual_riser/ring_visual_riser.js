window.addEventListener("load", () => {
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  canvas.width = canvas.height = 400;
  ctx.strokeStyle = ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
  ctx.lineWidth = 1;
  let source;
  let timer;
  let audioCtx = new AudioContext();
  let fileReader = new FileReader();
  let analyser = audioCtx.createAnalyser();
  analyser.fftSize = 1024;
  analyser.connect(audioCtx.destination);
  document.getElementById("file").addEventListener("change", (e) => {
    fileReader.readAsArrayBuffer(e.target.files[0]);
  });
  fileReader.addEventListener("load", () => {
    audioCtx.decodeAudioData(fileReader.result, (buffer) => {
      if(source){
        source.stop();
        clearInterval(timer);
      }
      source = audioCtx.createBufferSource();
      source.buffer = buffer;
      source.connect(analyser);
      source.start(0);
      timer = setInterval(tick, 1000 / 30);
    });
  });
  function tick(){
    let spectrums = new Uint8Array(analyser.frequencyBinCount);
    let wave = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(spectrums)
    analyser.getByteTimeDomainData(wave);
    ctx.setTransform(1 , 0 , 0 , 1 , 0 , 0);
    ctx.clearRect(0, 0, 400, 400);
    ctx.beginPath();
    ctx.moveTo(0, 327 - wave[0]);
    for(let i = 1; i < 512; i++){
      ctx.lineTo(i * (400 / 512), 327 - wave[i]);
    }
    ctx.lineTo(400, 327 - wave[512]);
    ctx.stroke();
    ctx.translate(200, 200);
    for(let i = 0; i < 32; i++){
      ctx.beginPath();
      ctx.fillRect(-5, -85, 15, spectrums[i * 5] / -2);
      ctx.rotate(Math.PI / 8);
      if(i == 15) ctx.rotate(Math.PI / 16);
    }
  }
});
