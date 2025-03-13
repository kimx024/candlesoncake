document.getElementById('submitName').addEventListener('click', function() {
  window.updateBirthdayMessage = function() {
    const name = document.getElementById('recipientName').value;
    const message = document.getElementById('birthdayMessage');
    if (name) {
      message.innerHTML = `${name}, happy birthday! You are: ${window.candleCount} years old.` ;
      message.style.display = 'block';

      // if (window.candleCount < 10) {
      //   message.style.color = 'lightblue'; // Children - light blue
      // } else if (window.candleCount < 20) {
      //   message.style.color = 'green'; // Teenagers - green
      // } else if (window.candleCount < 30) {
      //   message.style.color = 'orange'; // Twenties - orange
      // } else if (window.candleCount < 40) {
      //   message.style.color = 'darkblue'; // Thirties - dark blue
      // } else {
      //   message.style.color = 'red'; // Forties and older - red
      // }
    }
  }
  document.getElementById('submitName').addEventListener('click', function() {
    const cake = document.getElementById('cake');
    const addCandleButton= document.querySelector('.add-candle-button-container')
    if (cake) {
      cake.classList.remove('hidden'); // Remove the 'hidden' class to show the cake
    }
    // Hide the input container
    document.querySelector('.input-container').style.display = 'none';
    updateBirthdayMessage(); // Update or show the birthday message
    addCandleButton.style.display = 'block';
  });
});

