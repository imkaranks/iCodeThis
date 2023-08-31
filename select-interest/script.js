(function () {
  const $optionContent = document.getElementById('option-content');
  const $pickedInterests = document.getElementById('picked-interests');
  const $customizePage = document.getElementById('customize-page');
  const $form = document.querySelector('form');
  const $navListItems = document.querySelectorAll('.nav-list-item');
  const options = [
    {
      name: 'Fitness',
      pic: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Zml0bmVzc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=700&q=60'
    },
    {
      name: 'Design',
      pic: 'https://images.unsplash.com/photo-1558655146-d09347e92766?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGVzaWdufGVufDB8fDB8fHww&auto=format&fit=crop&w=700&q=60'
    },
    {
      name: 'Education',
      pic: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWR1Y2F0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=700&q=60'
    },
    {
      name: 'DIY Crafts',
      pic: 'https://images.unsplash.com/photo-1607346704652-de050550a758?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGl5JTIwY3JhZnRzfGVufDB8fDB8fHww&auto=format&fit=crop&w=700&q=60'
    },
    {
      name: 'Home',
      pic: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9tZSUyMGRlc2lnbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=700&q=60'
    },
    {
      name: 'Food & Drink',
      pic: 'https://images.unsplash.com/photo-1532634922-8fe0b757fb13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Zm9vZCUyMGFuZCUyMGRyaW5rfGVufDB8fDB8fHww&auto=format&fit=crop&w=700&q=60'
    },
    {
      name: 'Hair & Beauty',
      pic: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGFpciUyMGFuZCUyMGJlYXV0eXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=700&q=60'
    },
    {
      name: 'Gardening',
      pic: 'https://images.unsplash.com/photo-1438109382753-8368e7e1e7cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Z2FyZGVuaW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=700&q=60'
    },
    {
      name: 'Cars',
      pic: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2Fyc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=700&q=60'
    },
    {
      name: 'Travels',
      pic: 'https://images.unsplash.com/photo-1504150558240-0b4fd8946624?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dHJhdmVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=700&q=60'
    }
  ];
  let interests = {};

  $form.onsubmit = function (e) {
    e.preventDefault();
  }

  document.onclick = function (e) {
    if (e.target.closest('input[type="checkbox"]')) {
      const $checkbox = e.target.closest('input[type="checkbox"]');
      const $checkIcon = $checkbox.parentNode.querySelector('[data-check-icon]');
      if ($checkbox.checked) {
        $checkIcon.removeAttribute('hidden');
        interests[$checkbox.name] = $checkbox.checked;
      } else {
        $checkIcon.setAttribute('hidden', true);
        delete interests[$checkbox.name];
      }
    } else if (e.target.closest('#submit-choices')) {
      if (Object.keys(interests).length === 0) {
        alert('Pick Atleast One Interest');
        return;
      }
      $form.setAttribute('hidden', true);
      $customizePage.removeAttribute('hidden');
      $navListItems[1].setAttribute('data-completed', true);
      $navListItems[2].classList.remove('text-gray-300');
      $navListItems[2].firstElementChild.classList.replace('bg-[#6456d4]', 'bg-[#ffe98a]');
      $navListItems[2].firstElementChild.classList.add('text-[#60719a]');
      $navListItems[2].lastElementChild.classList.add('text-white');
      renderPickedInterests();
    } else if (e.target.closest('#change-interests')) {
      $customizePage.setAttribute('hidden', true);
      $form.removeAttribute('hidden');
      $navListItems[1].removeAttribute('data-completed');
      $navListItems[2].classList.add('text-gray-300');
      $navListItems[2].firstElementChild.classList.replace('bg-[#ffe98a]', 'bg-[#6456d4]');
      $navListItems[2].firstElementChild.classList.remove('text-[#60719a]');
      $navListItems[2].lastElementChild.classList.remove('text-white');
      renderOptions();
    }
  }

  function hyphenate(str) {
    return str.toLowerCase().replace(' ', '-')
  }

  function renderOptions() {
    let clutter = '';
    options.forEach(option => {
      const isChecked = hyphenate(option.name) in interests;
      clutter += `
        <label class="relative inline-block flex-shrink-0 flex-grow-0 w-20 sm:w-24 md:w-28 cursor-pointer">
          <input ${isChecked ? 'checked="true"' : ''} class="appearance-none peer absolute z-10 inset-0 opacity-0" type="checkbox" name="${hyphenate(option.name)}" />
          <img src="${option.pic}" class="aspect-square w-full rounded-full object-cover object-center shadow-[0_8px_30px_rgb(0,0,0,0.12)]" alt="${option.name}" />
          <div class="ease absolute left-0 top-0 aspect-square w-full rounded-full bg-black/40 opacity-0 transition-all duration-300 peer-hover:opacity-100 peer-checked:opacity-100"></div>
          <img src="https://i.ibb.co/HhdMZqS/checked.png" class="ease absolute left-0 top-0 aspect-square w-full object-cover opacity-0 transition-all duration-300 peer-checked:opacity-100" data-check-icon ${!isChecked ? 'hidden' : ''} alt="check-icon" />
          <p class="mt-3 text-sm sm:text-base text-center font-semibold uppercase leading-none">${option.name}</p>
        </label>
      `;
    });
    $optionContent.innerHTML = clutter;
  }
  renderOptions();

  function renderPickedInterests() {
    let clutter = '';
    options.forEach(option => {
      const key = hyphenate(option.name);
      if (key in interests) {
        clutter += `
          <div class="flex-shrink-0 flex-grow-0 w-20 sm:w-24 md:w-28">
            <img src="${option.pic}" class="aspect-square w-full rounded-full object-cover object-center shadow-[0_8px_30px_rgb(0,0,0,0.12)]" alt="${option.name}" />
            <p class="mt-3 text-sm sm:text-base text-center font-semibold uppercase leading-none">${option.name}</p>
          </div>
        `;
      }
    });
    $pickedInterests.innerHTML = clutter;
  }
})();