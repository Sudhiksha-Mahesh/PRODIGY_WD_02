let isRunning = false;
let startTime = 0;
let elapsedTime = 0;
let intervalId;
let laps = [];

const hoursDisplay = document.getElementById('hours');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const lapTimes = document.getElementById('lapTimes');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');

function updateDisplay() {
  const totalSeconds = Math.floor(elapsedTime / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  hoursDisplay.textContent = String(hours).padStart(2, '0');
  minutesDisplay.textContent = String(minutes).padStart(2, '0');
  secondsDisplay.textContent = String(seconds).padStart(2, '0');
}

function startStopwatch() {
  startTime = Date.now() - elapsedTime;
  intervalId = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    updateDisplay();
  }, 1000);
}

function stopStopwatch() {
  clearInterval(intervalId);
}

function toggleStartStop() {
  if (isRunning) {
    stopStopwatch();
    startStopBtn.textContent = 'Start';
  } else {
    startStopwatch();
    startStopBtn.textContent = 'Stop';
  }
  isRunning = !isRunning;
}

function resetStopwatch() {
  stopStopwatch();
  elapsedTime = 0;
  updateDisplay();
  startStopBtn.textContent = 'Start';
  isRunning = false;
  lapTimes.innerHTML = '';  // Clear lap times
}

function recordLap() {
  if (isRunning) {
    const totalSeconds = Math.floor(elapsedTime / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const lapTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    const li = document.createElement('li');
    li.textContent = `Lap ${laps.length + 1}: ${lapTime}`;
    lapTimes.appendChild(li);
    laps.push(lapTime);
  }
}

startStopBtn.addEventListener('click', toggleStartStop);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);
