(function () {
  const $targets = document.getElementById('targets');
  const $targetContent = document.getElementById('target-content');
  const $prevBtn = document.getElementById('go-back');
  const $addBtn = document.getElementById('add-new');
  const $form = document.querySelector('form');

  $form.onsubmit = function (e) {
    e.preventDefault();
    if (e.currentTarget.querySelector('input').value.trim()) {
      jumpTo('step-1', 'step-2');
    } else {
      alert('Enter valid password');
    }
  }

  $targets.onclick = function () {
    jumpTo('step-2', 'step-3');
  }

  $prevBtn.onclick = function () {
    jumpTo('step-3', 'step-2');
  }

  $addBtn.onclick = function () {
    const response = prompt("Enter your target");
    if (response === null) return;
    const elems = document.querySelectorAll('.target');
    const $target = document.createElement('div');
    $target.className = "target bg-white flex flex-row-reverse gap-2 items-center p-4 shadow-md rounded-md";
    $target.innerHTML = `
      <input class="peer/${elems.length+1}" type="checkbox" name="${elems.length+1}" id="${elems.length+1}">
      <label class="relative flex-1 font-bold peer-checked/${elems.length+1}:text-gray-300 before:content-[''] before:absolute before:top-1/2 before:left-0 before:right-0 before:h-[1px] before:bg-gray-400 before:-translate-y-1/2 before:hidden peer-checked/${elems.length+1}:before:block" for="${elems.length+1}">${response}</label>`;
    $targetContent.appendChild($target);
    updateCount(elems.length+1);
  }
  
  function jumpTo(id_1, id_2) {
    const $content1 = document.getElementById(id_1);
    const $content2 = document.getElementById(id_2);
    if ($content1.classList.contains('slide-in')) {
      $content1.classList.remove('slide-in');
    }
    $content1.classList.add('slide-out');
    setTimeout(() => {
      $content1.setAttribute('hidden', true);
      $content2.removeAttribute('hidden');
      if ($content2.classList.contains('slide-out')) {
        $content2.classList.remove('slide-out');
      }
      $content2.classList.add('slide-in');
    }, 300);
  }

  function updateCount(count, completed=null) {
    const $pie = document.querySelector('.pie');
    $pie.setAttribute('style', `--content: '${count}';--total: ${count};--completed: ${count-1}`);
  }
})();