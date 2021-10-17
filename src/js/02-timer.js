import flatpickr from 'flatpickr';
// import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/dark.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

//ссылки на элементы html
const refs = {
  inputArea: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  daysField: document.querySelector('span[data-days]'),
  hoursField: document.querySelector('span[data-hours]'),
  minutesField: document.querySelector('span[data-minutes]'),
  secondsField: document.querySelector('span[data-seconds]'),
};

refs.startBtn.disabled = true;
let isCorrectDate = false;
let difference = null;

//объект опций для конструктора flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    difference = selectedDates[0] - options.defaultDate;
    if (difference > 0) {
      refs.startBtn.disabled = false;
      isCorrectDate = true;
    } else {
      Notify.failure('Please choose a date in the future', {
        position: 'center-center',
        timeout: 1000,
        pauseOnHover: false,
      });
    }
  },
};

//инициализация flatpickr
flatpickr(refs.inputArea, options);

refs.startBtn.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
  console.log('Start timer');
  startTimer();
  // const { days, hours, minutes, seconds } = convertMs(difference);
}

function startTimer() {
  const intervalID = setInterval(() => {
    showTimer(convertMs(difference));
    difference -= 1000;
    if (difference < 0) {
      clearInterval(intervalID);
      console.log('Stop timer');
    }
  }, 1000);
}

function showTimer({ days, hours, minutes, seconds }) {
  refs.daysField.textContent = days;
  refs.hoursField.textContent = hours;
  refs.minutesField.textContent = minutes;
  refs.secondsField.textContent = seconds;
}

function pad(value) {
  return String(value).padStart(2, '0');
}

/*Для подсчета значений используй готовую функцию convertMs, где ms - разница между конечной и текущей датой в миллисекундах.*/
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

// setTimeout(() => {
//   const dateAfter = new Date();
//   console.log('dateAfter: ', dateAfter);
//   const range = dateAfter - nowDate;
//   console.log('range: ', range);
//   console.log('converted: ', convertMs(range));
// }, 10000);

// function toLog(selectedDate) {
//   console.log('LOG: ', selectedDate);
// }
