'use strict';

(function () {
  const $notificationToggle = document.querySelector('[data-new-notification]');
  const $notifications = document.querySelectorAll('[data-notification]');

  document.onclick = function (e) {
    if (e.target.closest('#notification-toggle')) {
      const $parentWrapper = document.getElementById('notifications-wrapper');
      $parentWrapper.setAttribute(
        'aria-hidden',
        $parentWrapper.getAttribute('aria-hidden') === 'true'
          ? false
          : true
      );
      $notifications.forEach(($notification, i) => {
        $notification.classList.toggle('animate-entry');
        $notification.setAttribute('style', `--delay: ${i}`);
      });
    } else if (e.target.closest('[data-mark-read]')) {
      if ($notificationToggle.getAttribute('data-new-notification') === 'false') return;
      markAllAsRead();
    } else if (e.target.closest('[data-accept]')) {
      const $btnWrapper = e.target.closest('[data-accept]').parentNode;
      $btnWrapper.innerHTML = `<p class="text-sm font-normal text-green-300">Accepted</p>`;
    } else if (e.target.closest('[data-decline]')) {
      const $btnWrapper = e.target.closest('[data-decline]').parentNode;
      $btnWrapper.innerHTML = `<p class="text-sm font-normal text-red-300">Declined</p>`;
    }
  }

  function markAllAsRead() {
    $notificationToggle.classList.remove('animate-bell');
    $notificationToggle.dataset.newNotification = false;
    $notificationToggle.dataset.notificationCount = 0;
    $notifications.forEach($notification => {
      $notification.dataset.new = false;
    })
  }
})();