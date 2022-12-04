document.addEventListener('DOMContentLoaded', function() {
  // elements
  const elStart = document.querySelector('#start');
  const elStop = document.querySelector('#stop');
  const elTimer = document.querySelector('#timer');
  const elForm = document.querySelector('#form');
  const elEdit = document.querySelector('#edit');
  const elMinutes = document.querySelector('#minutes');
  const elSeconds = document.querySelector('#seconds');
  const elCountdown = document.querySelector('#countdown-outer');
  
  // defaults
  const defaultMinutes = 15;
  const defaultSeconds = 0;
  const interval = 1000; // one second
  const hiddenClassName = 'hidden';

  // mutable settings
  let minutes = defaultMinutes;
  let seconds = defaultSeconds;
  let totalSeconds = calculateTotalSeconds(minutes, seconds);
  let totalSecondsRemaining = totalSeconds;
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
    if (elForm.classList.contains(hiddenClassName)) {
      elTimer.classList.add(hiddenClassName);
      elForm.classList.remove(hiddenClassName);
    } else {
      elTimer.classList.remove(hiddenClassName);
      elForm.classList.add(hiddenClassName);
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
    totalSecondsRemaining = totalSeconds;
    elMinutes.innerText = userMinutes;
    elSeconds.innerText = formatSeconds(userSeconds);

    toggleDisplay();
  }

  // timer functions
  function countDown() {
    totalSecondsRemaining -= 1;

    if (totalSecondsRemaining > 0) {
      const newMinutes = Math.floor(totalSecondsRemaining / 60);
      const newSeconds = totalSecondsRemaining % 60;
      const totalSecondsPassed = totalSeconds - totalSecondsRemaining;
      const degreesFilledPerSecond = 360 / totalSeconds;
      const degreesFilled = totalSecondsPassed * degreesFilledPerSecond;
      elMinutes.innerText = newMinutes;
      elSeconds.innerText = formatSeconds(newSeconds);
      elCountdown.style.background = `conic-gradient(#910A0A ${degreesFilled}deg, #000000 ${degreesFilled}deg)`;
    } else {
      pauseCountdown();
    }
  }

  function startCountdown() {
    elStop.classList.remove(hiddenClassName);
    elStart.classList.add(hiddenClassName);
    countdownInterval = setInterval(countDown, interval);
  }

  function pauseCountdown() {
    elStop.classList.add(hiddenClassName);
    elStart.classList.remove(hiddenClassName);
    clearInterval(countdownInterval);
  }
});
