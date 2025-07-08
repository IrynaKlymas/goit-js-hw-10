
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const datetimePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

let userSelectedDate = null; 
let countdownInterval = null; 

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

const options = {
  enableTime: true, 
  time_24hr: true, 
  defaultDate: new Date(), 
  minuteIncrement: 1, 
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0]; 
    if (userSelectedDate < new Date()) {
      iziToast.error({
        message: `<div class="error-icon"></div>Please choose a date in the future`,
        position: 'topRight',
        class: 'custom-izitoast',
        progressBar: false, 
        close: false,
        timeout: 3000,
      });
      startButton.disabled = true; 
    } else {
      startButton.disabled = false; 
    }
  },
};

flatpickr(datetimePicker, options);

startButton.addEventListener('click', () => {

  startButton.disabled = true;
  datetimePicker.disabled = true;

  countdownInterval = setInterval(() => {
    const currentTime = new Date();
    const msRemaining = userSelectedDate.getTime() - currentTime.getTime();

    if (msRemaining <= 0) {
      clearInterval(countdownInterval);
      iziToast.success({
        title: 'Success',
        message: 'Countdown finished!',
        position: 'topRight',
        progressBar: false, 
        close: false,
        timeout: 3000,
      });
      datetimePicker.disabled = false; 
      daysValue.textContent = '00';
      hoursValue.textContent = '00';
      minutesValue.textContent = '00';
      secondsValue.textContent = '00';
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(msRemaining);

    daysValue.textContent = addLeadingZero(days);
    hoursValue.textContent = addLeadingZero(hours);
    minutesValue.textContent = addLeadingZero(minutes);
    secondsValue.textContent = addLeadingZero(seconds);
  }, 1000); 
});

startButton.disabled = true;

datetimePicker.classList.add('active-timer');

datetimePicker.classList.remove('active-timer');