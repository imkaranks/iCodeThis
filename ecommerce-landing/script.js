const $dropdownMenu = document.getElementById('dropdown__menu');
const $navToggle = document.querySelector('[aria-controls="primary-nav"]');

$dropdownMenu.addEventListener('click', (event) => {
  const $dropdownBtn = event.target.closest('.dropdown__control');
  if ($dropdownBtn) {
    const $dropdown = document.getElementById(
      $dropdownBtn.getAttribute('aria-controls')
    );
    const $dropdownBtnIcon = $dropdownBtn.querySelector('.fa-chevron-right');

    if ($dropdownBtn.getAttribute('aria-expanded') === 'true') {
      $dropdown.classList.replace('grid-rows-[1fr]', 'grid-rows-[0fr]');
      $dropdown.style.paddingBlock = '0em';
      $dropdownBtnIcon.classList.remove('rotate-[90deg]');
      $dropdownBtn.setAttribute('aria-expanded', false);
      $dropdown.setAttribute('aria-hidden', true);
    } else {
      $dropdown.classList.replace('grid-rows-[0fr]', 'grid-rows-[1fr]');
      $dropdown.style.paddingBlock = '0.5em';
      $dropdownBtnIcon.classList.add('rotate-[90deg]');
      $dropdownBtn.setAttribute('aria-expanded', true);
      $dropdown.setAttribute('aria-hidden', false);
    }
  }
});

$navToggle.addEventListener('click', () => {
  const $menu = document.getElementById(
    $navToggle.getAttribute('aria-controls')
  );
  const isExpanded = $navToggle.getAttribute('aria-expanded');
  if (isExpanded === 'false') {
    $menu.classList.replace('-translate-x-full', 'translate-x-0');
    $navToggle.classList.replace('text-dark', 'text-white');
    $navToggle.setAttribute('aria-expanded', true);
  } else {
    $menu.classList.replace('translate-x-0', '-translate-x-full');
    $navToggle.classList.replace('text-white', 'text-dark');
    $navToggle.setAttribute('aria-expanded', false);
  }
});