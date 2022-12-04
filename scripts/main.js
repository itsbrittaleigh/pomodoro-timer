document.addEventListener('DOMContentLoaded', function() {
  // elements
  const elStart = document.querySelector('#start');
  const elStop = document.querySelector('#stop');
  const elTimer = document.querySelector('#timer');
  const elForm = document.querySelector('#form');
  const elEdit = document.querySelector('#edit');
  const elMinutes = document.querySelector('#minutes');
  const elSeconds = document.querySelector('#seconds');
  
  // defaults
  const defaultMinutes = 15;
  const defaultSeconds = 0;

  // mutable settings
  let minutes = defaultMinutes;
  let seconds = defaultSeconds;
  let totalSeconds = calculateTotalSeconds(minutes, seconds);
  let countdownInterval;

  elMinutes.innerText = minutes;
  elSeconds.innerText = formatSeconds(seconds);
  
  // event listeners
  elEdit.addEventListener('click', toggleDisplay);
  elForm.addEventListener('submit', editTimer);
  elStart.addEventListener('click', startCountdown);
  elStop.addEventListener('click', pauseCountdown);
  
  // display functions
  function toggleDisplay() {
    if (elForm.classList.contains('hidden')) {
      elTimer.classList.add('hidden');
      elForm.classList.remove('hidden');
    } else {
      elTimer.classList.remove('hidden');
      elForm.classList.add('hidden');
    }
  }

  function formatSeconds(seconds) {
    if (seconds < 10) {
      return `0${seconds}`;
    }

    return seconds;
  }

  function calculateTotalSeconds(minutes, seconds) {
    return (minutes * 60) + seconds;
  }

  // form functions
  function editTimer(evt) {
    const elMinutesInput = document.querySelector('input[name="minutes"]');
    const elSecondsInput = document.querySelector('input[name="seconds"]');
    const elMinutesValue = elMinutesInput.value;
    const elSecondsValue = elSecondsInput.value;
    let userMinutes = defaultMinutes;
    let userSeconds = defaultSeconds;

    evt.preventDefault();
    
    if (elMinutesValue && elSecondsValue) {
      userMinutes = parseInt(elMinutesValue, 10);
      userSeconds = parseInt(elSecondsValue, 10);
    }

    minutes = userMinutes;
      seconds = userSeconds;
      totalSeconds = calculateTotalSeconds(userMinutes, userSeconds);
      elMinutes.innerText = userMinutes;
      elSeconds.innerText = formatSeconds(userSeconds);

      toggleDisplay();
  }

  // timer functions
  function countDown() {
    totalSeconds -= 1;

    if (totalSeconds > 0) {
      const newMinutes = Math.floor(totalSeconds / 60);
      const newSeconds = totalSeconds % 60;
      elMinutes.innerText = newMinutes;
      elSeconds.innerText = formatSeconds(newSeconds);
    } else {
      pauseCountdown();
    }
  }

  function startCountdown() {
    elStop.classList.remove('hidden');
    elStart.classList.add('hidden');
    countdownInterval = setInterval(countDown, 1000);
  }

  function pauseCountdown() {
    elStop.classList.add('hidden');
    elStart.classList.remove('hidden');
    clearInterval(countdownInterval);
  }
});
