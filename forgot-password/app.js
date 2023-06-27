(function () {
  const $signInLink = document.querySelector('[data-controls="sign-in-content"]');
  const $signUpLink = document.querySelector('[data-controls="sign-up-content"]');
  const $resetPassLink = document.querySelector('[data-controls="reset-pass-content"]');
  const $resetPassContent = document.getElementById('reset-pass-content');
  const $signInContent = document.getElementById('sign-in-content');
  const $signUpContent = document.getElementById('sign-up-content');
  const $reqLinkBtn = document.getElementById('req-reset-link');
  const $signInBtn = document.getElementById('sign-in-cta');
  const $signUpBtn = document.getElementById('sign-up-cta');

  function jumpTo($container, $content) {
    if ($container.classList.contains('slide-in')) {
      $container.classList.remove('slide-in');
    }
    $container.classList.add('slide-out');
    setTimeout(() => {
      $container.setAttribute('hidden', true);
      $content.removeAttribute('hidden');
      if ($content.classList.contains('slide-out')) {
        $content.classList.remove('slide-out');
      }
      $content.classList.add('slide-in');
    }, 300);
  }

  function validateEmail($input) {
    const isEmailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test($input.value);
    showIsValid($input, isEmailValid);
    return isEmailValid;
  }

  function validatePasswd($input) {
    const isPasswdValid = /^[A-Za-z]\w{7,14}$/.test($input.value);
    showIsValid($input, isPasswdValid);
    return isPasswdValid;
  }

  function showIsValid($input, isValid) {
    if (isValid) {
      $input.classList.add('outline', 'outline-green-500');
      setTimeout(() => {
        $input.classList.remove('outline', 'outline-green-500');
      }, 3000);
    } else {
      $input.classList.add('outline', 'outline-red-600');
      setTimeout(() => {
        $input.classList.remove('outline', 'outline-red-600');
      }, 3000);
    }
  }

  function validateForm(e, successMsg) {
    e.preventDefault();
    const $parent = e.currentTarget.parentNode;
    const $emailRef = $parent.querySelector('input[type="email"]');
    const $passwdRef = $parent.querySelector('input[type="password"]');
    const validEmail = validateEmail($emailRef);
    const validPasswd = validatePasswd($passwdRef);
    if (validEmail && validPasswd) {
      $emailRef.value = '';
      $passwdRef.value = '';
      alert(successMsg);
    }
  }

  $signInLink.onclick = () => jumpTo($resetPassContent, $signInContent);

  $signUpLink.onclick = () => jumpTo($resetPassContent, $signUpContent);

  $resetPassLink.onclick = () => jumpTo($signInContent, $resetPassContent);

  $reqLinkBtn.onclick = function (e) {
    e.preventDefault();
    const $parent = e.currentTarget.parentNode;
    const $emailRef = $parent.querySelector('input[type="email"]');
    const validEmail = validateEmail($emailRef)
    if (validEmail) {
      $emailRef.value = '';
      alert('Reset Link sent to your email');
    }
  }

  $signInBtn.onclick = (e) => validateForm(e, 'Signed in Successfully!');

  $signUpBtn.onclick = (e) => validateForm(e, 'Signed up Successfully!');
})();