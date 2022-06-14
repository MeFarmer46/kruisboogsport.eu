//Importing required libraries
require('dotenv').config();
const jwt = require('jsonwebtoken');

const express = require('express');
const app = express();

//Setting variables
const expireTime = '6h';
const PORT = 8081;

//Starting server
app.use(express.json());
const cors = require('cors');
// app.use(cors({
//     origin: 'kruisboogsport.eu'
// }));
app.listen(
    PORT,
    () => { logActivity(`AuthServer running on ${PORT}`); }
);

//Starting mysql connection
const { createConnection } = require('mysql');
const connection = createConnection({
    timeout: 60000,
    host : 'localhost',
    user: 'DBACCESS',
    password: '6291bc50e892b6291bc567ff79',
    database: 'kruisboogsportMain',
    port: 3306
});
connection.connect();

function logActivity(activity, type='s') {
    switch (type) {
        case 'p':
            console.log('\x1b[34m%s\x1b[0m', activity);
            break;
        case 'u':
            console.log('\x1b[36m%s\x1b[0m', activity);
            break;
        case 'sh':
            console.log('\x1b[35m%s\x1b[0m', activity);
            break;
        case 'l':
            console.log('\x1b[33m%s\x1b[0m', activity);
            break;
        case 's':
            console.log('\x1b[32m%s\x1b[0m', activity);
            break;
    }
}


app.post('/token', (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);

  connection.query({
    sql: 'SELECT count(*) AS count FROM `refreshTokens` WHERE `code`=?',
    timeout: 10000,
    values: [refreshToken]
    }, function(error, results, fields) {
        if (results[0].count != 1) {
            res.sendStatus(403);
        }
    });

//   if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);


    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({ userID: user.userID, name: user.name, email: user.email });
    res.json({ accessToken: accessToken });
    });

    logActivity('New access token was created.');
})

app.delete('/logout', (req, res) => {
//   refreshTokens = refreshTokens.filter(token => token !== req.body.token)

  connection.query({
    sql: 'DELETE FROM `refreshTokens` WHERE code=?',
    timeout: 10000,
    values: [req.body.token]
    });
  res.sendStatus(204);

  logActivity('User logged out.');
});

app.post('/login', (req, res) => {
    const {email, password} = req.body;
    
    if (!email) {
        res.status(418).send({message: 'Vul een email adres in.'});
        return;
    }
    else if (!password) {
        res.status(418).send({message: 'Vul een wachtwoord in.'});
        return;
    }

    connection.query({
        sql: 'SELECT * FROM `user` WHERE `email`=?',
        timeout: 10000,
        values: [email]
    }, function (error, results, fields) {
        if (error) throw error;
        // logActivity('Gebruiker heeft geprobeerd in te loggen.', 'u');
        
        if (results[0] ==  undefined || password != results[0].password) {
            res.status(418).send({
                success: false,
                message: "Wachtwoord of email klopt niet."
            });
            return;
        }
        else {
            

            const user = { userID: results[0].userID, name: results[0].name, email: results[0].email };

            const accessToken = generateAccessToken(user);
            const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
            connection.query({
                sql: 'INSERT INTO `refreshTokens` (`code`) VALUES (?)',
                timeout: 10000,
                values: [refreshToken]
            });
            res.send({
                userID: results[0].userID,
                name: results[0].name,
                email: results[0].email,
                accessToken: accessToken,
                refreshToken: refreshToken
            });
            return;
        }
    });

    logActivity('User created refresh token. (Logged in.)');
});

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: expireTime })
}