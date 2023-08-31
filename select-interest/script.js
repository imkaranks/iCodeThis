(function () {
  const $interestContent = document.getElementById('interest-content');
  const $form = document.querySelector('form');
  const interests = [
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
      name: 'Food&Drink',
      pic: 'https://images.unsplash.com/photo-1532634922-8fe0b757fb13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Zm9vZCUyMGFuZCUyMGRyaW5rfGVufDB8fDB8fHww&auto=format&fit=crop&w=700&q=60'
    },
    {
      name: 'Hair&Beauty',
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
    },
  ];

  $form.onsubmit = function (e) {
    e.preventDefault();
  }

  document.onclick = function (e) {
    if (e.target.closest('input[type="checkbox"]')) {
      const $checkbox = e.target.closest('input[type="checkbox"]');
      const $checkIcon = $checkbox.parentNode.querySelector('[data-check-icon]');
      if ($checkbox.checked) {
        $checkIcon.removeAttribute('hidden');
      } else {
        $checkIcon.setAttribute('hidden', true);
      }
    }
  }

  function renderInterests() {
    let clutter = '';
    interests.forEach(interest => {
      clutter += `
        <label class="relative inline-block flex-shrink-0 flex-grow-0 w-28 cursor-pointer">
          <input class="appearence-none peer absolute inset-0 opacity-0" type="checkbox" name="interests" />
          <img src="${interest.pic}" class="aspect-square w-full rounded-full object-cover shadow-[0_8px_30px_rgb(0,0,0,0.12)]" alt="${interest.name}" />
          <div class="ease absolute left-0 top-0 aspect-square w-full rounded-full bg-black/40 opacity-0 transition-all duration-300 peer-hover:opacity-100 peer-checked:opacity-100"></div>
          <img src="https://i.ibb.co/HhdMZqS/checked.png" class="ease absolute left-0 top-0 aspect-square w-full object-cover opacity-0 transition-all duration-300 peer-checked:opacity-100" data-check-icon hidden alt="check-icon" />
          <p class="mt-2 text-center font-semibold uppercase">${interest.name}</p>
        </label>
      `;
    });
    $interestContent.innerHTML = clutter;
  }
  renderInterests();
})();