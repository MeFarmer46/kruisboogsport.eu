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
