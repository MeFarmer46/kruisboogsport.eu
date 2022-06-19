const loginForm = document.getElementById('loginForm');
const passwordINP = document.getElementById('password');
const emailINP = document.getElementById('email');

// const url = 'https://kruisboogsport.eu/api/';

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let body = {};
  body.email = emailINP.value;
  body.password = passwordINP.value;

  fetch(url + 'login', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body),
    cache: 'default'
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (data.success == false) {
        document.getElementById('errormsg').innerHTML = 'Wachtwoord of emailadres klopt niet.';
      }

      const accessToken = data.accessToken;
      const refreshToken = data.refreshToken;
      const name = data.name;
      const email = data.email;
      const timestamp = Date.now();

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('name', name);
      localStorage.setItem('email', email);
      localStorage.setItem('lastRefreshTime', Math.floor(timestamp / 1000 / 60 / 60));

      window.location.href = './pHome.php';
    });
});