(function () {
  const $form = document.getElementById('form');
  const $mdEditor = document.getElementById('markdown');
  const $newColCTA = document.getElementById('new-column-cta');
  const $newColBtn = document.getElementById('new-column');
  const $addBtn = document.getElementById('add');
  const $submitBtn = document.getElementById('save');
  const $cancelBtn = document.getElementById('cancel');
  const $cardDeck = document.getElementById('card-deck');
  $mdEditor.value = `# Add Main Title Here\n## Add Sub-topic here\nThis is for adding paragraphs. Use this format to add content. In short use markdown.`
  let formatted = '<div class="bg-[#5497C5] flex justify-between items-center px-4 py-2 border-b-4 border-gray-100"><h2 class="text-base text-white font-bold uppercase">Add Main Title Here</h2><i class="fa-solid fa-ellipsis" aria-hidden="true"></i></div><article class="text-sm px-4 py-2"><h3 class="text-base font-semibold leading-tight">Add Sub - topic here</h3><p>This is for adding paragraphs. Use this format to add content. In short use markdown.</p></article>';

  $mdEditor.oninput = (e) => handleChange(e);

  $form.onsubmit = (e) => e.preventDefault();

  $submitBtn.onclick = (e) => {
    e.preventDefault();
    addCard(formatted);
    $form.style.display = 'none';
  };

  $addBtn.onclick = () => {
    $form.style.display = "flex";
  };

  $newColBtn.onclick = () => {
    $form.style.display = "flex";
  };

  $cancelBtn.onclick = () => {
    $form.style.display = "none";
    formatted = '<div class="bg-[#5497C5] flex justify-between items-center px-4 py-2 border-b-4 border-gray-100"><h2 class="text-base text-white font-bold uppercase">Add Main Title Here</h2><i class="fa-solid fa-ellipsis" aria-hidden="true"></i></div><article class="text-sm px-4 py-2"><h3 class="text-base font-semibold leading-tight">Add Sub - topic here</h3><p>This is for adding paragraphs. Use this format to add content. In short use markdown.</p></article>';
  };

  function handleChange(event) {
    const sentences = event.target.value.split('\n');
    formatted = sentences.map(sentence => {
      if (sentence.startsWith('#')) {
        return addHeading(sentence);
      }
      return '<p>' + sentence + '</p>'
    }).join('');
  }

  function addHeading(string) {
    switch (string.match(/#/g).length) {
      case 1:
        return '<div class="bg-[#5497C5] flex justify-between items-center px-4 py-2 border-b-4 border-gray-100"><h2 class="text-base text-white font-bold uppercase">' + string.replace(/#+ /g, '') + '</h2><i class="fa-solid fa-ellipsis" aria-hidden="true"></i></div >\n';

      case 2:
        return '\n<h3 class="text-base font-semibold leading-tight">' + string.replace(/#+ /g, '') + '</h3>';

      case 3:
        return '<h4>' + string.replace(/#+ /g, '') + '</h4>';

      case 4:
        return '<h5>' + string.replace(/#+ /g, '') + '</h5>';

      default:
        return '<h6>' + string.replace(/#+ /g, '') + '</h6>';
    }
  }

  function addCard($content) {
    const $card = document.createElement('div');
    $card.className = "bg-white rounded-md overflow-hidden shadow-md shadow-black/20 pb-4";
    $content = $content.split('\n\n')[0] + $content.split('\n\n').slice(1).map(item => '<article class="text-sm px-4 py-2">' + item + '</article>').join('');
    $card.innerHTML = $content;
    $newColCTA.insertAdjacentElement('beforebegin', $card);
  }
})();