(function () {
  const $sliderImages = document.querySelectorAll('[data-slider-image]');
  const $sliderBtns = document.querySelectorAll('[data-slider-btn]>button');
  const $galleryImages = document.querySelectorAll('[data-gallery-image]');
  const $menuBtn = document.querySelector('#menu_btn');
  const $scroller = document.querySelector('#scroller');
  const $imageView = document.querySelector('#image_view');
  const $imageViewClose = document.querySelector('#image_view_close');
  const $imageViewImg = document.querySelector('#image_view_img');
  const $prevBtn = document.querySelector('#prev_btn');
  const $nextBtn = document.querySelector('#next_btn');
  const $galleryPrevBtn = document.querySelector('#image_prev_btn');
  const $galleryNextBtn = document.querySelector('#image_next_btn');
  const $primaryNav = document.querySelector('#primary_navigation');
  let currSlide = 0;
  let currImage = 0;
  let currViewedImg = null;
  let timer;

  changeSlidesAuto();

  $galleryImages.forEach(($galleryImage, index) => {
    $galleryImage.onclick = function () {
      currViewedImg = index;
      $imageView.classList.remove('hidden');
      $imageViewImg.src = $galleryImage.src;
    }
    $galleryImage.onload = function (e) {
      const $parent = e.currentTarget.parentNode;
      e.currentTarget.classList.remove('opacity-0');
      $parent.classList.remove('animate-pulse');
    };
  });

  $imageViewClose.onclick = function () {
    $imageView.classList.add('hidden');
  }

  $sliderBtns.forEach(($sliderBtn, index) => {
    $sliderBtn.onclick = function () {
      changeSlide(index);
      changeSlidesAuto();
    }
  });

  $prevBtn.onclick = function () {
    currImage = loopedDecrement(currImage, $galleryImages.length);
    $scroller.scrollLeft -= 212;
  }

  $nextBtn.onclick = function () {
    currImage = loopedIncrement(currImage, $galleryImages.length);
    $scroller.scrollLeft += 212;
  }

  $galleryPrevBtn.onclick = function () {
    currViewedImg = loopedDecrement(currViewedImg, $galleryImages.length);
    $imageViewImg.src = $galleryImages[currViewedImg].src;
  }

  $galleryNextBtn.onclick = function () {
    currViewedImg = loopedIncrement(currViewedImg, $galleryImages.length);
    $imageViewImg.src = $galleryImages[currViewedImg].src;
  }

  $menuBtn.onclick = function (e) {
    console.log('toggle menu')
    const isExpanded = e.currentTarget.getAttribute('aria-expanded');
    if (isExpanded === 'true') {
      $primaryNav.classList.replace('grid-rows-[1fr]', 'grid-rows-[0fr]');
      e.currentTarget.setAttribute('aria-expanded', false);
    } else {
      $primaryNav.classList.replace('grid-rows-[0fr]', 'grid-rows-[1fr]');
      e.currentTarget.setAttribute('aria-expanded', true);
    }
  }

  function changeSlide(specificIndex = null) {
    $sliderImages[currSlide].classList.add('hidden');
    $sliderBtns[currSlide].classList.replace('bg-white', 'bg-white/50');
    if (specificIndex) {
      currSlide = specificIndex;
    } else {
      currSlide = loopedIncrement(currSlide, $sliderImages.length);
    }
    $sliderImages[currSlide].classList.replace('opacity-0', 'opacity-100');
    $sliderBtns[currSlide].classList.replace('bg-white/50', 'bg-white');
    $sliderImages[currSlide].classList.remove('hidden');
  }

  function changeSlidesAuto() {
    if (timer !== null) {
      clearInterval(timer);
    }
    timer = setInterval(() => {
      changeSlide();
    }, 3000);
  }

  function loopedIncrement(count, max) {
    if (count < max - 1) {
      count++;
    } else {
      count = 0;
    }
    return count;
  }

  function loopedDecrement(count, max) {
    if (count > 1) {
      count--;
    } else {
      count = max - 1;
    }
    return count;
  }
})();