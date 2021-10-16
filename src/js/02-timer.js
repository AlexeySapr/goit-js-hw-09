import flatpickr from 'flatpickr';
// import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/dark.css';

//ссылка на поле ввода даты
const inputArea = document.querySelector('#datetime-picker');

//объект опций для конструктора flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

//инициализация flatpickr
flatpickr(inputArea, options);
