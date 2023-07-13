(function () {
  const $input = document.querySelector('input');
  const $keys = document.querySelectorAll('[data-key]');
  const $capKeys = document.querySelectorAll('[data-capslock]');
  const $keyTexts = document.querySelectorAll('.key-text');
  const $capsLockBtn = document.querySelector('#capslock');
  let isCapOn = false;

  $capsLockBtn.click();

  $keys.forEach($key => {
    $key.onclick = function (e) {
      const $value = e.currentTarget.querySelector('.key-text:not(.hidden)')?.textContent?.trim() || e.currentTarget.textContent.trim();
      switch ($value.toLowerCase()) {
        case 'capslock':
          toggleCapslock();
          isCapOn = !isCapOn;
          break;

        case 'backspace':
          $input.value = $input.value.substring(0, $input.value.length - 1);
          break;

        case '123':
        case 'abc':
          toggleNumpad();
          break;

        case 'space':
          $input.value += ' ';
          break;

        case 'global':
          break;

        case 'voice search':
          break;

        case 'search':
          break;

        default:
          $input.value +=
            isCapOn
            ? $value.toUpperCase()
            : $value;
      }
    }
  });

  function toggleCapslock() {
    if (!isCapOn) {
      $capsLockBtn.classList.replace('bg-[#24307e]', 'bg-[#1b276a]');
    } else {
      $capsLockBtn.classList.replace('bg-[#1b276a]', 'bg-[#24307e]');
    }
    $capKeys.forEach($capKey => {
      $capKey.classList.toggle('uppercase');
    });
  }

  function toggleNumpad() {
    $keyTexts.forEach($keyText => {
      $keyText.classList.toggle('hidden');
    });
  }
})();