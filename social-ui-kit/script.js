(function () {
  const $modal = document.querySelector('[data-modal]');
  const $postsContent = document.getElementById('posts-content');

  const users = [
    {
      id: 1,
      name: 'Frances P. Troia',
      avatar: 'https://i.pravatar.cc/300?img=43'
    },
    {
      id: 2,
      name: 'David Saunders',
      avatar: 'https://i.pravatar.cc/300?img=54'
    },
    {
      id: 3,
      name: 'Manuel Hall',
      avatar: 'https://i.pravatar.cc/300?img=57'
    }
  ];

  const posts = [
    {
      userId: 1,
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni exercitationem nobis architecto modi blanditiis non neque perferendis nam, suscipit quas.',
      posted: '2 hours ago',
      comments: [
        {
          userId: 1,
          content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni exercitationem nobis architecto modi blanditiis non neque perferendis nam, suscipit quas.'
        },
        {
          userId: 2,
          content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni exercitationem nobis architecto modi blanditiis non neque perferendis nam, suscipit quas.'
        },
        {
          userId: 3,
          content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni exercitationem nobis architecto modi blanditiis non neque perferendis nam, suscipit quas.'
        },
      ]
    },
    {
      userId: 2,
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni exercitationem nobis architecto modi blanditiis non neque perferendis nam, suscipit quas.',
      posted: '3 hours ago',
      comments: []
    },
    {
      userId: 3,
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni exercitationem nobis architecto modi blanditiis non neque perferendis nam, suscipit quas.',
      posted: 'Yesterday',
      comments: [
        {
          userId: 1,
          content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni exercitationem nobis architecto modi blanditiis non neque perferendis nam, suscipit quas.'
        },
        {
          userId: 2,
          content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni exercitationem nobis architecto modi blanditiis non neque perferendis nam, suscipit quas.'
        },
        {
          userId: 3,
          content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni exercitationem nobis architecto modi blanditiis non neque perferendis nam, suscipit quas.'
        },
      ]
    }
  ]

  document.onclick = function (e) {
    if (e.target.closest('[data-modal-show]')) {
      $modal.showModal();
    } else if (e.target.closest('[data-dropdown-toggle]')) {
      const $dropdownToggle = e.target.closest('[data-dropdown-toggle]');
      const $dropdownList = $dropdownToggle.nextElementSibling;
      if ($dropdownToggle.getAttribute('aria-expanded') === 'true') {
        $dropdownToggle.setAttribute('aria-expanded', false);
        $dropdownList.classList.replace('grid-rows-[1fr]', 'grid-rows-[0fr]');
        $dropdownList.classList.remove('pt-2.5');
      } else {
        $dropdownToggle.setAttribute('aria-expanded', true);
        $dropdownList.classList.replace('grid-rows-[0fr]', 'grid-rows-[1fr]');
        $dropdownList.classList.add('pt-2.5');
      }
    } else if (e.target.closest('[data-reply]')) {
      const comment = prompt("What are your thought?");
      if (comment === null) return;
      const userId = +e.target.closest('[data-reply]').dataset.userId;
      const post = posts.find(post => post.userId === userId);
      post.comments.push({
        userId: 1,
        content: comment
      });
      renderPosts();
    } else {
      $modal.close();
    }
  }

  function renderPosts() {
    let clutter = '';
    posts.forEach(post => {
      const user = users.find(user => user.id === post.userId);
      clutter += `
        <div class="flex items-start gap-2 md:gap-3">
          <img class="w-12 md:w-16 aspect-square rounded-full border-8 border-primary-650" src="${user.avatar}" alt="${user.name}">
          <div class="flex-1 space-y-0.5">
            <div class="flex items-center gap-2">
              <h3 class="font-semibold">${user.name}</h3>
              <span class="text-sm text-primary-500">${post.posted}</span>
            </div>
            <p>${post.content}</p>
            <button class="block font-medium text-accent transition-colors ease duration-300 hover:text-accent/75" data-reply data-user-id="${user.id}">Reply</button>
            ${
              (post.comments && post.comments.length)
              ? `
              <button class="block font-semibold transition-colors ease duration-300 hover:text-neutral/75" data-dropdown-toggle aria-expanded="false">
                <span>View ${post.comments.length} replies</span>
                <i class="fa-solid fa-chevron-down"></i>
              </button>
              <div class="transition-all duration ease grid grid-rows-[0fr]" data-dropdown-list>
                <div class="overflow-hidden space-y-2.5">
                  ${renderComments(post.comments)}
                </div>
              </div>
              ` : ''
            }
          </div>
        </div>
      `;
    });
    $postsContent.innerHTML = clutter;
  }
  renderPosts();

  function renderComments(comments) {
    let clutter = '';
    comments.forEach(comment => {
      const user = users.find(user => user.id === comment.userId);
      clutter += `
        <div class="flex items-start gap-2">
          <img class="w-10 md:w-12 aspect-square rounded-full border-8 border-primary-650"
            src="${user.avatar}" alt="${user.name}">
          <div class="flex-1 text-sm space-y-0.5">
            <div class="flex items-center gap-1">
              <h3 class="font-semibold">${user.name}</h3>
              <span class="text-xs text-primary-500">Now</span>
            </div>
            <p>${comment.content}</p>
          </div>
        </div>
      `;
    });
    return clutter;
  }
})();