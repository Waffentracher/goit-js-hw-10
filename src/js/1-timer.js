import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const dateTimePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('#start-timer');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

let countdownInterval;

startButton.disabled = true;

const convertMs = ms => {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

const updateTimer = ms => {
  const { days, hours, minutes, seconds } = convertMs(ms);
  daysElement.textContent = days.toString().padStart(2, '0');
  hoursElement.textContent = hours.toString().padStart(2, '0');
  minutesElement.textContent = minutes.toString().padStart(2, '0');
  secondsElement.textContent = seconds.toString().padStart(2, '0');
};

const startTimer = () => {
  const targetDate = new Date(dateTimePicker.value).getTime();
  if (isNaN(targetDate)) {
    iziToast.error({
      title: 'Error',
      message: 'Please choose a valid date and time.',
    });
    return;
  }

  startButton.disabled = true;

  countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      clearInterval(countdownInterval);
      updateTimer(0);
      iziToast.success({
        title: 'Countdown Finished',
        message: 'The countdown has reached its end.',
      });
      startButton.disabled = false;
    } else {
      updateTimer(distance);
    }
  }, 1000);
};

const handleDateTimeChange = () => {
  const selectedDate = new Date(dateTimePicker.value).getTime();
  const currentDate = new Date().getTime();

  if (selectedDate <= currentDate) {
    startButton.disabled = true;
    iziToast.error({
      title: 'Error',
      message: 'Please choose a date and time in the future.',
    });
  } else {
    startButton.disabled = false;
  }
};

dateTimePicker.addEventListener('input', handleDateTimeChange);
startButton.addEventListener('click', startTimer);

// Оновлений код для виклику календаря для вибору дати
flatpickr(dateTimePicker, {
  enableTime: true,
  dateFormat: 'Y-m-d H:i',
  minDate: 'now',
});
