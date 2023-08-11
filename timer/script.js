(function () {
  const $timerProgress = document.querySelector('.timer__progress');
  const $timerProgressTime = document.querySelector('.timer__progress-time');
  const $timerMinutes = document.querySelector('#mins');
  const $timerSeconds = document.querySelector('#secs');
  const $togglePause = document.querySelector('#togglePause');
  const $closeBtn = document.querySelector('#close');
  let timerId = null;
  let timePassed = 0;

  $togglePause.onclick = function () {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    } else {
      startTimer();
    }
    $timerProgress.classList.toggle('running');
  }

  $closeBtn.onclick = function () {
    clearInterval(timerId);
    timerId = null;
    timePassed = 0;
    if ($timerProgress.classList.contains('running')) {
      $timerProgress.classList.remove('running');
    }
    $timerProgressTime.textContent = formatDuration(timePassed);
    $timerProgress.setAttribute('style', `--progress: 0deg`);
  }

  function startTimer() {
    const timeInMinutes = (+$timerMinutes.value) * 60 + (+$timerSeconds.value);
    clearInterval(timerId);
    timerId = setInterval(() => {
      const colorStop = 3.6 * (timePassed / timeInMinutes * 100);
      if (timePassed === timeInMinutes) {
        clearInterval(timerId);
      }
      $timerProgressTime.textContent = formatDuration(timePassed);
      $timerProgress.setAttribute('style', `--progress: ${colorStop}deg`);
      timePassed++;
    }, 1000);
  }

  function formatDuration(time) {
    let hours = Math.floor(time / 3600);
    let minutes = Math.floor((time - (hours * 3600)) / 60);
    let seconds = time - (hours * 3600) - (minutes * 60);
    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return hours + ':' + minutes + ':' + seconds;
  }
})();