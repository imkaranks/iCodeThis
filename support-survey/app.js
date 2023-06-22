window.onload = function () {
  const $options = document.querySelectorAll('input[type="radio"]');
  const $formGrp = document.querySelectorAll('.form-group');
  const $form = document.querySelector('form');
  const $closeBtn = document.querySelector('#close');
  let previous = $formGrp.length - 1; // initially points to last option

  $form.classList.add('crop-out');
  startTransition();

  $options.forEach(($option, index) => {
    $option.addEventListener('click', (ev) => {
      const $target = ev.currentTarget;
      const $parent = $target.parentNode;
      const $prevParent =
        previous !== null
          ? $options[previous].parentNode
          : null;
      if (previous !== null) {
        $prevParent.classList.remove('bg-[#656EFF]', 'shadow-lg', 'text-white');
        $prevParent.classList.add('bg-[#FAFAFE]', 'text-neutral-700');
      }
      if ($target.checked) {
        $parent.classList.remove('bg-[#FAFAFE]', 'text-neutral-700');
        $parent.classList.add('bg-[#656EFF]', 'text-white', 'shadow-lg');
        previous = index;
      }
    });
  });

  $form.addEventListener('submit', (ev) => ev.preventDefault());

  $closeBtn.addEventListener('click', (ev) => {
    const expanded = ev.target.getAttribute('aria-expanded');
    if (expanded === 'true') {
      ev.target.setAttribute('aria-expanded', false);
      $form.classList.add('expanded');
      $closeBtn.querySelector('[aria-hidden]').innerHTML = '&minus;';
      $closeBtn.querySelector('.sr-only').textContent = 'close';

      startTransition();
    } else {
      ev.target.setAttribute('aria-expanded', true);
      $form.classList.remove('expanded');
      $closeBtn.querySelector('[aria-hidden]').innerHTML = '&plus;';
      $closeBtn.querySelector('.sr-only').textContent = 'open';

      endTransition();
    }
  });

  function startTransition() {
    $formGrp.forEach(($item, index) => {
      $item.classList.add('slide-in');
      $item.style.animationDelay = `${200 * (index + 1)}ms`;
    });
  }

  function endTransition() {
    $formGrp.forEach($item => {
      $item.classList.remove('slide-in');
    });
  }
}