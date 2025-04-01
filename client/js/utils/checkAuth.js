export const checkAuth = async (path) => {
  const token = localStorage.getItem('token');

  if (!token) {
    window.location.href = '/index.html';
    return;
  }

  try {
    await axios.get(path, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log('Помилка', error);
    window.location.href = '/index.html';
  }
};
