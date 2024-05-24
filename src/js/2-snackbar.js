document.querySelector('.form').addEventListener('submit', function (event) {
  event.preventDefault();

  const delay = Number(this.delay.value);
  const state = this.state.value;

  // Видалення попередніх повідомлень перед створенням нових
  iziToast.destroy();

  createPromise(delay, state)
    .then(result => {
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${result}ms`,
      });
    })
    .catch(error => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${error}ms`,
      });
    })
    .finally(() => {
      // Очищення полів форми
      this.reset();
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
