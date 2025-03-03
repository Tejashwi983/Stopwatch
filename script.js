let minutes = 0, seconds = 0, milliseconds = 0, interval;
let isRunning = false;

const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const showTimeButton = document.getElementById('show-time');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const currentTimeDisplay = document.getElementById('current-time');
const lapsList = document.getElementById('laps');

function startStopwatch() {
    if (!isRunning) {
        isRunning = true;
        interval = setInterval(updateTime, 10);
    }
}

function updateTime() {
    milliseconds++;
    if (milliseconds >= 100) {
        milliseconds = 0;
        seconds++;
    }
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
    }

    minutesDisplay.innerText = formatTime(minutes);
    secondsDisplay.innerText = formatTime(seconds);
    millisecondsDisplay.innerText = formatTime(milliseconds);
}

function formatTime(value) {
    return value < 10 ? `0${value}` : value;
}

function pauseStopwatch() {
    clearInterval(interval);
    isRunning = false;
}

function resetStopwatch() {
    clearInterval(interval);
    isRunning = false;
    minutes = seconds = milliseconds = 0;
    minutesDisplay.innerText = '00';
    secondsDisplay.innerText = '00';
    millisecondsDisplay.innerText = '00';
    lapsList.innerHTML = '';
}

function recordLap() {
    if (isRunning) {
        let lapItem = document.createElement('li');
        lapItem.innerText = `Lap: ${formatTime(minutes)}:${formatTime(seconds)}:${formatTime(milliseconds)}`;
        lapsList.appendChild(lapItem);
    }
}

function showCurrentTime() {
    const now = new Date();
    const hours = formatTime(now.getHours());
    const mins = formatTime(now.getMinutes());
    const secs = formatTime(now.getSeconds());
    currentTimeDisplay.innerText = `${hours}:${mins}:${secs}`;
}

// Event Listeners
startButton.addEventListener('click', startStopwatch);
pauseButton.addEventListener('click', pauseStopwatch);
resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', recordLap);
showTimeButton.addEventListener('click', showCurrentTime);

