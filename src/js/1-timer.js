// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

// extracting elements from the DOM tree and assigning them to variables
const startButton = document.querySelector('button[data-start]'); // button start
const dateTimePicker = document.getElementById('datetime-picker'); // calendar input
// display timer
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

// variable for selected date by user
let userSelectedDate = null;

// button must be disabled, until the user has selected a date (date from future)
startButton.disabled = true;

// options for flatpickr, for calendar
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate <= new Date()) {
      iziToast.error({
        message: 'Please choose a date in the future',
        messageColor: 'white',
        backgroundColor: '#EF4040',
        iconUrl: './img/svg/x-icon.svg',
        iconColor: 'white',
        position: 'topRight',
        close: false,
        progressBar: false,
      });
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};

// adds a beautiful graphical calendar to input
flatpickr('#datetime-picker', options);

// add event to the button start
startButton.addEventListener('click', onBtnClick);

function onBtnClick() {
  startButton.disabled = true;
  dateTimePicker.disabled = true;

  const intervalId = setInterval(() => {
    const curentTime = Date.now();
    const elapsedTime = userSelectedDate - curentTime;

    if (elapsedTime <= 0) {
      clearInterval(intervalId);
      dateTimePicker.disabled = false;
      return;
    }

    const convertedTime = convertMs(elapsedTime);
    updateTimerDisplay(convertedTime);
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function updateTimerDisplay({ days, hours, minutes, seconds }) {
  daysElement.textContent = addLeadingZero(days);
  hoursElement.textContent = addLeadingZero(hours);
  minutesElement.textContent = addLeadingZero(minutes);
  secondsElement.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
