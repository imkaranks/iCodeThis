const dropdowns = document.querySelectorAll('[data-dropdown]');
const clearFilter = document.querySelector('#clear-filter');

dropdowns.forEach(dropdown => dropdown.addEventListener('click', toggleDropdown));

function toggleDropdown(e) {
  const target = e.currentTarget.nextElementSibling;
  if (target.classList.contains('grid-rows-[0fr]')) {
    target.classList.replace('grid-rows-[0fr]', 'grid-rows-[1fr]');
  } else {
    target.classList.replace('grid-rows-[1fr]', 'grid-rows-[0fr]');
  }
}

clearFilter.addEventListener('click', (e) => {
  const target = e.currentTarget.previousElementSibling;
  const checkboxes = target.querySelectorAll('input');
  checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
      checkbox.checked = false;
    }
  });
});