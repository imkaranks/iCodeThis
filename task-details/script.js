'use strict';

(function () {
  const $form = document.getElementById('form');
  const $progressBar = document.getElementById('progress-bar');
  const $progressInput = document.getElementById('progress');
  const $attachmentInput = document.getElementById('attachment');

  setTimeout(() =>
    updateProgress($progressInput.value)
  , 0);

  $progressInput.oninput = function (e) {
    const val = e.target.value;
    if (val > 100 || val < 0) {
      alert('Value must be between 0 and 100');
      e.target.value = val.slice(0, val.length-1);
      return;
    }
    updateProgress(val);
  }

  function updateProgress(val) {
    $progressBar.setAttribute('style', `--percentage: ${val}%`);
  }

  $form.onsubmit = function (e) {
    e.preventDefault();
  }

  $attachmentInput.oninput = function (e) {
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (!file.type.startsWith("image/")) {
        continue;
      }

      const img = document.createElement("img");
      img.className = 'w-16 aspect-square object-cover';
      img.file = file;
      e.target.insertAdjacentElement('beforebegin', img)

      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
})();