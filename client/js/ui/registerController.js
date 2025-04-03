import { registerUser } from '../features/auth/authService.js';
import {
  MESSAGE_ERROR_FOR_REGISTER_FORM,
  REGISTER_FORM,
} from '../constants/dom/modal/authModal/authModalDomElements.js';
import { CLASS_FORM_MESSAGE_ERROR_VISIBLE } from '../constants/classNames.js';

REGISTER_FORM.addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = REGISTER_FORM.username.value;
  const email = REGISTER_FORM.email.value;
  const password = REGISTER_FORM.password.value;

  MESSAGE_ERROR_FOR_REGISTER_FORM.classList.remove(
    CLASS_FORM_MESSAGE_ERROR_VISIBLE
  );

  try {
    const data = await registerUser(username, email, password);

    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      window.location.href = '/dashboard.html';
    } else {
      console.log(data);
    }
  } catch (err) {
    MESSAGE_ERROR_FOR_REGISTER_FORM.classList.add(
      CLASS_FORM_MESSAGE_ERROR_VISIBLE
    );
  }
});
