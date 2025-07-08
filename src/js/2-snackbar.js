
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';


const form = document.querySelector('.form');
function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay); 
      } else {
        reject(delay);
      }
    }, delay);
  });
}

form.addEventListener('submit', event => {
  event.preventDefault();
  const delayInput = form.elements.delay; 
  const stateInput = form.elements.state;
  const delay = Number(delayInput.value); 
  const state = stateInput.value; 
  form.reset(); 
  createPromise(delay, state)
    .then(result => {
      iziToast.success({
        message: `✅ Fulfilled promise in ${result}ms`,
        position: 'topRight',
        progressBar: false,
        icon: false, 
        close: false,
      });
    })
    .catch(error => {
      iziToast.error({
        message: `❌ Rejected promise in ${error}ms`,
        position: 'topRight', 
        progressBar: false, 
        icon: false, 
        close: false,
      });
    });
});