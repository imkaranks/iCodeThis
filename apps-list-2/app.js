(function () {
  const $appsContent = document.getElementById('apps');
  const data = [
    {
      id: 1,
      imgURL: 'https://play-lh.googleusercontent.com/dCM0CyWMQ9wWUVYw-Xx0s4FlYtzS-PiAmo-mbEkpxTDYF-x8NitA8g89ebGiHMp0cPI=w240-h480-rw',
      title: '30 Day Fit Challenge Workout',
      developer: 'Northpark_Android',
      category: 'lifestyle',
      rating: 3
    },
    {
      id: 2,
      imgURL: 'https://www.apkmirror.com/wp-content/themes/APKMirror/ap_resize/ap_resize.php?src=https%3A%2F%2Fdownloadr2.apkmirror.com%2Fwp-content%2Fuploads%2F2016%2F07%2F577f51ec513bf.png&w=96&h=96&q=100',
      title: 'S health',
      developer: 'S HealthSamsung Electronics Co.',
      category: 'lifestyle',
      rating: 4
    },
    {
      id: 3,
      imgURL: 'https://img.captain-droid.com/wp-content/uploads/2016/07/crabwar-icon-124x124.png.webp',
      title: 'Crab Wars',
      developer: 'Appxplore Sdn Bird',
      category: 'games',
      rating: 5
    },
    {
      id: 4,
      imgURL: 'https://top-androids.com/uploads/posts/2018-02/1519806645_298.png',
      title: 'Sandstorm: Pirate Wars',
      developer: 'Ubisoft',
      category: 'games',
      rating: 4
    },
    {
      id: 5,
      imgURL: 'https://play-lh.googleusercontent.com/TBRwjS_qfJCSj1m7zZB93FnpJM5fSpMA_wUlFDLxWAb45T9RmwBvQd5cWR5viJJOhkI=s48-rw',
      title: 'Netflix',
      developer: 'Netflix Inc.',
      category: 'entertaiment',
      rating: 5
    },
    {
      id: 6,
      imgURL: 'https://image.winudf.com/v2/image/Y29tLmhvbGEuc2NlbmUzZC5zaHVpbXVfaWNvbl9wbTFjZXh1dQ/icon.webp?w=140&fakeurl=1&type=.webp',
      title: 'Jellyfish Hola 3D Theme',
      developer: 'Holaverse',
      category: 'accessories',
      rating: 3
    },
    {
      id: 7,
      imgURL: 'https://i.pinimg.com/originals/9e/43/a0/9e43a0b9a5d13f8491fc48114687c083.png',
      title: 'Qatar Airways',
      developer: 'Qatar Airways',
      category: 'accessories',
      rating: 4
    },
    {
      id: 8,
      imgURL: 'https://play-lh.googleusercontent.com/9kABykeGovHPy-dN19lRxxnCp8IZK3Pkl8qLFNxrEe-hhKVZeiyhTBEIRUt6t-vhxQ=w240-h480-rw',
      title: 'Microsoft Word',
      developer: 'Microsoft Corporation',
      category: 'accessories',
      rating: 5
    },
    {
      id: 9,
      imgURL: 'https://data.apkshub.com/49/com.halfbrick.fruitninjafree/2.3.9/icon.png',
      title: 'Fruit Ninja Free',
      developer: 'Halfbricks Studios',
      category: 'games',
      rating: 5
    }
  ];

  loadApps();
  loadDropdownList();

  function loadDropdownList() {
    const $dropdownList = document.getElementById('dropdown-list');
    const categories = new Set();
    categories.add('all');
    data.map(item => categories.add(item.category));
    categories.forEach(category => {
      const $listItem = document.createElement('li');
      $listItem.textContent = category;
      $listItem.className = "px-4 py-1 border-b border-b-[#47dda3] cursor-pointer";
      $listItem.onclick = () => loadApps(category);
      $dropdownList.appendChild($listItem);
    });
  }

  function loadApps(category = null) {
    $appsContent.innerHTML = '';
    if (!category || category === 'all') {
      data.forEach(item => $appsContent.appendChild(loadApp(item)));
    } else {
      data.forEach(item => {
        if (category && item.category === category) {
          $appsContent.appendChild(loadApp(item));
        }
      });
    }
  }

  function loadApp(details) {
    const $app = document.createElement('div');
    $app.className = "w-full max-w-[330px] lg:max-w-auto flex-shrink-0 flex flex-col text-center items-center gap-5 p-5 rounded-md shadow-[0_0_15px_#111] transition-all ease hover:bg-[#181a1c]/50 sm:flex-row sm:text-left";
    $app.innerHTML = `<img src="${details.imgURL}" class="w-full max-w-[120px] aspect-square" alt="${details.title}">`;
    const $downloadBtn = document.createElement('button');
    $downloadBtn.className = "text-xs mt-3 px-[15px] py-[7px] bg-[#191b1d] border-b-4 border-b-[#47dda3] uppercase rounded-md transition-all ease hover:bg-[#191b1d]/75 hover:shadow-md hover:shadow-black/20 hover:scale-110";
    $downloadBtn.textContent = 'Install App';
    $downloadBtn.onclick = downloadApp;
    const $appContent = document.createElement('div');
    $appContent.className = "flex-1";
    $appContent.innerHTML = `
      <h3 class="text-sm font-semibold">${details.title}</h3>
      <p class="text-xs mt-0.5">${details.developer}</p>
      <div class="w-full text-sm flex justify-center gap-1 mt-1 sm:justify-start">
        <span class="sr-only">${details.rating} Out Of 5 Ratings</span>
        ${getRatingHtml(details.rating)}
      </div>`;
    $appContent.appendChild($downloadBtn);
    $app.appendChild($appContent);
    return $app;
  }

  function getRatingHtml(rating) {
    let ratings = '';
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        ratings += '<i class="fa-solid fa-star text-[#f8bc00]" aria-hidden="true"></i>';
      } else {
        ratings += '<i class="fa-solid fa-star text-[#191b1d]" aria-hidden="true"></i>';
      }
    }
    return ratings;
  }

  function downloadApp(e) {
    const $downloading = document.createElement('div');
    $downloading.className = "mt-3";
    const $success = document.createElement('p');
    $success.className = "w-fit mx-auto sm:mx-0 text-xs mt-3 px-[15px] py-[7px] bg-[#191b1d] border-b-4 border-b-[#47dda3] uppercase rounded-md";
    const $parent = e.currentTarget.parentNode;
    $success.textContent = 'Installed'
    $downloading.innerHTML = `<p class="text-xs">Downloading</p><div class="bg-[#191b1d] relative h-1 mt-1 before:content-[''] before:absolute before:top-0 before:left-0 before:bottom-0 before:w-0 before:animate-download before:bg-[#47dda3]"></div>`;
    e.currentTarget.remove();
    $parent.append($downloading);
    setTimeout(() => {
      $downloading.remove();
      $parent.append($success);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }, 1500);
  }
})();