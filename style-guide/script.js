(function () {
  const $colorPalettes = document.querySelectorAll('[data-color]');

  $colorPalettes.forEach($colorPalette => {
    $colorPalette.onclick = function (e) {
      const color = this.textContent;
      navigator.clipboard.writeText(color);
      this.textContent = "Copied";
      setTimeout(() => {
        this.textContent = color;
      }, 3000);
    }
  });
})();