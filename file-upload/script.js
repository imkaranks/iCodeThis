(function () {
  const $fileUploadInput = document.getElementById('file-upload');

  document.onclick = function (e) {
    if (e.target.closest('[data-delete-upload]')) {
      e.target.closest('[data-delete-upload]')
        .parentElement.remove();
    }
  }

  $fileUploadInput.onchange = handleUpload;

  function handleUpload() {
    const files = $fileUploadInput.files;
    if (files.length === 0) {
      alert('Please choose or drop any file(s)...');
      return;
    }
    uploadFiles(files);
  }

  function uploadFiles(files) {
    let clutter = '';
    const fileIds = [];

    for (let i = 0; i < files.length; i++) {
      const ext = files[i].name.split('.')[1];

      const $icon = ext === 'pdf'
      ? '<i class="fa-regular fa-file-pdf fa-2x"></i>'
      : (ext === 'jpg' || ext === 'jpeg' || ext === 'png')
      ? '<i class="fa-regular fa-file-image fa-2x"></i>'
      : '<i class="fa-regular fa-file fa-2x"></i>';

      const id = `item-${i+1}`;
      fileIds.push(id);

      clutter += `
        <div class="flex items-center gap-2" id='${id}'>
          <div class="w-8 text-[#636363]">${$icon}</div>
          <div class="flex-1">
            <p>${files[i].name}</p>
            <div class="progress-bar | relative h-5 border-2 border-sky-600 rounded"></div>
            <div class="flex gap-4 items-center justify-end">
              <button class="text-sm text-amber-500 underline" data-pause>Pause</button>
              <button class="text-sm text-amber-500 underline" data-share>Share link</button>
              <button class="text-sm text-amber-500 underline" data-view>View file</button>
            </div>
          </div>
          <button data-delete-upload>
            <span class="sr-only">Delete</span>
            <i class="fa-solid fa-trash-can" aria-hidden="true"></i>
          </button>
        </div>
      `;
    }

    document.getElementById('uploads')
      .innerHTML = clutter;
    startUploadingEffect(fileIds);
  }

  function startUploadingEffect(ids) {
    ids.forEach(id => {
      let i = 0;
      const $file = document.getElementById(id);
      const $progressBar = $file
        .querySelector('.progress-bar');
      $file.classList.add('uploading');
      const timer = setInterval(() => {
        if (i >= 100) {
          $progressBar.setAttribute(
            'style', '--progress: 100%'
          );
          $file.classList.remove('uploading');
          return clearInterval(timer);
        }
        $progressBar.setAttribute(
          'style', `--progress: ${i}%`
        );
        i += Math.floor(Math.random() * (10 - 1)) + 1;
      }, 100);
    });
  }

  function previewFile(file) {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = function() {
      let img = document.createElement('img')
      img.src = reader.result
      document.getElementById('gallery')
        .appendChild(img)
    }
  }  
})();