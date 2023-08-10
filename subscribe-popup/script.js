(function () {
  const $closeBtn = document.querySelector('#close-popup');
  const $formContainer = document.querySelector('#form-container');
  const $form = document.querySelector('#form');
  const $cta = document.querySelector('#cta');
  const $successAlert = document.querySelector('#success-alert');
  const $ctaBtn = $cta.querySelector('button');
  const $closeAlertBtn = $successAlert.querySelector('#close-success-alert');

  $closeBtn.onclick = () => switchTo($formContainer, $cta);
  $ctaBtn.onclick = () => switchTo($cta, $formContainer);
  $closeAlertBtn.onclick = () => switchTo($successAlert, $formContainer);
  $form.onsubmit = (e) => {
    e.preventDefault();
    const $subscribeBtn = $form.querySelector('#subscribe-btn');
    $subscribeBtn.textContent = "Subscribing...";
    setTimeout(() => {
      $subscribeBtn.textContent = "Subscribe";
      switchTo($formContainer, $successAlert);
    }, Math.random() * 1500);
  };

  function switchTo(from, to) {
    if (from.classList.contains('animate-enter')) {
      from.classList.remove('animate-enter');
    }
    setTimeout(() => {
      from.classList.add('animate-exit');
    }, 0);
    setTimeout(() => {
      to.classList.add('animate-enter');
      from.setAttribute('hidden', true);
      to.removeAttribute('hidden');
    }, 300);
  }
})();