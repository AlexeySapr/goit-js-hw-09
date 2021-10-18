import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  formData: document.querySelector('.form'),
  inputDelay: document.querySelector('input[name="delay"]'),
  inputStep: document.querySelector('input[name="step"]'),
  inputAmount: document.querySelector('input[name="amount"]'),
};

const notifyOptions = {
  timeout: 5000,
  pauseOnHover: false,
};

//слушатель событий на форме
refs.formData.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  let firstDelay = refs.inputDelay.valueAsNumber;
  let delayStep = refs.inputStep.valueAsNumber;
  let amount = refs.inputAmount.valueAsNumber;

  let delay = firstDelay;
  for (let i = 1; i <= amount; ++i) {
    let position = i;
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`, notifyOptions);
        // console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay}ms`, notifyOptions);
        // console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += delayStep;
  }
}

//генератор промисов
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
