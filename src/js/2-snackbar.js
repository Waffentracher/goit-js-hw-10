document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed');

  document.querySelector('.form').addEventListener('submit', function (event) {
    event.preventDefault();

    const delay = Number(event.target.delay.value);
    const state = event.target.state.value;

    console.log('Form submitted');
    console.log('Delay:', delay);
    console.log('State:', state);

    iziToast.destroy();

    createPromise(delay, state)
      .then(result => {
        console.log('Promise fulfilled:', result);
        iziToast.success({
          title: 'Success',
          message: `✅ Fulfilled promise in ${result}ms`,
        });
      })
      .catch(error => {
        console.log('Promise rejected:', error);
        iziToast.error({
          title: 'Error',
          message: `❌ Rejected promise in ${error}ms`,
        });
      })
      .finally(() => {
        event.target.reset();
        console.log('Form reset');
      });
  });

  // Додати тестове повідомлення iziToast при завантаженні сторінки
  iziToast.success({
    title: 'Test',
    message: 'This is a test message!',
  });
});

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
