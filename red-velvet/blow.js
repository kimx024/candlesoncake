// We're actually going to ask for some permission, baby! Consent is very important
let microphone;
let audioContext;
let analyser;
let isListening = false;

window.webkitAudioContext = undefined;

function startListening() {
  if (isListening) return;
  isListening = true;

  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048;

    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(function (stream) {
        microphone = audioContext.createMediaStreamSource(stream);
        microphone.connect(analyser);
        listenToMicrophone();
      })
      .catch(function (err) {
        console.error("Error capturing audio. Can you make a sound, please?", err);
      });
  } else {
    console.error("The browser does not support the Web Audio API or getUserMedia. Get another browser.");
  }
}

// What the mic should do when it is turned on and the user has given permission. You did, right? Please?
function listenToMicrophone() {
  const dataArray = new Uint8Array(analyser.frequencyBinCount);

  const checkAudio = () => {
    if (!isListening) return;

    analyser.getByteFrequencyData(dataArray);
    let sum = dataArray.reduce((a, value) => a + value, 0);
    let average = sum / dataArray.length;

    // Small blow (This threshold is an estimate, don't abuse your microphone)
    const WEAK_BLOW_THRESHOLD = 30;

    // Full force (Let me guess, you have a lot of candles to blow out?)
    const STRONG_BLOW_THRESHOLD = 70;

    if (average > STRONG_BLOW_THRESHOLD) {
        // Blow out all the candles, and
      blowOutCandles(true);
      // ... lets your mic knows to stop listening
      isListening = false;
    } else if (average > WEAK_BLOW_THRESHOLD) {
        // Blow out some candles randomly. You actually gotta try!
      blowOutCandles(false);
    }

    requestAnimationFrame(checkAudio);
  };

  checkAudio();
}

function blowOutCandles(blowHard) {
  const flames = document.querySelectorAll('.flame');

  if (flames.length === 0) {
    console.warn("No candles to blow out yet!");
    return;
  }

  if (blowHard) {
    // Blow out ALL candles
    flames.forEach(flame => flame.classList.add('hidden'));
    console.log('All candles blown out!');
  } else {
    // Blow out 1 or 2 random candles
    let numToBlow = Math.floor(Math.random() * 2) + 1; // Randomly choose 1 or 2 candles
    let flamesArray = Array.from(flames);

    for (let i = 0; i < numToBlow && flamesArray.length > 0; i++) {
      let randomIndex = Math.floor(Math.random() * flamesArray.length);
      flamesArray[randomIndex].classList.add('hidden');
      // Remove blown-out candle from selection
      flamesArray.splice(randomIndex, 1);
    }
    console.log(`${numToBlow} candles blown out!`);
  }
}

// Start listening when candles are added
document.querySelector('.icing-border').addEventListener('click', function () {
  if (!isListening) {
    setTimeout(startListening, 5000); // Start microphone after 5 seconds
  }
});
