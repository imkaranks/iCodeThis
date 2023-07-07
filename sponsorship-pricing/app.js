const $cards = document.querySelectorAll('.card');
let bounds = [null, null, null];

function rotateToMouse(e, index) {
  const mouseX = e.clientX;
  const mouseY = e.clientY;
  const leftX = mouseX - bounds[index].x;
  const topY = mouseY - bounds[index].y;
  const center = {
    x: leftX - bounds[index].width / 2,
    y: topY - bounds[index].height / 2
  }
  const distance = Math.sqrt(center.x**2 + center.y**2);
  
  $cards[index].style.transform = `
    scale3d(1.07, 1.07, 1.07)
    rotate3d(
      ${center.y / 100},
      ${-center.x / 100},
      0,
      ${Math.log(distance)* 2}deg
    )
  `;
  
  $cards[index].querySelector('.glow').style.backgroundImage = `
    radial-gradient(
      circle at
      ${center.x * 2 + bounds[index].width/2}px
      ${center.y * 2 + bounds[index].height/2}px,
      rgb(0 0 0 / .1),
      transparent
    )
  `;
}
$cards.forEach(($card, index) => {
  $card.addEventListener('mouseenter', () => {
    bounds[index] = $card.getBoundingClientRect();
    document.onmousemove = (e) => rotateToMouse(e, index);
  });
  
  $card.addEventListener('mouseleave', () => {
    document.onmousemove = null;
    $card.style.transform = '';
    $card.style.background = '';
    $card.querySelector('.glow').style.backgroundImage = '';
  });
});