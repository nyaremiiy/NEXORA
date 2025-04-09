import {
  CLASS_AVATAR_ARROW_ACTIVE,
  CLASS_AVATAR_SETTINGS_ACTIVE,
} from '../constants/classes/userAvatarClasses.js';
import {
  AVATAR_USER,
  AVATAR_ARROW,
  AVATAR_SETTINGS,
  AVATAR_SETTINGS_ITEMS,
} from '../constants/dom/userAvatar/avatarDomElements.js';

AVATAR_USER.addEventListener('click', () => {
  toggleAvatarSettings();
});

AVATAR_SETTINGS_ITEMS.addEventListener('click', () => {
  hideAvatarSettings();
});

AVATAR_SETTINGS.addEventListener('mouseleave', () => {
  hideAvatarSettings();
});

function hideAvatarSettings() {
  AVATAR_ARROW.classList.remove(CLASS_AVATAR_ARROW_ACTIVE);
  AVATAR_SETTINGS.classList.remove(CLASS_AVATAR_SETTINGS_ACTIVE);
}
function toggleAvatarSettings() {
  AVATAR_ARROW.classList.toggle(CLASS_AVATAR_ARROW_ACTIVE);
  AVATAR_SETTINGS.classList.toggle(CLASS_AVATAR_SETTINGS_ACTIVE);
}

const user = JSON.parse(localStorage.getItem('user'));
if (user?.username) {
  AVATAR_USER.textContent = user.username[0].toUpperCase() || 'N';
}
