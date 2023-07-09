(function () {
  const $addListBtn = document.getElementById('add-new-list');
  const $listContent = document.getElementById('list-content');
  const $prevBtn = document.getElementById('go-back');
  const $addBtn = document.getElementById('add-new');
  const $form = document.querySelector('form');
  const data = {
    targets: [
      {
        id: 1,
        title: 'something 1',
        isCompleted: false
      },
      {
        id: 2,
        title: 'something 2',
        isCompleted: false
      },
      {
        id: 3,
        title: 'done',
        isCompleted: true
      }
    ]
  }

  $form.onsubmit = function (e) {
    e.preventDefault();
    if (e.currentTarget.querySelector('input').value.trim()) {
      jumpTo('step-1', 'step-2');
      populateList();
    } else {
      alert('Enter valid password');
    }
  }

  $addListBtn.onclick = function () {
    const response = prompt('Enter List Name:');
    if (response === null) return;
    if (response in data) {
      alert('List item already present!');
      return;
    }
    data[response] = [];
    populateList();
  }

  $prevBtn.onclick = function () {
    jumpTo('step-3', 'step-2');
  }

  $addBtn.onclick = function (e) {
    const controls = e.currentTarget.getAttribute('data-controls');
    const response = prompt(`Enter your todo in ${controls}`);
    if (response === null) return;
    const newCount = data[controls].push({
      id: data[controls].length + 1,
      title: response,
      isCompleted: false
    });
    $listContent.appendChild(createTodo(newCount, controls, response));
    updateCount(`${controls}-count`, newCount, getCompletedCount(controls));
  }

  function jumpTo(id_1, id_2) {
    const $content1 = document.getElementById(id_1);
    const $content2 = document.getElementById(id_2);
    if ($content1.classList.contains('slide-in')) {
      $content1.classList.remove('slide-in');
    }
    $content1.classList.add('slide-out');
    setTimeout(() => {
      $content1.setAttribute('hidden', true);
      $content2.removeAttribute('hidden');
      if ($content2.classList.contains('slide-out')) {
        $content2.classList.remove('slide-out');
      }
      $content2.classList.add('slide-in');
    }, 300);
  }

  function toggleCompleted(id, listName) {
    const index = data[listName].findIndex(listItem => listItem.id === id);
    const listItem = data[listName][index];
    data[listName][index] = {
      ...listItem,
      isCompleted: !listItem.isCompleted
    }
    updateCount(`${listName}-count`, data[listName].length, getCompletedCount(listName));
  }

  function getCompletedCount(listName) {
    return data[listName].reduce((count, item) => {
      if (item.isCompleted) {
        return count + 1;
      }
      return count;
    }, 0);
  }

  function updateCount(selector, count, completed = null) {
    const $pie = document.getElementById(selector);
    $pie.setAttribute('style', `--content: '${count}';--total: ${count};--completed: ${completed ?? 0}`);
  }

  function populateList() {
    const $lists = document.getElementById('lists');
    $lists.innerHTML = '';
    for (let list in data) {
      $lists.appendChild(createList(list, data[list]));
      updateCount(`${list}-count`, data[list].length, getCompletedCount(list));
    }
  }

  function createList(listName, listItem) {
    const $listItem = document.createElement('div');
    $listItem.className = "w-full flex items-center bg-white cursor-pointer p-4 rounded-md shadow-lg hover:bg-[whitesmoke]";
    $listItem.id = listName;
    $listItem.innerHTML = `<h2 class="font-bold flex-1 capitalize">${listName}</h2><div class="pie w-10 h-10" id="${listName}-count"></div>`;
    $listItem.onclick = () => {
      document.getElementById('list-content-title').textContent = listName;
      jumpTo('step-2', 'step-3');
      populateListItem(listItem, listName);
      $addBtn.setAttribute('data-controls', listName);
    };
    return $listItem;
  }

  function populateListItem(listItem, listName) {
    $listContent.innerHTML = '';
    listItem.forEach((item, index) => {
      $listContent.appendChild(createTodo(index+1, listName, item.title, item));
    });
  }

  function createTodo(index, controls, label, listItem) {
    const $todo = document.createElement('div');
    $todo.className = "target bg-white flex flex-row-reverse gap-2 items-center p-4 shadow-md rounded-md";
    const $input = document.createElement('input');
    if (listItem && listItem.isCompleted) {
      $input.setAttribute('checked', true);
    }
    $input.type = 'checkbox';
    $input.name = `${index}`;
    $input.id = `${index}`;
    $input.className = `peer/${index}`;
    $input.onclick = () => toggleCompleted(index, controls);
    const $label = document.createElement('label');
    $label.className = `relative flex-1 font-bold peer-checked/${index}:text-gray-300 before:content-[''] before:absolute before:top-1/2 before:left-0 before:right-0 before:h-[1px] before:bg-gray-400 before:-translate-y-1/2 before:hidden peer-checked/${index}:before:block`;
    $label.htmlFor = `${index}`;
    $label.textContent = label;
    $todo.appendChild($input);
    $todo.appendChild($label);
    return $todo;
  }
})();