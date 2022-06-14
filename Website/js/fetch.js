const url = 'https://kruisboogsport.eu/api/';

// fetch(urlN + 'test/')
//   .then(res => {
//     console.log(res.ok) // true
//     console.log(res.status) // 200
//     return res.json()
//   })

// fetch(url + 'createUser', {
//   method: 'POST',
//   mode: 'cors',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     name: "reqTestName",
//     email: "testEmail",
//     password: "TestPW"
//   })
// }).then(res => {
//   return res.json();
// })
// .then(data => console.log(data))
// .catch(error => console.log(error))

let request = {};
request.name = "testName";
request.password = "myPassword";
request.email = "myEmail";

fetch(url + 'createUser', {
  method: 'POST',
  headers: {
    // Accept: 'application.json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({name: "testName", password: "myPassword", email: "myEmail"}),
  cache: 'default'
})
  .then(response => response.json())
  .then(data => console.log(data));