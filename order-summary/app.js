(function () {
  const $closeBtns = document.querySelectorAll('[data-item="close"]');
  const $minusBtns = document.querySelectorAll('[data-item="minus"]');
  const $plusBtns = document.querySelectorAll('[data-item="plus"]');
  const $subTotal = document.getElementById('subtotal');
  const $shipping = document.getElementById('shipping');
  const $total = document.getElementById('total');
  const $beverageOptions = document.getElementById('beverage');
  const $checkout = document.getElementById('checkout');

  $plusBtns.forEach($plusBtn => {
    $plusBtn.onclick = (e) => increment(e);
  });

  $minusBtns.forEach($minusBtn => {
    $minusBtn.onclick = (e) => decrement(e);
  });

  $closeBtns.forEach($closeBtn => {
    $closeBtn.onclick = (e) => removeOrder(e);
  });

  $checkout.onclick = function (e) {
    if ($subTotal.textContent === '0') {
      alert('Your have no orders!');
      return;
    }
    const $mainContent = document.querySelector('main');
    const $orderContent = document.getElementById('order-content');
    const $alert = document.getElementById('alert');
    $mainContent.classList.add('shrink-in');
    e.currentTarget.remove();
    setTimeout(() => {
      $mainContent.classList.replace('shrink-in', 'shrink-out');
      $orderContent.style.display = 'none';
      $alert.style.display = 'flex';
    }, 300);
  }

  function removeOrder(e) {
    const $parent = e.currentTarget.parentNode;
    $parent.remove();
    updateBill();
  }

  $beverageOptions.oninput = function (e) {
    const $target = e.target;
    const { value } = $target;
    if (value === 'default') return;
    const $existingDrink = document.getElementById('drink');
    if ($existingDrink) {
      $existingDrink.remove();
    }
    const $beverage = document.createElement('div');
    const $close = document.createElement('button');
    $close.className = "inline-flex justify-center items-center w-5 h-5 bg-gray-200 rounded-full";
    $close.onclick = function (e) {
      $target.value = 'default';
      removeOrder(e);
    };
    const $minusBtn = document.createElement('button');
    $minusBtn.className = "text-base";
    $minusBtn.setAttribute('aria-controls', 'counter-3');
    $minusBtn.setAttribute('data-item', 'minus');
    $minusBtn.innerHTML = '<span>&minus;</span>';
    $minusBtn.onclick = function (e) {
      console.log('test');
      decrement(e);
    };
    const $plusBtn = document.createElement('button');
    $plusBtn.className = "text-base";
    $plusBtn.setAttribute('aria-controls', 'counter-3');
    $plusBtn.setAttribute('data-item', 'plus');
    $plusBtn.innerHTML = '<span>&plus;</span>';
    $plusBtn.onclick = function (e) {
      console.log('test');
      increment(e);
    };
    const $btnWrapper = document.createElement('div');
    $btnWrapper.className = "flex items-center";
    $btnWrapper.appendChild($minusBtn);
    $btnWrapper.innerHTML += '<span class="font-medium px-4" id="counter-3">1</span>';
    $btnWrapper.appendChild($plusBtn);
    $beverage.className = "flex items-center gap-4 mb-3";
    $beverage.id = "drink";
    $close.innerHTML = '<span>&times;</span>';
    $beverage.innerHTML = `<p class="flex-1">${value}</p>`;
    $beverage.appendChild($btnWrapper);
    $beverage.innerHTML += '<span class="font-medium" data-item="price" data-initialPrice="3.99">$3,99</span>';
    $beverage.appendChild($close);
    $beverageOptions.insertAdjacentElement('beforeBegin', $beverage);
    updateBill();
  }

  function updateBill() {
    const $prices = document.querySelectorAll('[data-item="price"]');
    let subTotalCharge = 0;
    $prices.forEach($price => {
      subTotalCharge += parseFloat($price.innerText.replace('$', '').replace(',', '.'));
    });
    const shippingCharge = parseFloat($shipping.innerText.replace('$', ''));
    const totalCharge = subTotalCharge + shippingCharge;
    if (subTotalCharge !== 0) {
      $subTotal.textContent = `${subTotalCharge}`.replace('.', ',');
      $total.textContent = `${totalCharge}`.replace('.', ',');
    } else {
      $subTotal.textContent = '0';
      $shipping.textContent = '0';
      $total.textContent = '0';
    }
  }

  function decrement(e) {
    const $target = e.currentTarget;
    const $counter = document.getElementById($target.getAttribute('aria-controls'));
    let count = parseInt($counter.innerText);
    if (count > 1) {
      $counter.textContent = `${--count}`;
      const $price = $target.parentNode.nextElementSibling;
      const price = parseFloat($price.innerText.replace('$', '').replace(',', '.'));
      const priceAmt = price - parseFloat($price.getAttribute('data-initialPrice'));
      $price.textContent = `$${priceAmt.toFixed(2)}`.replace('.', ',');
      updateBill();
    }
  }

  function increment(e) {
    const $target = e.currentTarget;
    const $counter = document.getElementById($target.getAttribute('aria-controls'));
    let count = parseInt($counter.innerText);
    $counter.textContent = `${++count}`;
    const $price = $target.parentNode.nextElementSibling;
    const price = parseFloat($price.innerText.replace('$', '').replace(',', '.'));
    const priceAmt = price + parseFloat($price.getAttribute('data-initialPrice'));
    $price.textContent = `$${priceAmt.toFixed(2)}`.replace('.', ',');
    updateBill();
  }
})();