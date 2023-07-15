(function () {
  const visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
  const cvvRegEx = /[0-9]{3}/;
  const nameRegEx = /^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?\s)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/;
  const $form = document.querySelector('form');
  const $cardNum = document.querySelector('input[name="cardNum"]');
  const $cardExpiry = document.querySelector('input[name="cardExpiry"]');
  const $cardCvv = document.querySelector('input[name="cardCvv"]');
  const $cardHolder = document.querySelector('input[name="cardHolder"]');

  $cardNum.oninput = function (e) {
    const $parent = e.target.parentElement;
    const $hint = document.createElement('p');
    const isValid = visaRegEx.test(e.target.value);
    $hint.className = 'font-normal text-sm text-[hsl(202,_10%,_62%)]';
    $hint.textContent = "Must start with 4 and should contain 13 or 16 numbers"
    if (isValid || $parent.nextElementSibling) {
      $parent.nextElementSibling.remove();
    }
    validateInput(visaRegEx, e.target);
    if (!isValid) {
      $parent.insertAdjacentElement('afterend', $hint);
    }
  }

  $cardExpiry.oninput = function (e) {
    isValidExpiry(e.target);
  }

  $cardCvv.oninput = function (e) {
    validateInput(cvvRegEx, e.target);
  }

  $cardHolder.oninput = function (e) {
    validateInput(nameRegEx, e.target);
  }

  $form.onsubmit = function (e) {
    e.preventDefault();
    const isCardNumValid = visaRegEx.test($cardNum.value);
    const isCardCvvValid = cvvRegEx.test($cardCvv.value);
    const isCardHolderValid = nameRegEx.test($cardHolder.value);
    if (isCardNumValid && $cardExpiry.value && isCardCvvValid && isCardHolderValid) {
      alert("Payment Done");
    } else {
      isValidExpiry($cardExpiry);
      validateInput(visaRegEx, $cardNum);
      validateInput(cvvRegEx, $cardCvv);
      validateInput(nameRegEx, $cardHolder);
    }
  }
  
  function isValidExpiry($inputRef) {
    if ($inputRef.value) {
      showValidityStatus(true, $inputRef);
    } else {
      showValidityStatus(false, $inputRef);
    }
  }

  function validateInput(regEx, $inputRef) {
    const { value } = $inputRef;
    showValidityStatus(regEx.test(value), $inputRef);
  }
  
  function showValidityStatus(isValid, $inputRef) {
    const $icon = document.createElement('i');
    if ($inputRef.nextElementSibling) {
      $inputRef.nextElementSibling.remove();
    }
    if (isValid) {
      $icon.className = "fa-solid fa-check text-green-400";
      $inputRef.style.border = '2px solid lime';
    } else {
      $icon.className = "fa-solid fa-times text-red-600";
      $inputRef.style.border = '2px solid red';
    }
    $inputRef.insertAdjacentElement('afterend', $icon);
  }
})();