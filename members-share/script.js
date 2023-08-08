(function () {
  const $contactWrapper = document.getElementById('contacts');
  const $contactInput = document.getElementById('people');
  const $cancelBtn = document.getElementById('cancel-btn');
  const $sendBtn = document.getElementById('send-btn');
  const contacts = {};

  addContact("Emma james"); // Placeholder Contact

  $contactWrapper.onclick = () => $contactInput.focus();

  $contactInput.oninput = function (e) {
    const $target = e.target;
    $target.onkeydown = (e) => {
      const key = e.key.toLowerCase();
      if (key === 'enter') {
        if (contacts.hasOwnProperty($target.value)) {
          return alert('🤷‍♂️ Contact already added, Please Try with other contact!');
        } // Contact with same name must not exist
        addContact($target.value);
        $target.value = '';
      }
    }
  }

  $cancelBtn.onclick = removeAllContacts;

  $sendBtn.onclick = function(){
    let message = "Sent message to: "
    for (let key in contacts) {
      message += key + ", ";
    }
    removeAllContacts(); // Optional
    alert(message.slice(0, message.length-2));
  }

  function createContact(contactName) {
    const $contact = document.createElement('div');
    $contact.className = "border border-white/20 flex items-center gap-2 bg-[#41436d] rounded-3xl py-1 px-2";
    const $contactImg = document.createElement('img');
    $contactImg.className = "w-7 h-7 rounded-full";
    $contactImg.src = "https://i.pravatar.cc/100";
    $contactImg.alt = contactName;
    const $contactName = document.createElement('span');
    $contactName.className = "";
    $contactName.textContent = contactName;
    const $removeContactBtn = document.createElement('button');
    $removeContactBtn.innerHTML = `<span class="sr-only">Remove Contact</span><i class="fa-solid fa-times" aria-hidden="true"></i>`;
    $removeContactBtn.onclick = function(e) {
      removeContact(e);
      removeFromArr(contactName);
    };
    $contact.appendChild($contactImg);
    $contact.appendChild($contactName);
    $contact.appendChild($removeContactBtn);
    return $contact;
  }

  function addContact(contactName) {
    const $elem = createContact(contactName);
    contacts[contactName] = $elem;
    $contactWrapper.insertAdjacentElement('afterbegin', $elem);
  }

  function removeContact(e) {
    e.stopPropagation();
    e.currentTarget.parentElement.remove();
  }

  function removeAllContacts() {
    for (let key in contacts) {
      contacts[key].remove();
      delete contacts[key];
    }
  }

  function removeFromArr(target) {
    if (contacts.hasOwnProperty(target)) {
      delete contacts[target];
    }
  }
})();