import { loginUser } from '../features/auth/authService.js';
import {
  LOGIN_FORM,
  MESSAGE_ERROR_FOR_LOGIN_FORM,
  INPUTS_LOGIN_FORM,
} from '../constants/dom/modal/authModal/authModalDomElements.js';
import {
  CLASS_INPUT_ERROR,
  CLASS_FORM_MESSAGE_ERROR_VISIBLE,
} from '../constants/classNames.js';

LOGIN_FORM.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = LOGIN_FORM.email.value;
  const password = LOGIN_FORM.password.value;

  MESSAGE_ERROR_FOR_LOGIN_FORM.classList.remove(
    CLASS_FORM_MESSAGE_ERROR_VISIBLE
  );

  INPUTS_LOGIN_FORM.forEach((input) => {
    input.classList.remove(CLASS_INPUT_ERROR);
  });

  try {
    const data = await loginUser(email, password);

    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      window.location.href = '/dashboard.html';
    } else {
      console.log(data);
    }
  } catch (err) {
    MESSAGE_ERROR_FOR_LOGIN_FORM.classList.add(
      CLASS_FORM_MESSAGE_ERROR_VISIBLE
    );

    INPUTS_LOGIN_FORM.forEach((input) => {
      input.classList.add(CLASS_INPUT_ERROR);
    });
  }
});
