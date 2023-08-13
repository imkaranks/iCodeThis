const $daysTag = document.getElementById("days"),
  $currentMonthYear = document.getElementById("current-month-year"),
  $calendarMonths = document.getElementById("calendar-months"),
  $prevNextBtns = document.querySelectorAll(".calendar-control"),
  $prevYear = document.getElementById("previous-year"),
  $nextYear = document.getElementById("next-year"),
  $addEvent = document.getElementById("add-event"),
  $saveEventBtn = document.getElementById("save"),
  $cancelEventBtn = document.getElementById("cancel"),
  $eventDateInput = document.getElementById('event-date'),
  $eventNameInput = document.getElementById('event-name'),
  $eventIconRadios = document.querySelectorAll('[name="icon"]'),
  $eventContainer = document.getElementById('event-container'),
  $eventForm = document.getElementById('event-form');

// getting new date, current year and month
let date = new Date(),
  currYear = date.getFullYear(),
  currMonth = date.getMonth(),
  editElement = null,
  schedule = [];

// storing full name of all months in array
const months = ["January", "February", "March", "April", "May", "June", "July","August", "September", "October", "November", "December"];

const renderCalendar = () => {
  let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
  let liTag = "";

  for (let i = firstDayofMonth; i > 0; i--) { // creating li of previous month last days
    liTag += createDateItem(lastDateofLastMonth - i + 1, 'text-neutral-lighter hover:bg-tertiary transition-all duration-300 ease hover:rounded-full hover:text-primary hover:outline hover:outline-tertiary hover:outline-offset-4');
  }

  for (let i = 1; i <= lastDateofMonth; i++) { // creating li of all days of current month
    // adding active class to li if the current day, month, and year matched
    let isToday = i === date.getDate() && currMonth === new Date().getMonth() &&
      currYear === new Date().getFullYear() ? "bg-[#bfdb38] rounded-full text-primary outline outline-[#bfdb38] outline-offset-4" : "text-neutral-light hover:bg-tertiary transition-all duration-300 ease hover:rounded-full hover:text-primary hover:outline hover:outline-tertiary hover:outline-offset-4 cursor-pointer";
    const hasSchedule = schedule.find(sch => sch.getFullYear() == currYear && sch.getMonth() == currMonth && sch.getDate() == i) ? 'bg-tertiary rounded-full text-primary outline outline-tertiary outline-offset-4' : '';
    liTag += createDateItem(i, `${hasSchedule} ${isToday}`);
  }

  for (let i = lastDayofMonth; i < 6; i++) { // creating li of next month first days
    liTag += createDateItem(i - lastDayofMonth + 1, 'text-neutral-lighter hover:bg-tertiary transition-all duration-300 ease hover:rounded-full hover:text-primary hover:outline hover:outline-tertiary hover:outline-offset-4');
  }

  let tempMonths = [];
  if (currMonth < 5) {
    // jan feb mar apr may
    tempMonths = months.slice(0, 5);
  } else if (currMonth < 10) {
    // mar apr may jun jul
    tempMonths = months.slice(5, 10);
  } else {
    // aug sep oct nov dec
    tempMonths = months.slice(7, months.length);
  }
  $calendarMonths.innerHTML = '';
  for (let item of tempMonths) {
    $calendarMonths.innerHTML += `<li class="p-2 m-2 rounded-full ${months[currMonth] === item ? 'font-bold' : ''}">${item.slice(0, 3)}</li>`;
  }
  $currentMonthYear.textContent = `${months[currMonth].slice(0, 3)}. ${currYear}`; // passing current mon and yr as $currentMonthYear text
  $prevYear.textContent = `${currYear - 1}`;
  $nextYear.textContent = `${currYear + 1}`;
  $daysTag.innerHTML = liTag;
}
renderCalendar();

$prevNextBtns.forEach(icon => { // getting prev and next icons
  icon.addEventListener("click", () => { // adding click event on both icons
    // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
    currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

    if (currMonth < 0 || currMonth > 11) { // if current month is less than 0 or greater than 11
      // creating a new date of current year & month and pass it as date value
      date = new Date(currYear, currMonth, new Date().getDate());
      currYear = date.getFullYear(); // updating current year with new date year
      currMonth = date.getMonth(); // updating current month with new date month
    } else {
      date = new Date(); // pass the current date as date value
    }
    renderCalendar(); // calling renderCalendar function
  });
});

