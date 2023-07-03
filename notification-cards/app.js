const $btns = document.querySelectorAll('button');
$btns.forEach($btn => {
  $btn.onclick = (e) => hideNotification(e);
});

function hideNotification(e) {
  const $parent = e.currentTarget.parentNode;
  $parent.classList.remove('slide-in');
  $parent.classList.add('slide-out');
  setTimeout(() => {
    $parent.remove();
  }, 300);
}