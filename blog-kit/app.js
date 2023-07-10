const $cursor = document.getElementById('cursor');
const $cursorBlur = document.getElementById('cursor-blur');
const $hoverables = document.querySelectorAll('[data-hoverable]');

const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  themeToggleLightIcon.classList.remove('hidden');
} else {
  themeToggleDarkIcon.classList.remove('hidden');
}

const themeToggleBtn = document.getElementById('theme-toggle');

themeToggleBtn.addEventListener('click', function () {

  themeToggleDarkIcon.classList.toggle('hidden');
  themeToggleLightIcon.classList.toggle('hidden');

  if (localStorage.getItem('color-theme')) {
    if (localStorage.getItem('color-theme') === 'light') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('color-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('color-theme', 'light');
    }
  } else {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('color-theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('color-theme', 'dark');
    }
  }

});

document.onmousemove = function (e) {
  $cursor.style.left = `${e.x - ($cursor.clientWidth / 2)}px`;
  $cursorBlur.style.left = `${e.x - ($cursorBlur.clientWidth / 2)}px`;
  $cursor.style.opacity = '1';
  $cursor.style.top = `${e.y - ($cursor.clientWidth / 2)}px`;
  $cursorBlur.style.top = `${e.y - ($cursorBlur.clientWidth / 2)}px`;
  $cursorBlur.style.opacity = '1';
}
$hoverables.forEach($hoverable => {
  $hoverable.onmouseover = function () {
    $cursor.style.backgroundColor = 'transparent'
    $cursor.style.transform = 'scale(2.5)';
    $cursor.style.border = `0.4px solid ${document.documentElement.classList.contains('dark') ? 'white' : 'black'}`;
  }
  $hoverable.onmouseout = function () {
    $cursor.style.backgroundColor = 'rgb(147 51 234)'
    $cursor.style.transform = 'scale(1)';
    $cursor.style.border = 'none';
  }
});