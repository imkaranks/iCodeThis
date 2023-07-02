(function () {
  const $persons = document.querySelectorAll('.person');
  const $input = document.querySelector('input');
  const $sendBtn = document.getElementById('send');
  const data = [
    {
      id: 1,
      name: "John Doe",
      imgURL: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fG1lbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
      chats: [
        {
          you: [
            "Hey!",
            "Okay, let me know!"
          ],
          timestamp: "13:32"
        },
        {
          "John Doe": [
            "Hey!",
            "Ready in 3",
            "Ready in 2",
            "Ready in 1"
          ],
          timestamp: "14:04",
          isViewed: false
        }
      ]
    },
    {
      id: 2,
      name: "Estelle Warner",
      imgURL: "https://images.unsplash.com/photo-1631947430066-48c30d57b943?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z2lybHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
      chats: [
        {
          you: [
            "Hey!",
            "Okay, let me know!"
          ],
          timestamp: "13:32"
        },
        {
          "Estelle Warner": [
            "Hey!",
            "Ready in 23"
          ],
          timestamp: "14:04",
          isViewed: false
        }
      ]
    },
    {
      id: 3,
      name: "Jane Doe",
      imgURL: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d29tZW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
      chats: [
        {
          you: [
            "Hey!",
            "Okay, let me know!"
          ],
          timestamp: "13:32"
        },
        {
          "Jane Doe": [
            "Hey!",
            "Hey!",
            "Hey!",
            "Hey!",
            "Ready in 35"
          ],
          timestamp: "14:04",
          isViewed: false
        }
      ]
    },
  ];

  viewMessage(1);

  $sendBtn.onclick = function () {
    const d = new Date();
    const { value } = $input;
    if (!value.trim()) return;
    const id = parseInt($input.getAttribute('data-controls')) - 1;
    const lastElem = data[id].chats[data[id].chats.length - 1];
    console.log(lastElem);
    if ('you' in lastElem) {
      lastElem.you.push(value);
    } else {
      data[id].chats.push({
        you: [value],
        timestamp: `${('0' + d.getHours()).slice(-2)}:${('0' + d.getMinutes()).slice(-2)}`
      });
    }
    $input.value = '';
    updateChatBox(id + 1);
  }

  function updateChatBox(id) {
    $input.setAttribute('data-controls', id);
    const person = data.find(item => item.id === id);
    populateChats(person);
  }

  function populateChats(person) {
    document.getElementById('person-name').textContent = person.name;
    const $chatBox = document.getElementById('chat-box');
    $chatBox.innerHTML = '';
    person.chats.forEach(chat => {
      if ('you' in chat) {
        $chatBox.appendChild(loadChat('you', chat));
      } else {
        $chatBox.appendChild(loadChat(person.name, chat, person.imgURL));
      }
    });
  };

  function loadChat(name, chat, img=null) {
    const $content = document.createElement('div');
    $content.className = `${name !== 'you' && !chat.isViewed ? 'not-seen' : ''} flex flex-col gap-2 text-sm`;
    if (name !== 'you') {
      $content.setAttribute('style', `--message: "${chat[name].length} new messages"`);
    }
    const $header = document.createElement('div');
    $header.className = "flex items-center gap-1";
    $header.innerHTML = name === 'you' ? `
      <h3 class="ml-auto font-semibold leading-none capitalize">${name}</h3>
      <time class="text-xs text-gray-500" datetime="${chat.timestamp}">${chat.timestamp}</time>` : `
      <img src="${img}" class="w-8 h-8 object-cover rounded" alt="" />
      <h3 class="font-semibold leading-none">${name}</h3>
      <time class="text-xs text-gray-500" datetime="${chat.timestamp}">${chat.timestamp}</time>`;
    $content.appendChild($header);
    chat[name].forEach(item => {
      $content.innerHTML += `<p class="${name === 'you' ? 'ml-auto bg-blue-500 text-white' : 'mr-auto bg-gray-200 text-gray-600'} p-3 rounded">${item}</p>`;
    });
    return $content;
  }

  function viewMessage(index) {
    const lastElem = data[index].chats[data[index].chats.length-1];
    const $unread = document.querySelectorAll('.unread');
    updateChatBox(index + 1);
    if (!lastElem.isViewed) lastElem.isViewed = true;
    $unread[index].style.display = "none";
  }

  $persons.forEach(($person, index) => {
    $person.onclick = () => {
      viewMessage(index);
    };
  });
})();