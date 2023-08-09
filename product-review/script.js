'use strict';

(function () {
  const $starRadios = document.querySelectorAll('input[name="rating"]');
  const $starIcons = document.querySelectorAll('.fa-star');
  const $submitBtn = document.querySelector('button[type="submit"]');

  $starRadios.forEach(($starRadio, index) => {
    $starRadio.onclick = () => updateRating(index);
  });

  $submitBtn.onclick = function (e) {
    e.preventDefault();
  }

  function updateRating(count) {
    $starIcons.forEach(($starIcon, index) => {
      if (index <= count) {
        $starIcon.classList.replace('fa-regular', 'fa-solid');
        $starIcon.classList.replace('text-gray-400', 'text-yellow-400');
      } else {
        if ($starIcon.classList.contains('fa-solid')) {
          $starIcon.classList.replace('fa-solid', 'fa-regular');
          $starIcon.classList.replace('text-yellow-400', 'text-gray-400');
        }
      }
    })
  }
})();