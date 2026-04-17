let timer;
let isRunning = false;
let seconds = 0;

const display = document.getElementById("display");
const startPauseBtn = document.getElementById("startPauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const laps = document.getElementById("laps");

function formatTime(sec) {
  let hrs = Math.floor(sec / 3600);
  let mins = Math.floor((sec % 3600) / 60);
  let secs = sec % 60;

  return (
    String(hrs).padStart(2, "0") + ":" +
    String(mins).padStart(2, "0") + ":" +
    String(secs).padStart(2, "0")
  );
}

function updateDisplay() {
  display.textContent = formatTime(seconds);
}


startPauseBtn.addEventListener("click", () => {
  if (!isRunning) {
    timer = setInterval(() => {
      seconds++;
      updateDisplay();
    }, 1000);
    startPauseBtn.textContent = "Pause";
    isRunning = true;
  } else {
    clearInterval(timer);
    startPauseBtn.textContent = "Start";
    isRunning = false;
  }
});

resetBtn.addEventListener("click", () => {
  clearInterval(timer);
  seconds = 0;
  updateDisplay();
  startPauseBtn.textContent = "Start";
  isRunning = false;
  laps.innerHTML = "";
});


lapBtn.addEventListener("click", () => {
  if (isRunning) {
    const li = document.createElement("li");
    li.textContent = formatTime(seconds);
    laps.appendChild(li);
  }
});