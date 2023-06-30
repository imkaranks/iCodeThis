(function () {
  const $form = document.getElementById('form');
  const $mdEditor = document.getElementById('markdown');
  const $newColCTA = document.getElementById('new-column-cta');
  const $newColBtn = document.getElementById('new-column');
  const $addBtn = document.getElementById('add');
  const $submitBtn = document.getElementById('save');
  const $cancelBtn = document.getElementById('cancel');
  let $editBtns = document.querySelectorAll('.edit-btn');

  let formatted = '';
  let $currentEdit = null;
  let isEditing = false;
  const colors = ['#5AB785', '#CF9224', '#B3B6C0', '#5297C4'];
  let colorIndex = 1;

  $mdEditor.oninput = (e) => handleChange(e);

  $form.onsubmit = (e) => e.preventDefault();

  $submitBtn.onclick = (e) => {
    e.preventDefault();
    if (!isEditing && $currentEdit === null) {
      addCard(formatted);
      colorIndex =
        colorIndex < colors.length - 1
          ? colorIndex + 1 : 0;
    } else {
      $currentEdit.innerHTML = formatted;
      $currentEdit = null;
      isEditing = false;
    }
    closeForm();
  };

  $addBtn.onclick = openForm;

  $newColBtn.onclick = openForm;

  $cancelBtn.onclick = closeForm;

  $editBtns.forEach($editBtn => {
    $editBtn.onclick = (e) => editCard(e);
  });

  function openForm() {
    formatted = `<div class="bg-[${getNewColor()}] flex justify-between items-center px-4 py-2 border-b-4 border-gray-100"><h2 class="text-base text-white font-bold uppercase">Add Main Title Here</h2><i class="fa-solid fa-ellipsis" aria-hidden="true"></i></div><article class="text-sm px-4 py-2"><h3 class="text-base font-semibold leading-tight mb-2">Add Sub - topic here</h3><p>This is for adding paragraphs. Use this format to add content. In short use markdown.</p></article>`;
    $mdEditor.value = '# Add Main Title Here\n## Add Sub-topic here\nThis is for adding paragraphs. Use this format to add content. In short use markdown.';
    $form.style.display = "flex";
  }

  function closeForm() {
    $form.style.display = "none";
    $mdEditor.value = '';
    formatted = '';
  }

  function editCard(event) {
    isEditing = true;
    $currentEdit = event.currentTarget.nextElementSibling;
    const subtitle = $currentEdit.querySelector('h3');
    const paras = $currentEdit.querySelectorAll('p');
    $mdEditor.value = `## ${subtitle.innerText}`;
    formatted = `<h3 class="text-base font-semibold leading-tight mb-2">${subtitle.innerText}</h3>`;
    paras.forEach((para) => {
      $mdEditor.value += `\n${para.innerText}`;
      formatted += `<p>${para.innerText}</p>`;
    });
    $form.style.display = "flex";
  }

  function handleChange(event) {
    const sentences = event.target.value.split('\n');
    formatted = sentences.map(sentence => {
      if (sentence.startsWith('#')) {
        if (sentence.trim() === '') return '';
        return addHeading(sentence);
      }
      return '<p>' + sentence + '</p>'
    }).join('\n');
  }

  function addHeading(string) {
    switch (string.match(/#/g).length) {
      case 1:
        return `<div class="bg-[${getNewColor()}] flex justify-between items-center px-4 py-2 border-b-4 border-gray-100"><h2 class="text-base text-white font-bold uppercase">` + string.replace(/#+ /g, '') + '</h2><i class="fa-solid fa-ellipsis" aria-hidden="true"></i></div >\n';

      case 2:
        return '\n<h3 class="text-base font-semibold leading-tight mb-2">' + string.replace(/#+ /g, '') + '</h3>';

      case 3:
        return '<h4>' + string.replace(/#+ /g, '') + '</h4>';

      case 4:
        return '<h5>' + string.replace(/#+ /g, '') + '</h5>';

      default:
        return '<h6>' + string.replace(/#+ /g, '') + '</h6>';
    }
  }

  const getNewColor = () => colors[colorIndex];

  function addCard($content) {
    const $card = document.createElement('div');
    $card.className = "bg-white rounded-md overflow-hidden shadow-md shadow-black/20 pb-4";
    $content = $content.split('\n\n')[0] + $content.split('\n\n').slice(1).map(item => '<article class="text-sm px-4 py-2">' + item + '</article>').join('');
    $card.innerHTML = $content;
    $newColCTA.insertAdjacentElement('beforebegin', $card);
  }
})();