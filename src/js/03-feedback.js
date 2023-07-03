import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const messageInput = document.querySelector('textarea[name="message"]');
const emailInput = document.querySelector('input[name="email"]');

// Зберігаємо дані у локадьне сховище
const saveFormState = () => {
  const formState = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(formState));
};

// Заповнюємо поля форми з локального сховища
const loadFormState = () => {
  const formState = JSON.parse(localStorage.getItem('feedback-form-state'));
  if (formState) {
    emailInput.value = formState.email;
    messageInput.value = formState.message;
  }
};

// Обробка сабміту форми
const handleSubmit = event => {
  event.preventDefault();
  const formState = {
    email: emailInput.value,
    message: messageInput.value,
  };
  console.log(formState);
  // Очищення локального сховища після сабміту
  localStorage.removeItem('feedback-form-state');
  emailInput.value = '';
  messageInput.value = '';
};

// Додаємо обробник для події input з використанням throttle
const throttledSaveFormState = throttle(saveFormState, 500);
emailInput.addEventListener('input', throttledSaveFormState);
messageInput.addEventListener('input', throttledSaveFormState);

// Заповнюємо поля після релоаду, якщо не було сабміту
window.addEventListener('load', loadFormState);

// Додаємо обробник для сабміту форми
form.addEventListener('submit', handleSubmit);
