const registerForm = document.getElementById('registerForm');
const passwordINP = document.getElementById('password');
const emailINP = document.getElementById('email');
const usernameINP = document.getElementById('username');

const url = 'https://kruisboogsport.eu/api/';

registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let body = {};
    body.email = emailINP.value;
    body.password = passwordINP.value;
    body.name = usernameINP.value;

    console.log(body);
    fetch(url + 'createUser', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
      cache: 'default'
    })
      .then(response => response.json())
      .then(data => console.log(data));
});