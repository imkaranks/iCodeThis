const $cursor = document.getElementById('cursor');
const $cursorBlur = document.getElementById('cursor-blur');

const $bookmarkBtns = document.querySelectorAll('.bookmark-btn');

const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

if (window.matchMedia('(pointer: fine)').matches) {
  document.onmousemove = function (e) {
    if (
      e.target.tagName === 'A' ||
      e.target.tagName === 'BUTTON' ||
      e.target.parentNode.tagName === 'A' ||
      e.target.parentNode.tagName === 'BUTTON'
    ) {
      $cursor.style.backgroundColor = 'transparent';
      $cursor.style.transform = 'scale(3)';
      $cursor.style.border = `1px solid ${document.documentElement.classList.contains('dark') ? 'white' : 'black'}`;
    } else {
      $cursor.style.backgroundColor = 'rgb(147 51 234)';
      $cursor.style.transform = 'scale(1)';
      $cursor.style.border = 'none';
    }
    setTimeout(() => {
      $cursor.style.left = `${e.x - ($cursor.clientWidth / 2)}px`;
      $cursorBlur.style.left = `${e.x - ($cursorBlur.clientWidth / 2)}px`;
      $cursor.style.opacity = '1';
      $cursor.style.top = `${e.y - ($cursor.clientWidth / 2)}px`;
      $cursorBlur.style.top = `${e.y - ($cursorBlur.clientWidth / 2)}px`;
      $cursorBlur.style.opacity = '1';
    }, 30);
  }
}

$bookmarkBtns.forEach($bookmarkBtn => {
  $bookmarkBtn.onclick = function (e) {
    const $icon = e.currentTarget.querySelector('i');
    if ($icon.classList.contains('fa-solid')) {
      $icon.classList.replace('fa-solid', 'fa-regular');
    } else {
      $icon.classList.replace('fa-regular', 'fa-solid');
    }
  }
});

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