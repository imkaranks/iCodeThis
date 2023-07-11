const $form = document.querySelector('form');

gsap.fromTo('main', {
  clipPath: 'polygon(0 0, 100% 0, 0 0, 0% 100%)'
}, {
  clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)'
});

gsap.from('.illustration, span, h1, p, .checkbox, label, input, select, button', {
  y: -100,
  opacity: 0,
  stagger: 0.1,
  delay: 0.3
});

$form.onsubmit = function (e) {
  e.preventDefault();
  const isCardValid = isValid(document.getElementById('card-no'));
  const isExpMonthValid = isValid(document.querySelector('[data-expiry-month]'));
  const isExpDateValid = isValid(document.querySelector('[data-expiry-date]'));
  const isCvcValid = isValid(document.querySelector('[data-card-cvc]'));
  if (isCardValid && isExpMonthValid && isExpDateValid && isCvcValid) {
    alert('Payment has been made successfully!');
  }
}

function isValid($input) {
  if ($input.value.trim()) {
    return true;
  } else {
    $input.style.borderColor = 'red';
    setTimeout(() => {
      $input.style.borderColor = '#ddd';
    }, 3000);
    return false;
  }
}