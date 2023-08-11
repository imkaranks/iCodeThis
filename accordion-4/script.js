(function () {
  const $accordionBtns = document.querySelectorAll('.accordion__control');

  $accordionBtns.forEach($accordionBtn => {
    $accordionBtn.onclick = () => toggleAccordion($accordionBtn);
  });

  function toggleAccordion($accordionBtn) {
    const $controlled = document.getElementById(
      `${$accordionBtn.getAttribute('aria-controls')}`
    );
    const $plusIcon = $accordionBtn.querySelector('.btn__plus-icon');
    const $minusIcon = $accordionBtn.querySelector('.btn__minus-icon');

    if ($controlled.getAttribute('aria-hidden') === 'true') {
      $plusIcon.classList.add('hidden');
      $minusIcon.classList.remove('hidden');
      $controlled.classList.replace('grid-rows-[0fr]', 'grid-rows-[1fr]');
      $controlled.classList.replace('pb-1', 'py-6');
      $controlled.setAttribute('aria-hidden', false);
    } else {
      $plusIcon.classList.remove('hidden');
      $minusIcon.classList.add('hidden');
      $controlled.classList.replace('grid-rows-[1fr]', 'grid-rows-[0fr]');
      $controlled.classList.replace('py-6', 'pb-1');
      $controlled.setAttribute('aria-hidden', true);
    }
  }
})();