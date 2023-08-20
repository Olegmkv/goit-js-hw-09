// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

let dateEnd;
let timerId;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        const dateNow = new Date();
        if (selectedDates[0] <= dateNow) {
            window.alert("Please choose a date in the future");
            refs.start.disabled = true;
            return;
        }
        refs.start.disabled = false;
        dateEnd = selectedDates[0];
  },
};

const refs = {
    input: document.querySelector("input#datetime-picker"),
    start: document.querySelector('button[data-start]'),
    days: document.querySelector('span[data-days]'), 
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds]'),
}

refs.start.disabled = true;

refs.start.addEventListener("click", onClickStart);

// виклик бібліотеки для обрання часу зупинки таймеру
flatpickr(refs.input, options);

// запуск відліку часу обраного інтервалу
function onClickStart(evt) {
    refs.start.disabled = true;
    refs.input.disabled = true;
    timerId = setInterval(calculateTime, 1000);
}

//вивід відліку таймеру, зупинка його
function calculateTime() {
    const dateStart = new Date();
    const timeOver = dateEnd - dateStart;
    if (timeOver <= 0) {
        clearInterval(timerId);
        return;
    }
    const timeObj = convertMs(timeOver);
    refs.days.textContent = addLeadingZero(timeObj.days);
    refs.hours.textContent = addLeadingZero(timeObj.hours);
    refs.minutes.textContent = addLeadingZero(timeObj.minutes);
    refs.seconds.textContent = addLeadingZero(timeObj.seconds);    
}

// заповнення ведучими нулями
function addLeadingZero(value) {
    const textValue = String(value);
    return textValue.padStart(2, "0");  
};

// перевод мілісекунд в дні, години, хвилини, секунди
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
