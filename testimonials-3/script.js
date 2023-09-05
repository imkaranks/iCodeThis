'use strict';

(function () {
  const $slideList = document.querySelector('[data-slide-list]');
  const $slides = document.querySelectorAll('[data-slide-item]');
  const $slidesNav = document.querySelector('[data-slide-nav]');
  const $slidesNavBtns = document.querySelectorAll('[data-slide-nav-ctrl]');
  let curr = 0;
  let timer = null;

  autoSlide();

  document.onclick = function (e) {
    clearInterval(timer);
    if (e.target.closest('[data-next-slide]')) {
      nextSlide();
    } else if (e.target.closest('[data-prev-slide]')) {
      prevSlide();
    } else if (e.target.closest('[data-slide-nav-ctrl]')) {
      const $slidesNavBtn = e.target.closest('[data-slide-nav-ctrl]');
      const slideIndex = $slidesNavBtn.dataset.slideIndex;
      updateSlide(+slideIndex);
    }
    autoSlide();
  }

  function nextSlide() {
    updateSlide(curr < $slides.length-1 ? curr + 1 : 0);
  }

  function prevSlide() {
    updateSlide(curr !== 0 ? curr - 1 : $slides.length-1);
  }

  function updateSlide(slideIndex) {
    $slidesNavBtns[curr].classList.replace('bg-black', 'bg-black/20');
    curr = slideIndex;
    $slideList.style.transform = `translateX(${curr > 0 ? `-${curr}00%` : '0%'})`;
    $slidesNavBtns[curr].classList.replace('bg-black/20', 'bg-black');
  }

  function autoSlide() {
    timer = setInterval(nextSlide, 4000);
  }
})();