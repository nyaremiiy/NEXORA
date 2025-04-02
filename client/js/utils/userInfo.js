const userLocalStorage = JSON.parse(localStorage.getItem('user'));

export function getUserName() {
  return userLocalStorage.username;
}
export function getEmail() {
  return userLocalStorage.email;
}
