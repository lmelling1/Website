const start = document.getElementById("start");
const pause = document.getElementById("pause");
const reset = document.getElementById("reset");
const timer = document.getElementById("timer");
const alarm = new Audio("audio/completed-sound-effect.mp3");
const hourglass = document.getElementById("hourglass");
const width = 125;
const totalFrames = 4;

let timeLeft = 1500;
let interval;


const updateTimer = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    timer.innerHTML = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

const startTimer = () => {
      if (interval) {
            clearInterval(interval);
      }

      interval = setInterval(() => {
            timeLeft--;
            updateTimer();

            if (timeLeft === 0) {
                  clearInterval(interval);
                  alarm.play();
            }
      }, 1000);
};

const pauseTimer = () => {
      clearInterval(interval);
      clearInterval(animationInterval);
}

const resetTimer = () => {
      clearInterval(interval);
      timeLeft = 1500;
      updateTimer();
}

start.addEventListener("click", startTimer);
pause.addEventListener("click", pauseTimer);
reset.addEventListener("click", resetTimer);