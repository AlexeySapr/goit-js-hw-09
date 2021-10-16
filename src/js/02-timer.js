import flatpickr from 'flatpickr';
// import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/dark.css';

//ссылка на поле ввода даты
const inputArea = document.querySelector('#datetime-picker');

// let selectedDate = null;
// const currentDate = Date.now();

// function compareDates(currentDate, selectedDate) {}

//объект опций для конструктора flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log('from metod: ', selectedDates[0]);
    // selectedDate = selectedDates[0];
    // toLog(selectedDate);
    const difference = selectedDates[0] - options.defaultDate;
    console.log('defaultDate: ', difference);
    console.log('converted: ', convertMs(difference));
  },
};

//инициализация flatpickr
flatpickr(inputArea, options);

/*Для подсчета значений используй готовую функцию convertMs, где ms - разница между конечной и текущей датой в миллисекундах.*/
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
