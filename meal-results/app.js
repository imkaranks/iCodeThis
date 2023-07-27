const $dropdown = document.querySelector('[ data-dropdown]');
const $dropdownList = document.querySelector('[ data-dropdown-list]');
const $bookmarkBtns = document.querySelectorAll('.bookmark__btn');
const $removeFilterBtns = document.querySelectorAll('.fa-circle-xmark');
const $radioBtns = document.querySelectorAll('input[type="radio"]');
const $filterContent = document.querySelector('.filter');
const $filterCount = document.querySelector('.filter__count');
const $filterOptions = document.querySelectorAll('.filter__option');
let prevRadio = 0;

$dropdown.onclick = function () {
  if ($dropdownList.classList.contains('grid-rows-[0fr]')) {
    $dropdownList.classList.replace('grid-rows-[0fr]', 'grid-rows-[1fr]');
  } else {
    $dropdownList.classList.replace('grid-rows-[1fr]', 'grid-rows-[0fr]');
  }
}

$bookmarkBtns.forEach($bookmarkBtn => {
  $bookmarkBtn.onclick = function (e) {
    const $icon = e.currentTarget.querySelector('i');
    if ($icon.classList.contains('fa-regular')) {
      $icon.classList.replace('fa-regular', 'fa-solid');
    } else {
      $icon.classList.replace('fa-solid', 'fa-regular');
    }
  }
});

$removeFilterBtns.forEach($removeFilterBtn => $removeFilterBtn.onclick = removeFilter);

$radioBtns.forEach(($radioBtn, index) => {
  $radioBtn.onclick = function (e) {
    const $target = e.currentTarget;
    if ($target.parentNode.classList.contains('bg-blue-500')) return;
    document.querySelector('#recipes').classList.toggle('sm:grid-cols-2');
    $radioBtns[prevRadio].parentElement.classList.remove('bg-blue-500');
    prevRadio = index;
    if ($target.checked) {
      $target.parentNode.classList.add('bg-blue-500');
    }
  }
});

$filterOptions.forEach($filterOption => $filterOption.onclick = addFilter);

function removeFilter() {
  this.parentElement.remove();
  $filterCount.textContent = (+$filterCount.textContent)-1;
}

function addFilter(e) {
  const $filter = document.createElement('div');
  const $text = document.createElement('span');
  const $close = document.createElement('i');
  $filter.className = "flex items-center text-white gap-1 bg-blue-500 w-fit px-3 py-1 border border-blue-500 rounded";
  $text.textContent = e.currentTarget.textContent;
  $close.className = "cursor-pointer fa-regular fa-circle-xmark";
  $close.onclick = removeFilter;
  $filter.appendChild($text);
  $filter.appendChild($close);
  $filterContent.append($filter);
  $filterCount.textContent = (+$filterCount.textContent)+1;
}