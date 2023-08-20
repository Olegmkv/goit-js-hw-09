const refs = {
  form: document.querySelector(".form"),
};

refs.form.addEventListener("submit", onSubmitForm);

//формування пакету промісів
function onSubmitForm(evt) {
  evt.preventDefault();
  let delay = Number(evt.currentTarget.elements.delay.value);
  const step = Number(evt.currentTarget.elements.step.value);
  const amount = Number(evt.currentTarget.elements.amount.value);

  for (let position = 1; position <= amount; position += 1){
    createPromise(position, delay);
    delay += step;
   }
}

//cтворення і оброка одного промісу
function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {

    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve ({ position, delay });
      } else {
        reject ({ position, delay });
      }
    }, delay);
  });

  promise.then(({ position, delay }) => {
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  });
};
