import { checkAuth } from './utils/checkAuth.js';

import { getUserName } from './utils/userInfo.js';

checkAuth('/dashboard');

const greetingUserName = document
  .querySelector('#greeting')
  .querySelector('.greeting__username');

greetingUserName.textContent = `${getUserName()}`;
