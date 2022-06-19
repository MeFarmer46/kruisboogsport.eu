function getToken(refreshToken) {
    let body = {};
    body.token = refreshToken;

    fetch(url + 'token', {
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
            localStorage.setItem('accessToken', data.accessToken);
        });
}

const url = 'https://kruisboogsport.eu/api/';

if (localStorage.getItem('refreshToken') != undefined) {
    const lastRefreshTime = localStorage.getItem('lastRefreshTime');
    const now = Math.floor(Date.now() / 1000 / 60 / 60);

    if ((now - lastRefreshTime) >= 5) {
        const refreshToken = localStorage.getItem('refreshToken');
        getToken(refreshToken);
    }

    const accessToken = localStorage.getItem('accessToken');
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');

    document.getElementById('loginDiv').innerHTML = `<a onclick="nameClick(0)" href="#">${name}</a>`;
}

function nameClick(clicks) {
    console.log('function working.');
    if (clicks == 0) {
        document.getElementById('loginDiv').innerHTML = `<a onclick="nameClick(1)" style="color:red;" href="#">Uitloggen</a>`;
        setTimeout(() => {
            const name = localStorage.getItem('name');
            document.getElementById('loginDiv').innerHTML = `<a onclick="nameClick(0)" href="#">${name}</a>`;
        }, 4000);
    }
    else if (clicks == 1) {
        localStorage.clear();
        window.location.href = './index.php';
    }
}