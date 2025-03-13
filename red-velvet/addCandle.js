window.candleCount = 0;

// Give some options for more buttons, because, yes, time is money and my fingers refuse to click more than 20 times
const icingBorder = document.querySelector('.icing-border');
const addOneBtn = document.getElementById('add-one');
const addFiveBtn = document.getElementById('add-five');
const addTenBtn = document.getElementById('add-ten');

// The default number to add is 1 candle per click
let candlesToAdd = 1;

function createCandleAt(x, y) {
  const candle = document.createElement('div');
  candle.classList.add('candle');

  const flame = document.createElement('div');
  flame.classList.add('flame');
  candle.appendChild(flame);

  candle.style.position = 'absolute';
  candle.style.left = (x - 5) + 'px';
  candle.style.top = (y - 30) + 'px';

  icingBorder.appendChild(candle);
  window.candleCount++;
  updateBirthdayMessage();
}


function createCandles(e) {
  e.preventDefault();
  const x = e.offsetX;
  const y = e.offsetY;

  for (let i = 0; i < candlesToAdd; i++) {
      // Spread the candles randomly...
    let randomX = x + (Math.random() * 80 - 30);
    // ... with a small variation
    let randomY = y + (Math.random() * 20 - 10);
    createCandleAt(randomX, randomY);
  }
}

// Attach a single event listener
icingBorder.addEventListener('click', createCandles);

// Add button event listeners to update the number of candles
addOneBtn.addEventListener('click', () => candlesToAdd = 1);
addFiveBtn.addEventListener('click', () => candlesToAdd = 5);
addTenBtn.addEventListener('click', () => candlesToAdd = 10);
