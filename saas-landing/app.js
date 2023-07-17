(function () {
  const $navToggle = document.querySelector('[aria-controls="primary-nav"]');
  const $primaryNav = document.querySelector('#primary-nav');

  $navToggle.onclick = function (e) {
    const $target = e.currentTarget;
    if ($target.getAttribute('aria-expanded') === 'true') {
      $target.setAttribute('aria-expanded', false);
      $primaryNav.classList.replace('grid-rows-[0fr]', 'grid-rows-[1fr]');
    } else {
      $target.setAttribute('aria-expanded', true);
      $primaryNav.classList.replace('grid-rows-[1fr]', 'grid-rows-[0fr]');
    }
  }
})();

gsap.to("#page", {scale: 0.8, duration: 1});
gsap.from("#page", {x: '100vw', duration: 1});
gsap.to("#page", {scale: 1, duration: 1, delay: 1});