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

let userSelectedDate = null;
let countdownInterval = null;

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
  if (!userSelectedDate) {
    iziToast.error({
      title: 'Error',
      message: 'Please choose a valid date and time.',
    });
    return;
  }

  const targetDate = userSelectedDate.getTime();
  startButton.disabled = true;
  dateTimePicker.disabled = true;

  countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      clearInterval(countdownInterval);
      updateTimer(0);
      iziToast.success({
        title: 'Countdown Finished',
        message: 'The countdown has reached its end.',
      });
      startButton.disabled = false;
      dateTimePicker.disabled = false;
    } else {
      updateTimer(distance);
    }
  }, 1000);
};

const handleDateTimeChange = selectedDates => {
  const selectedDate = selectedDates[0];
  const currentDate = new Date().getTime();

  if (selectedDate.getTime() <= currentDate) {
    startButton.disabled = true;
    iziToast.error({
      title: 'Error',
      message: 'Please choose a date and time in the future.',
    });
  } else {
    startButton.disabled = false;
    userSelectedDate = selectedDate;
  }
};

flatpickr(dateTimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: handleDateTimeChange,
});

startButton.addEventListener('click', startTimer);
