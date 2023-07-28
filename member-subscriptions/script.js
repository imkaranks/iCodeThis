(function () {
  const $prevBtn = document.getElementById('prev-slide');
  const $nextBtn = document.getElementById('next-slide');
  const $scroller = document.getElementById('slider');

  $prevBtn.onclick = function () {
    $scroller.scrollLeft -= $scroller.clientWidth;
  }

  $nextBtn.onclick = function () {
    $scroller.scrollLeft += $scroller.clientWidth;
  }
})();