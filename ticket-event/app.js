const slider = document.getElementById('slider');
const sliderPrev = document.getElementById('slider-prev');
const sliderNext = document.getElementById('slider-next');
const descCtrl = document.getElementById('desc-control');
let isDescExpanded = false;

descCtrl.onclick = function(e) {
  isDescExpanded = !isDescExpanded;
  const desc = document.getElementById(e.currentTarget.getAttribute('aria-controls'));
  const descText = 'Muse, the world renowned multi-platinum selling and multi-award winning band, embarked on their ambitious Drones World Tour in 2015-16, playing over 130 dates across the globe. Known for pushing boundaries in terms of their stage production the tour saw the band perform "in the round" from the middle of the arena, with the stage design and configuration giving fans a full 360 degree audio/visual sensory experience.';
  desc.textContent = isDescExpanded ? descText : `${descText.slice(0, 150)}...`;
}

sliderPrev.onclick = function () {
  slider.scrollLeft -= 180;
}

sliderNext.onclick = function () {
  slider.scrollLeft += 180;
}