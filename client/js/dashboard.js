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

  console.log(token);
};

// async function checkAuth() {
//   const token = localStorage.getItem('token');

//   if (!token) {
//     // Перенаправлення, якщо токену немає
//     window.location.href = '/index.html';
//     return;
//   }

//   try {
//     const res = await axios.get('http://localhost:8888/api/dashboard', {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     console.log('Authorized ✅', res.data);

//     // Тут можеш показати дані на сторінці
//     document.querySelector(
//       '#welcome'
//     ).textContent = `Welcome, ${res.data.userId}`;
//   } catch (err) {
//     console.error('Unauthorized ❌', err);
//     window.location.href = '/index.html';
//   }
// }

checkAuth();
