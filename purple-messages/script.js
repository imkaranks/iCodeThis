(function () {
  const MY_ID = 101;
  const CONSTANTS = {
    SEND_MESSAGE: "SEND_MESSAGE"
  }
  const $chatPage = document.getElementById('chat-page');
  const $chatBox = document.getElementById('chat-content');
  const $messageForm = document.getElementById('message-form');
  const $searchInput = document.getElementById('search-input');
  const $backToNewChatsBtn = document.getElementById('back-to-new-chats');

  const contacts = [
    {
      id: 1,
      name: "Mary Simsons",
      avatar: 'https://i.pravatar.cc/300?img=47',
      chats: [
        {
          userId: 1,
          message: 'High demand for improved user experiences and strong focus on the end-users have made interaction designers',
          timestamp: 'Wed Aug 30 2023 23:31:43',
          seen: true
        },
        {
          userId: MY_ID,
          message: 'There are many key factors to understanding interaction design and how it can enable a pleasurable end user experience.',
          timestamp: 'Wed Aug 30 2023 23:31:50',
          seen: true
        },
        {
          userId: MY_ID,
          message: 'Find-ability is the most critical success factor for Information architecture',
          timestamp: 'Wed Aug 30 2023 23:31:56',
          seen: true
        },
        {
          userId: 1,
          message: 'Visual design represents the aesthetics or look-and-feel of the front end of any user interface. Graphic treatment of Interface elements is often perceived as the visual design. The purpose of visual design is to use',
          timestamp: 'Wed Aug 30 2023 23:32:03',
          seen: false
        },
        {
          userId: 1,
          message: 'Visual design represents the aesthetics or look-and-feel of the front end of any user interface. Graphic treatment of Interface elements is often perceived as the visual design. The purpose of visual design is to use',
          timestamp: 'Wed Aug 30 2023 23:32:20',
          seen: false
        },
      ]
    },
    {
      id: 2,
      name: "Javier P. Martin",
      avatar: 'https://i.pravatar.cc/300?img=68',
      chats: [
        {
          userId: 2,
          message: 'High demand for improved user experiences and strong focus on the end-users have made interaction designers',
          timestamp: 'Wed Aug 30 2023 23:31:43',
          seen: true
        },
        {
          userId: MY_ID,
          message: 'There are many key factors to understanding interaction design and how it can enable a pleasurable end user experience.',
          timestamp: 'Wed Aug 30 2023 23:31:50',
          seen: true
        },
        {
          userId: MY_ID,
          message: 'Find-ability is the most critical success factor for Information architecture',
          timestamp: 'Wed Aug 30 2023 23:31:56',
          seen: true
        },
        {
          userId: 2,
          message: 'Visual design represents the aesthetics or look-and-feel of the front end of any user interface. Graphic treatment of Interface elements is often perceived as the visual design. The purpose of visual design is to use',
          timestamp: 'Wed Aug 30 2023 23:32:03',
          seen: false
        },
      ]
    },
    {
      id: 3,
      name: "Darlene C. Quigley",
      avatar: 'https://i.pravatar.cc/300?img=43',
      chats: [
        {
          userId: 3,
          message: 'High demand for improved user experiences and strong focus on the end-users have made interaction designers',
          timestamp: 'Wed Aug 30 2023 23:31:43',
          seen: true
        },
        {
          userId: MY_ID,
          message: 'There are many key factors to understanding interaction design and how it can enable a pleasurable end user experience.',
          timestamp: 'Wed Aug 30 2023 23:31:50',
          seen: true
        },
        {
          userId: MY_ID,
          message: 'Find-ability is the most critical success factor for Information architecture',
          timestamp: 'Wed Aug 30 2023 23:31:56',
          seen: true
        },
        {
          userId: 3,
          message: 'Visual design represents the aesthetics or look-and-feel of the front end of any user interface. Graphic treatment of Interface elements is often perceived as the visual design. The purpose of visual design is to use',
          timestamp: 'Wed Aug 30 2023 23:32:03',
          seen: true
        },
      ]
    },
    {
      id: 4,
      name: "Shane C. Fajardo",
      avatar: 'https://i.pravatar.cc/300?img=33',
      chats: [
        {
          userId: 4,
          message: 'High demand for improved user experiences and strong focus on the end-users have made interaction designers',
          timestamp: 'Wed Aug 30 2023 23:31:43',
          seen: true
        },
        {
          userId: MY_ID,
          message: 'There are many key factors to understanding interaction design and how it can enable a pleasurable end user experience.',
          timestamp: 'Wed Aug 30 2023 23:31:50',
          seen: true
        },
        {
          userId: MY_ID,
          message: 'Find-ability is the most critical success factor for Information architecture',
          timestamp: 'Wed Aug 30 2023 23:31:56',
          seen: true
        },
        {
          userId: 4,
          message: 'Visual design represents the aesthetics or look-and-feel of the front end of any user interface. Graphic treatment of Interface elements is often perceived as the visual design. The purpose of visual design is to use',
          timestamp: 'Wed Aug 30 2023 23:32:03',
          seen: true
        },
      ]
    },
    {
      id: 5,
      name: "Joyce M. Massey",
      avatar: 'https://i.pravatar.cc/300?img=32',
      chats: [
        {
          userId: 5,
          message: 'High demand for improved user experiences and strong focus on the end-users have made interaction designers',
          timestamp: 'Wed Aug 30 2023 23:31:43',
          seen: true
        },
        {
          userId: MY_ID,
          message: 'There are many key factors to understanding interaction design and how it can enable a pleasurable end user experience.',
          timestamp: 'Wed Aug 30 2023 23:31:50',
          seen: true
        },
        {
          userId: MY_ID,
          message: 'Find-ability is the most critical success factor for Information architecture',
          timestamp: 'Wed Aug 30 2023 23:31:56',
          seen: true
        },
        {
          userId: 5,
          message: 'Visual design represents the aesthetics or look-and-feel of the front end of any user interface. Graphic treatment of Interface elements is often perceived as the visual design. The purpose of visual design is to use',
          timestamp: 'Wed Aug 30 2023 23:32:03',
          seen: true
        },
      ]
    },
  ];
  let activeContact = null;

  const contactReducer = (action) => {
    if (action.type === CONSTANTS.SEND_MESSAGE) {
      const { id, userId, message, timestamp } = action.payload;
      const contact = contacts.find(contact => contact.id === +id);
      contact.chats.push({ userId, message, timestamp, seen: true });
    }
  }

  function sendMessage(id, message) {
    const newChat = { id, userId: MY_ID, message, timestamp: new Date().toUTCString() };
    contactReducer({
      type: CONSTANTS.SEND_MESSAGE,
      payload: newChat
    });
    $chatBox.insertAdjacentHTML('beforeend', createChatTemplate(newChat));
  }

  document.onclick = function (e) {
    if (e.target.closest('.contact__item')) {
      showChats(e.target.closest('.contact__item').dataset.userId);
    } else if (e.target.closest('#go-back')) {
      renderContacts();
      hideChats();
    } else if (e.target.closest('#back-to-new-chats')) {
      backToNewChats();
    }
  }

  function showChats(contactUserId) {
    activeContact = contactUserId;
    $searchInput.value = '';
    $chatPage.removeAttribute('hidden');
    renderChats(contactUserId);
    setTimeout(() =>
      $chatPage.classList.replace('translate-y-full', 'translate-y-0')
    , 0);
  }

  function hideChats() {
    $chatPage.classList.replace('translate-y-0', 'translate-y-full');
    setTimeout(() =>
      $chatPage.setAttribute('hidden', true)
    , 300);
  }

  function renderContacts(contactsData = null) {
    let clutter = '';
    (contactsData || contacts).forEach((contact, i) => {
      const lastChat = contact.chats[contact.chats.length - 1];
      const lastMsg = lastChat.message;
      const lastMsgTimestamp = new Date(lastChat.timestamp).toLocaleTimeString();
      const lastUnseenMsgs = numOfLastUnseenMsgs(contact.chats);
      clutter += `
        <div class="contact__item | cursor-pointer p-4 flex gap-2 items-center transition-all hover:shadow-lg hover:shadow-black/20" data-user-id="${contact.id}" style="--delay: ${i}">
          <div class="bg-purple-600 w-12 aspect-square rounded-full border-4 border-purple-600"
            data-image>
            <img src="${contact.avatar}" alt="${contact.name}"
              class="w-full h-full rounded-full object-cover object-center">
          </div>
          <div class="flex-1">
            <div class="flex items-center gap-2">
              <h2 class="font-medium">${contact.name}</h2>
              ${lastUnseenMsgs > 0 ? `<span class="inline-flex justify-center items-center rounded-full bg-red-400 w-5 h-5 text-xs">${lastUnseenMsgs}</span>` : ''}
              <span class="ml-auto text-sm text-gray-300">${lastMsgTimestamp}</span>
            </div>
            <p class="text-sm">${lastChat.userId === MY_ID ? 'You: ' : ''}${lastMsg.length > 80 ? lastMsg.slice(0, 80) + '...' : lastMsg}</p>
          </div>
        </div>
      `;
    });
    document.getElementById('contacts').innerHTML = clutter;
  }
  renderContacts();

  function numOfLastUnseenMsgs(chats) {
    let count = 0;
    for (let i = chats.length - 1; i >= 0; i--) {
      if (chats[i].userId !== MY_ID && chats[i].seen === false) count++;
      else {
        break;
      }
    }
    return count;
  }

  function renderChats(contactUserId) {
    const contact = contacts.find(contact => contact.id === +contactUserId);
    let clutter = '';
    contact.chats.forEach((chat, i) => {
      if (!chat.seen) chat.seen = true; // mark as seen msgs
      clutter += createChatTemplate(chat, i, contact);
    });
    document.getElementById('chat-content').innerHTML = clutter;
    backToNewChats();
  }

  function createChatTemplate(chat, i = 0, contact = null) {
    return `
      <div class="chat__item | flex ${chat.userId === MY_ID ? 'flex-row-reverse' : ''} my-6 items-start gap-2" style="--direction: ${chat.userId === MY_ID ? 1 : -1};--delay: ${i}">
        <div class="mt-2 border-4 bg-gray-200 w-12 aspect-square rounded-full" data-image>
          <img src=${chat.userId === MY_ID ? 'https://shismqklzntzxworibfn.supabase.co/storage/v1/object/public/avatars/928d4517-f2db-4be1-9782-556ee3ee37f8.jpeg' : contact.avatar} alt=""
            class="w-full h-full rounded-full object-cover object-center">
        </div>
        <p class="bg-white flex-1 p-2 shadow-lg shadow-black/10 min-h-[4rem]">${chat.message}</p>
      </div>
    `;
  }

  $messageForm.onsubmit = function (e) {
    e.preventDefault();
    const $messageInput = e.target.querySelector('input');
    const message = $messageInput.value;
    if (!message.trim()) return;
    sendMessage(activeContact, message);
    $messageInput.value = '';
    backToNewChats();
  }

  function backToNewChats() {
    $chatBox.scrollTo(0, $chatBox.scrollHeight);
  }

  $chatBox.onscroll = function (e) {
    if (e.target.scrollTop < e.target.scrollHeight - e.target.clientHeight - 20) {
      $backToNewChatsBtn.style.display = 'inline-flex';
    } else {
      $backToNewChatsBtn.style.display = 'none';
    }
  }

  $searchInput.oninput = function (e) {
    const filteredContacts = contacts
      .filter(contact => contact.name.toLowerCase().includes(e.target.value.toLowerCase()));
    renderContacts(filteredContacts);
  }
})();