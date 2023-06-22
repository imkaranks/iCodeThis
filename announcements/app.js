(function () {
  const $container = document.querySelector('main');
  const $announcementBox = document.querySelector('#announcements');
  const $header = document.querySelector('#header');
  const $notifyStatus = document.querySelector('#notification-status');

  const data = [
    {
      name: 'Peter Griffin',
      message: 'Ms. Philips is away this week. I am going to replace her.',
      postedAgo: '2'
    },
    {
      name: 'Hettie Marshall',
      message: 'Bring your books! We will read the next 2 chapters.',
      postedAgo: '2'
    }
  ];

  updateAmt();
  loadNotification();
  $container.classList.add('animate-crop-in');
  $announcementBox.insertAdjacentElement("afterend", loadCTA('View All', () => viewAnnouncements(data)));

  function createNotification(index, user) {
    const $notification = document.createElement('div');
    $notification.className = "notification | bg-[#202B47] cursor-pointer p-4 rounded-md hover:bg-[#202B47]/80 animate-slide-in";
    $notification.onclick = () => viewAnnouncements([user]);
    $notification.style.animationDelay = `${300 * index}ms`;
    $notification.innerHTML = `
      <div class="flex items-center text-sm gap-4">
          <img src="https://i.pravatar.cc/300" alt="${user.name}" class="w-8 aspect-square border-2 border-blue-400 rounded-full">
          <p class="font-extralight flex-1"><strong>${user.name}</strong> made an announcement.</p>
      </div>`;
    return $notification;
  }

  function loadNotification() {
    data.forEach((user, index) => {
      $announcementBox.appendChild(createNotification(index, user));
    });
  }

  function viewAnnouncements(_data) {
    const $statusCount = document.getElementById('notification-status-count');
    $header.innerHTML = `<span class="amt">${_data.length}</span> Announcements`;
    removeNotification();
    $announcementBox.nextElementSibling.remove();
    if (!document.getElementById('go-back')) {
      const $goBackBtn = document.createElement('button');
      $goBackBtn.className = "inline-flex justify-center items-center w-8 h-8 rounded-full hover:bg-[#202B47]";
      $goBackBtn.id = "go-back";
      $goBackBtn.innerHTML = `<i class="fa-solid fa-arrow-left"></i>`;
      $goBackBtn.onclick = goBack;
      $notifyStatus.insertAdjacentElement("beforebegin", $goBackBtn);
    }
    setTimeout(() => {
      $announcementBox.innerHTML = '';
      $statusCount.style.display = 'none';
      _data.forEach((user, index) => {
        const { name, message, postedAgo } = user;
        $announcementBox.appendChild(createAnnouncement(index, name, message, postedAgo))
      });
      $announcementBox.insertAdjacentElement("afterend", loadCTA('Dismiss All', dismissAll));
    }, 300);
  }

  function createAnnouncement(index, name, message, postedAgo) {
    const $announcement = document.createElement('div');
    $announcement.className = "announcement | bg-[#202B47] p-4 rounded-md animate-slide-in";
    $announcement.style.animationDelay = `${300 * index}ms`;
    $announcement.innerHTML = `
      <div class="flex items-start gap-4">
          <p class="font-extralight flex-1">${message}</p>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
              class="w-8 h-8 cursor-pointer text-[#677192] transition-colors ease hover:text-white">
              <path stroke-linecap="round" stroke-linejoin="round"
                  d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z">
              </path>
          </svg>
      </div>
      <div class="flex gap-2 items-center text-sm text-[#677192] mt-2">
          <img src="https://i.pravatar.cc/300" alt="" class="w-8 aspect-square border-2 border-blue-400 rounded-full">
          <span class="flex-1 font-semibold">${name}</span>
          <span>${postedAgo} hours ago</span>
      </div>`;
    return $announcement;
  }
  function loadCTA(text, cb) {
    const $cta = document.createElement('button');
    $cta.className = "bg-[#4C9CFF] self-center px-8 py-2 mt-auto rounded-md transition-colors ease hover:bg-[#4C9CFF]/50 active:bg-[#4C9CFF]/50";
    $cta.onclick = cb;
    $cta.textContent = text;
    return $cta;
  }

  function animateExit($html, count) {
    $html.classList.add('animate-slide-out');
    $html.style.animationDelay = `${300 * count}ms`;
    setTimeout(() => {
      $html.remove();
    }, 300 * (count + 1));
  }

  function dismissAll() {
    const $announcements = document.querySelectorAll('.announcement');
    updateAmt(0);
    $announcements.forEach(($announcement, count) => {
      animateExit($announcement, count);
    });
  }

  function removeNotification() {
    const $notifications = document.querySelectorAll('.notification');
    $notifications.forEach(($notification, count) => {
      animateExit($notification, count);
    });
  }

  function goBack() {
    $header.textContent = 'Notifications';
    dismissAll();
    setTimeout(() => {
      loadNotification();
    }, 300 * data.length);
    $announcementBox.nextElementSibling.remove();
    $announcementBox.insertAdjacentElement("afterend", loadCTA('View All', () => viewAnnouncements(data)));
    document.getElementById('go-back').remove();
  };

  function updateAmt(_amt = null) {
    const $amt = document.querySelectorAll('.amt');
    $amt.forEach(item => item.textContent = `${_amt ?? data.length}`);
  }
})();