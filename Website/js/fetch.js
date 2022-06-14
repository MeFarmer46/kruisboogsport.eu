const urlN = 'http://kruisboogsport.eu:8080/'; //Url for normal API server
const urlA = 'http://kruisboogsport.eu:8081/'; //Url for auth server
const url = 'http://kruisboogsport.eu';

// fetch(urlN + 'test/')
//   .then(res => {
//     console.log(res.ok) // true
//     console.log(res.status) // 200
//     return res.json()
//   })

fetch(urlN + 'createUser', {
  method: 'POST',
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json',
    "Access-Control-Allow-Headers" : "Content-Type",
    "Access-Control-Allow-Origin": url,
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
  },
  body: JSON.stringify({
    name: "reqTestName",
    email: "testEmail",
    password: "TestPW"
  })
}).then(res => {
  return res.json();
})
.then(data => console.log(data))
.catch(error => console.log(error))