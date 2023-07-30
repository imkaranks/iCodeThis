(function () {
  const $tagsInput = document.querySelector('input');
  const $tagsContent = document.querySelector('.tags__content');
  const $tagBtns = document.querySelectorAll('.tag__btn');

  $tagsInput.oninput = function (e) {
    $tagsContent.innerHTML = '';
    e.target.value.split(',').map(tag => {
      $tagsContent.appendChild(createTag(tag));
    });
  }

  $tagBtns.forEach($tagBtn => {
    $tagBtn.onclick = removeTag;
  });

  function removeTag() {
    this.parentElement.remove();
  }

  function createTag(text) {
    const $tag = document.createElement('div');
    $tag.className = "tag | flex gap-2 items-center cursor-pointer rounded-lg py-2 px-3 bg-[#232448] text-white";
    const $tagText = document.createElement('span');
    $tagText.className = "tag__text";
    $tagText.textContent = text;
    const $tagBtn = document.createElement('button');
    $tagBtn.className = "tag__btn";
    $tagBtn.innerHTML = '<span aria-hidden="true">&times;</span><span class="sr-only">Remove Tag</span>';
    $tagBtn.onclick = removeTag;
    $tag.appendChild($tagText);
    $tag.appendChild($tagBtn);
    return $tag;
  }
})();