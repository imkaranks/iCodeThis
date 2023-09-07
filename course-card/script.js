'use strict';

const $countdown = document.getElementById('countdown'),
  $days = document.getElementById('days'),
  $hours = document.getElementById('hours'),
  $mins = document.getElementById('mins'),
  $secs = document.getElementById('secs');

const date = new Date();
const countDownDate = new Date(date.setDate(date.getDate() + 3)).getTime();

const x = setInterval(function() {

  const now = new Date().getTime();

  const distance = countDownDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  $days.textContent = days;
  $hours.textContent = hours;
  $mins.textContent = minutes;
  $secs.textContent = seconds;

  if (distance < 0) {
    clearInterval(x);
  }
}, 1000);