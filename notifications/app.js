(function () {
  const $content = document.querySelector('main');
  const $form = document.getElementById('form');
  const $payBtn = document.querySelector('[type="submit"]');
  const $saveBtn = document.getElementById('save');

  $payBtn.addEventListener('click', event => {
    event.preventDefault();
    const $amount = document.getElementById('amount');
    const { value } = $amount;
    if (value !== '') {
      const type = parseInt(value) === 89 ? 'success' : 'warning';
      const message = parseInt(value) === 89 ? 'Payment successfully processed' : 'An error occured while processing your request'
      $form.classList.add('slide-out');
      setTimeout(() => {
        $form.setAttribute('hidden', true);
        $amount.value = '';
        $content.appendChild(createNotification(type, message));
      }, 300);
    } else {
      alert('Please enter an amount');
    }
  })

  $saveBtn.addEventListener('click', event => {
    event.preventDefault();
    const $amount = document.getElementById('amount');
    const { value } = $amount;
    if (value !== '') {
      $form.classList.add('slide-out');
      setTimeout(() => {
        $form.setAttribute('hidden', true);
        $content.appendChild(createNotification('generic', 'Your changes have been saved'));
      }, 300);
    } else {
      alert('Please enter an amount');
    }
  });

  function createNotification(type, message) {
    const $alert = document.createElement('div');
    const $closeBtn = document.createElement('button');
    $closeBtn.innerHTML = '<span class="sr-only">Close</span><i class="fa-solid fa-times"></i>'
    $closeBtn.onclick = () => closeAlert($alert);
    $alert.className = `${type !== 'warning' ? 'bg-primary-200' : 'bg-warning'} w-11/12 max-w-xl mx-auto flex ${type === 'warning' && 'flex-wrap'} items-center gap-4 px-4 py-2 rounded-sm slide-in`;
    $alert.innerHTML = `
      ${type === 'success' ? '<i class="fa-solid fa-check"></i>' : ''}
      <p class="${type === 'warning' ? 'w-full sm:w-auto sm:flex-1' : 'flex-1'}">${message}</p>`;
    if (type === 'warning') {
      const $tryAgainBtn = document.createElement('button');
      $tryAgainBtn.className = 'ml-auto';
      $tryAgainBtn.onclick = () => closeAlert($alert);
      $tryAgainBtn.textContent = "Try again";
      $alert.appendChild($tryAgainBtn);
    }
    $alert.appendChild($closeBtn);
    return $alert;
  }

  function closeAlert($alert) {
    $alert.classList.remove('slide-in');
    $alert.classList.add('slide-out');
    $form.classList.remove('slide-out');
    $form.classList.add('slide-in');
    setTimeout(() => {
      $alert.remove();
      $form.removeAttribute('hidden');
    }, 300);
  }
})();