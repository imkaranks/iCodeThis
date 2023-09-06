(function () {
  const $meterWrapper = document.getElementById('meter-wrapper');

  $meterWrapper.appendChild(createMeter());
  $meterWrapper.appendChild(createMeter(20, true));
  function createMeter(initialVal=10, hasDelay=false) {
    const $meterBody = document.createElement('div');
    $meterBody.className = "text-sm sm:text-base border-2 border-dotted border-white w-4/5 max-w-[18rem] aspect-square rounded-full relative bg-neutral-900/30";
    let clutter = '';
    let labelCount = 0;
    for (let i = 0; i < 33; i++) {
      const isLabelled = i === 0 || i % 4 === 0 || i === 32;
      const hasDecoration = (i === 0 || i === 20 || i === 27) ? 'before:absolute before:content-[\'\'] before:-top-10 before:left-0 before:w-full before:h-8 before:bg-amber-500 before:scale-x-150' : '';
      clutter += `
        <div class="absolute inset-1 text-white flex flex-col rotate-[${-120+(i*7.5)}deg] gap-2 items-center">
          <span class="relative inline-block ${isLabelled ? 'h-4 bg-white' : 'h-2.5 bg-white/20'} w-0.5 ${hasDecoration}"></span>
          ${isLabelled ? `<span>${0 + ((labelCount++) * initialVal)}</span> ` : ''}
        </div>`;
    }
    $meterBody.innerHTML = clutter + `<div class="pointer absolute left-1/2 -translate-x-1/2 w-2 h-full animate-speedo transition-transform duration-300 ease -rotate-[120deg] bg-gradient-to-b from-amber-500 from-40% to-40%" ${hasDelay ? 'style="animation-delay: 500ms;"' : ''}></div>`;
    return $meterBody;
  }
}) ();