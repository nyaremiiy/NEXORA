const checkAuth = async () => {
  const token = localStorage.getItem('token');

  if (!token) {
    window.location.href = '/index.html';
    return;
  }

  try {
    await axios.get('http://localhost:8888/api/dashboard', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log('Помилка', error);
  }
};

checkAuth();
