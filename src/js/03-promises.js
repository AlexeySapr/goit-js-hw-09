import { Notify } from 'notiflix/build/notiflix-notify-aio';

let firstDelay = 1000;
let delayStep = 500;
let amount = 3;

const intID = setInterval(() => {
  console.log('firstDelay: ', firstDelay);
  firstDelay += delayStep;
  amount -= 1;
  if (amount === 0) {
    clearInterval(intID);
  }
}, firstDelay);

// // //генератор промисов
// function createPromise(position, delay) {
//   const shouldResolve = Math.random() > 0.3;

//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (shouldResolve) {
//         resolve({ position, delay });
//       } else {
//         reject({ position, delay });
//       }
//     }, delay);
//   });
// }

// // //вызов генератора
// createPromise(2, 1500)
//   .then(({ position, delay }) => {
//     console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//   });
