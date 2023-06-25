(function () {
  const $hour = document.getElementById('hour');
  const $minutes = document.getElementById('minutes');
  const $period = document.getElementById('period');
  const $submitBtn = document.getElementById('submit-btn');
  const CONSTANTS = {
    HOURS: 'HOURS',
    MINUTES: 'MINUTES',
    PERIOD: 'PERIOD'
  }
  let time = {
    hours: '4',
    mins: '10',
    period: 'AM'
  }

  for (let i = 0; i < 60; i++) {
    const $option = document.createElement('option');
    $option.setAttribute('value', i);
    $option.textContent = i < 10 ? `0${i}` : i;
    if (i === 10) {
      $option.setAttribute('selected', true);
    }
    $minutes.appendChild($option);
  }

  $hour.oninput = function (event) {
    const { value: hour } = event.target;
    updateTime({ type: CONSTANTS.HOURS, payload: { hour } })
  }

  $minutes.oninput = function (event) {
    const { value: mins } = event.target;
    updateTime({ type: CONSTANTS.MINUTES, payload: { mins } })
  }

  $period.oninput = function (event) {
    const { value: period } = event.target;
    updateTime({ type: CONSTANTS.PERIOD, payload: { period } })
  }

  $submitBtn.onclick = function (event) {
    event.preventDefault();
    alert(`Alarm set for ${time.hours}:${time.mins} ${time.period}.`);
  }

  function updateTime(action) {
    switch (action.type) {
      case CONSTANTS.HOURS:
        time = {
          ...time,
          hours: action.payload.hour
        }
        break;
      case CONSTANTS.MINUTES:
        time = {
          ...time,
          mins: action.payload.mins
        }
        break;
      case CONSTANTS.PERIOD:
        time = {
          ...time,
          period: action.payload.period
        }
        break;
    }
  }
})();