(function () {
  const $sendBtn = document.getElementById('send');
  const $copyBtn = document.getElementById('copy');
  const $input = document.querySelector('input');
  const $select = document.querySelector('select');
  const $main = document.querySelector('main');
  const $successAlert = document.getElementById('success-alert');
  const $closeAlert = document.getElementById('close-alert');
  const dialingCodes = {
    'in': '+91',
    'us': '+1',
    'gb-uk': '+44',
  }

  $sendBtn.onclick = (e) => sendLink(e);

  $copyBtn.onclick = copy;

  $select.oninput = (e) => getDialingCode(e);

  $closeAlert.onclick = hideAlert;

  function copy() {
    navigator.clipboard.writeText($copyBtn.previousElementSibling.textContent.trim());
    $copyBtn.textContent = 'Copied!';
    setTimeout(() => {
      $copyBtn.textContent = 'Copy';
    }, 2000);
  }

  function getDialingCode(e) {
    const country = e.target.value;
    $input.value = dialingCodes[country];
  }

  function sendLink(e) {
    e.preventDefault();
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    const { value } = $input;
    if (phoneRegex.test(value)) {
      document.getElementById('phone').textContent = $input.value;
      showAlert();
      $input.value = dialingCodes[$select.value];
    } else {
      alert('Please enter a valid phone number');
    }
  }

  function showAlert() {
    if ($main.classList.contains('shrink-out')) {
      $main.classList.remove('shrink-out');
    }
    $main.classList.add('shrink-in');
    setTimeout(() => {
      $main.setAttribute('hidden', true);
      $successAlert.removeAttribute('hidden');
      if ($successAlert.classList.contains('shrink-in')) {
        $successAlert.classList.remove('shrink-in');
      }
      $successAlert.classList.add('shrink-out');
    }, 300);
  }

  function hideAlert() {
    if ($successAlert.classList.contains('shrink-out')) {
      $successAlert.classList.remove('shrink-out');
    }
    $successAlert.classList.add('shrink-in');
    setTimeout(() => {
      $successAlert.setAttribute('hidden', true);
      $main.removeAttribute('hidden');
      if ($main.classList.contains('shrink-in')) {
        $main.classList.remove('shrink-in');
      }
      $main.classList.add('shrink-out');
    }, 300);
  }
})();