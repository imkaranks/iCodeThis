(function () {
  const $main = document.getElementById('main-content');
  const $profileImgs = document.querySelectorAll('.profile-img');
  const $profileName = document.getElementById('profile-name');
  const $profileDesc = document.getElementById('profile-desc');
  const $form = document.getElementById('form');
  const $updateBtn = document.getElementById('update');
  const $saveBtn = document.getElementById('save');
  const $editBtn = document.getElementById('edit-pic');
  const $imgDialog = document.getElementById('img-dialog');
  const $closeBtns = document.querySelectorAll('.close-btn');
  const $changePicBtn = document.getElementById('change-pic');
  const $username = document.getElementById('username');
  const $desc = document.getElementById('desc');
  let user = {
    name: "Mfwooddesign",
    desc: "Hand painted unique decorations for your home. Send us your ideas and we'll bring them to life."
  }

  $updateBtn.onclick = function () {
    if ($main.classList.contains('slide-in')) {
      $main.classList.remove('slide-in');
    }
    $main.classList.add('slide-out');
    $username.value = user.name;
    $desc.value = user.desc;
    setTimeout(() => {
      if ($form.classList.contains('slide-out')) {
        $form.classList.remove('slide-out');
      }
      $form.removeAttribute('hidden');
      $form.classList.add('slide-in');
      $main.setAttribute('hidden', true);
    }, 300);
  }

  $saveBtn.onclick = function (event) {
    event.preventDefault();
    user = {
      ...user,
      name: $username.value,
      desc: $desc.value
    }
    $profileName.textContent = $username.value;
    $profileDesc.textContent = $desc.value;
    $form.classList.remove('slide-in');
    $form.classList.add('slide-out');
    setTimeout(() => {
      $main.removeAttribute('hidden');
      $form.setAttribute('hidden', true);
      $main.classList.remove('slide-out');
      $main.classList.add('slide-in');
    }, 300);
  }

  $editBtn.onclick = function (event) {
    event.preventDefault();
    $imgDialog.classList.remove('scale-in');
    $imgDialog.classList.add('scale-out');
    setTimeout(() => {
      $imgDialog.removeAttribute('hidden');
    }, 300);
  }

  $closeBtns.forEach($closeBtn => {
    $closeBtn.onclick = function (event) {
      closeDialog(event);
    }
  });

  $changePicBtn.onclick = function (event) {
    const { value } = document.getElementById('img');
    $profileImgs.forEach($profileImg => {
      $profileImg.src = value;
    });
    closeDialog(event);
  }

  function closeDialog(event) {
    const $parent = event.currentTarget.parentNode;
    $parent.classList.remove('scale-out');
    $parent.classList.add('scale-in');
    setTimeout(() => {
      $parent.setAttribute('hidden', true);
    }, 300);
  }
})();