$addEvent.onclick = function () {
  $eventForm.classList.toggle('hidden');
}

$cancelEventBtn.onclick = function (e) {
  e.preventDefault();
  if (editElement) {
    editElement = null;
  }
  $eventForm.classList.toggle('hidden');
}

$eventForm.onsubmit = function (e) {
  e.preventDefault();

  const { value: eventVal } = $eventNameInput;
  const { value: dateVal } = $eventDateInput;

  if (eventVal.trim() && dateVal.trim()) {
    if (editElement) {
      const $eventTitle = editElement.querySelector('.event__title');
      const $eventDate = editElement.querySelector('.event__date');
      const removalIndex = schedule.findIndex(sch => sch === new Date($eventDate.textContent.trim()));
      schedule.splice(removalIndex, 1, new Date(dateVal));
      $eventTitle.textContent = eventVal;
      $eventDate.textContent = dateVal;
      editElement = null;
    } else {
      const newDate = new Date($eventDateInput.value);
      schedule.push(newDate);
      $eventContainer.append(createEvent(eventVal, dateVal));
    }
    $eventDateInput.value = '';
    $eventNameInput.value = '';
    renderCalendar();
    $eventForm.classList.toggle('hidden');
  } else {
    alert('Both date and event are required');
  }
}

function createDateItem(date, classes='') {
  return `<li class="p-1 aspect-square grid place-items-center m-2 text-center cursor-pointer ${classes}">${date}</li>`;
}

function createEvent(eventTitle, eventTime) {
  const event = document.createElement('div');
  const eventBtnContainer = document.createElement('div');
  const eventDeleteBtn = document.createElement('button');
  const eventEditBtn = document.createElement('button');
  eventBtnContainer.className = "flex items-center justify-center gap-3";
  eventDeleteBtn.onclick = () => deleteEvent(event);
  eventEditBtn.onclick = () => editEvent(event);
  event.className = "mx-5 flex items-center justify-between border-b border-[#e96462] py-3";

  eventDeleteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
    viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round"
    stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <path d="M4 7l16 0"></path>
    <path d="M10 11l0 6"></path>
    <path d="M14 11l0 6"></path>
    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
  </svg>`;

  eventEditBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
    viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round"
    stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4"></path>
    <path d="M13.5 6.5l4 4"></path>
  </svg>`;

  event.innerHTML = `<div>
    <svg xmlns="http://www.w3.org/2000/svg" width="24"
      height="24" viewBox="0 0 24 24" stroke-width="2" stroke="#fdecba" fill="none" stroke-linecap="round"
      stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M19 3v12h-5c-.023 -3.681 .184 -7.406 5 -12zm0 12v6h-1v-3m-10 -14v17m-3 -17v3a3 3 0 1 0 6 0v-3">
      </path>
    </svg>
  </div>

  <div class="ml-5 mr-auto">
    <h2 class="event__title font-bold uppercase text-[#fdecba]">${eventTitle}</h2>
    <p class="event__date text-sm font-medium capitalize">${eventTime}</p>
  </div>`;

  eventBtnContainer.appendChild(eventEditBtn);
  eventBtnContainer.appendChild(eventDeleteBtn);
  event.appendChild(eventBtnContainer);
  return event;
}

function deleteEvent(event) {
  const newDate = new Date(event.textContent.trim());
  const removalIndex = schedule
    .findIndex(sch => 
      sch.getFullYear() == newDate.getFullYear()
      && sch.getMonth() == newDate.getMonth()
      && sch.getDate() == newDate.getDate()
    );
  schedule.splice(removalIndex, 1);
  event.remove();
  renderCalendar();
}

function editEvent(event) {
  alert("You're in editing mode! For now there's no way to cancel editing mode...");
  const $eventTitle = event.querySelector('.event__title');
  const $eventDate = event.querySelector('.event__date');
  $eventNameInput.value = $eventTitle.textContent.trim();
  $eventDateInput.value = $eventDate.textContent.trim();
  editElement = event;
  $eventForm.classList.toggle('hidden');
}