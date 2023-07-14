(function () {
  const $sliderImages = document.querySelectorAll('[data-slider-image]');
  const $sliderBtns = document.querySelectorAll('[data-slider-btn]>button');
  const $galleryImages = document.querySelectorAll('[data-gallery-image]');
  const $menuBtn = document.querySelector('#menu_btn');
  const $primaryNav = document.querySelector('#primary_navigation');
  let currSlide = 0;
  let timer;

  changeSlidesAuto();

  $galleryImages.forEach($galleryImage => {
    $galleryImage.onload = function (e) {
      const $parent = e.currentTarget.parentNode;
      e.currentTarget.classList.remove('opacity-0');
      $parent.classList.remove('animate-pulse');
    };
  });

  $sliderBtns.forEach(($sliderBtn, index) => {
    $sliderBtn.onclick = function () {
      changeSlide(index);
      changeSlidesAuto();
    }
  })

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
    if (currSlide < $sliderImages.length - 1) {
      currSlide = specificIndex ?? currSlide + 1;
    } else {
      currSlide = 0;
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
      console.log('slide changed');
      changeSlide();
    }, 3000);
  }
})();