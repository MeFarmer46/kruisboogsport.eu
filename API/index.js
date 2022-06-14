require('dotenv').config();
const fs = require('fs');
const https = require('https');

//Setting variables
const expireTime = '6h';

// Json web token
const jwt = require('jsonwebtoken');

// Initialising the SQL connection
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

// Random functions
function fullDate() {
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    return year + "-" + month + "-" + date;
}

function logActivity(activity, type='s') {
    switch (type) {
        case 'p':
            // Part messages
            console.log('\x1b[34m%s\x1b[0m', activity);
            break;
        case 'u':
            // User messages
            console.log('\x1b[36m%s\x1b[0m', activity);
            break;
        case 'sh':
            // Shot messages
            console.log('\x1b[35m%s\x1b[0m', activity);
            break;
        case 'l':
            // List messages
            console.log('\x1b[33m%s\x1b[0m', activity);
            break;
        case 's':
            // Server messages
            console.log('\x1b[32m%s\x1b[0m', activity);
            break;
    }
}

function makeCode(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

function colorLog(text, color='green', background='magenta') {
    const textColors = [];
    const backgroundColors = [];
    textColors['black'] = '\x1b[30m';
    textColors['red'] = '\x1b[31m';
    textColors['green'] = '\x1b[32m';
    textColors['yellow'] = '\x1b[33m';
    textColors['blue'] = '\x1b[34m';
    textColors['magenta'] = '\x1b[35m';
    textColors['cyan'] = '\x1b[36m';
    textColors['white'] = '\x1b[37m';

    backgroundColors['black'] = '\x1b[40m';
    backgroundColors['red'] = '\x1b[41m';
    backgroundColors['green'] = '\x1b[42m';
    backgroundColors['yellow'] = '\x1b[43m';
    backgroundColors['blue'] = '\x1b[44m';
    backgroundColors['magenta'] = '\x1b[45m';
    backgroundColors['cyan'] = '\x1b[46m';
    backgroundColors['white'] = '\x1b[47m';

    const arg1 = textColors[color] + backgroundColors[background] + '%s\x1b[0m';
    console.log(arg1, text);
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader;
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=> {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

// Initialising the express api server
const express = require('express');
const req = require('express/lib/request');
const app = express();
const PORT = 8080;

const cors = require('cors');
app.use(express.json());

app.listen(
    PORT,
    () => { logActivity(`Server running on ${PORT}`); }
);

// api requests for userdata

app.get('/api/test/', (req, res) => {
    console.log('Het werkt...');

    res.send({
        message: `Het werkt!`,
    });
});

app.post('/api/createUser/', cors(), (req, res) => {
    const {name, email, password} = req.body;
    
    if (!name) {
        res.status(418).send({success: false, message: 'Vul een naam in.'});
        return;
    }
    else if (!email) {
        res.status(418).send({success: false, message: 'Vul een email adres in.'});
        return;
    }
    else if (!password) {
        res.status(418).send({success: false, message: 'Vul een wachtwoord in.'});
        return;
    }

    connection.query({
        sql: 'INSERT INTO `user` (`name`, `email`, `password`, `mailVerf`, `dateCreated`) VALUES (?, ?, ?, 0, ?);',
        timeout: 10000,
        values: [name, email, password, fullDate()]
    });

    connection.query({
        sql: 'SELECT * FROM `user` WHERE `name` = ? and `email`=?',
        timeout: 40000,
        values: [name, email]
      }, function (error, results, fields) {
        if (error) throw error;
        let currentID = results[0].userID;
        logActivity('New user created on ' + fullDate() + ' with id: ' + currentID, 'u');

        connection.query({
            sql: 'INSERT INTO `emailVerf` (`userID`, `email`, `code`) VALUES (?, ?, ?);',
            timeout: 10000,
            values: [currentID, email, makeCode(8)]
        });

        res.send({
            message: `You created an account with the username ${name}, the email adress ${email} and the password ${password}.`,
            userID: currentID,
            name: name,
            email: email
        });
      });
});

app.put('/api/verifyEmail/', (req, res) => {
    const {userID, email, code} = req.body;
    
    connection.query({
        sql: 'SELECT * FROM `emailVerf` WHERE `email`=?',
        timeout: 10000,
        values: [email]
    }, function (error, results, fields) {
        if (error) throw error;
        logActivity('Gebruiker heeft geprobeerd email te verifiëren.', 'u');
        
        if (results[0] ==  undefined || code != results[0].code) {
            res.status(418).send({
                success: false,
                message: "Code of email klopt niet."
            });
            return;
        }
        else {
            connection.query({
                sql: 'UPDATE `user` SET `emailVerf`=1 WHERE `userID=?',
                timeout: 10000,
                values: [userID]
            });
            connection.query({
                sql: 'DELETE FROM `emailVerf` WHERE `userID`=?',
                timeout: 10000,
                values: [userID]
            });
            return;
        }
    });
});

//Momenteel nog niet nodig
// app.post('/api/alterUserData/:id', (req, res) => {

// });

// app.post('/api/deleteUser/:id', (req, res) => {

// });




//api requests for shots
/**
 * Add shot should add a shot to all registered parts
 */
app.post('/api/addShot/', authenticateToken, (req, res) => {
    const {score, distance, list, x, y} = req.body;
    const date = fullDate();

    logActivity('Gebruiker heeft geprobeerd een schot te registreren.', 'sh');

    let userID;
    jwt.verify(req.headers['authorization'], process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) throw err;
        userID = user.userID;
    });

    colorLog(userID);

    connection.query({
        sql: 'INSERT INTO `shots` (`score`, `distance`, `round`, `x`, `y`, `date`, `userID`) VALUES (?, ?, ?, ?, ?, ?, ?)',
        timeout: 10000,
        values: [score, distance, list, x, y, date, userID]
    });

    res.status(200);
});

app.delete('/api/deleteShot/', authenticateToken, (req, res) => {
    const {shotID} = req.body;
    let userID;

    logActivity('Gebruiker heeft geprobeerd een schot te verwijderen.', 'sh');

    jwt.verify(req.headers['authorization'], process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) throw err;
        userID = user.userID;
    });

    connection.query({
        sql: 'DELETE FROM `shots` WHERE `userID`=? and `shotID`=?',
        timeout: 10000,
        values: [shotID, userID]
    });
});


//api requests for lists
app.post('/api/addList/', authenticateToken, (req, res) => {
    const {distance} = req.body;
    let userID;
    jwt.verify(req.headers['authorization'], process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) throw err;
        userID = user.userID;
    });
    const date = fullDate();

    connection.query({
        sql: 'INSERT INTO `rounds` (`distance`, `date`, `user`) VALUES (?, ?, ?)',
        timeout: 10000,
        values: [distance, date, userID]
    });

    res.status(200);
    logActivity('Gebruiker heeft geprobeerd een nieuwe lijst/ronde te maken.', 'l');
});

app.delete('/api/deleteList/', authenticateToken, (req, res) => {
    const {listID} = req.body;
    let userID;
    jwt.verify(req.headers['authorization'], process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) throw err;
        userID = user.userID;
    });

    connection.query({
        sql: 'DELETE FROM `rounds` WHERE `user`=? and `roundID`=?',
        timeout: 10000,
        values: [userID, listID]
    });

    res.status(200);
    logActivity('Gebruiker heeft geprobeerd een lijst te verwijderen.', 'l');
});

app.put('/api/addShotToList/', authenticateToken, (req, res) => {
    const {shotID, listID} = req.body;
    let userID;
    jwt.verify(req.headers['authorization'], process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) throw err;
        userID = user.userID;
    });

    connection.query({
        sql: 'UPDATE `shots` SET `round`=? WHERE `shotID`=? and `userID`=?',
        timeout: 10000,
        values: [listID, shotID, userID]
    });

    res.status(200);
    logActivity('Gebruiker heeft geprobeerd een schot aan een lijst toe te voegen.', 'l');
});


// api requests for parts
app.post('/api/addPart/', authenticateToken, (req, res) => {
    const {name} = req.body;

    let userID;
    jwt.verify(req.headers['authorization'], process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) throw err;
        userID = user.userID;
    });

    connection.query({
        sql: 'INSERT INTO `parts` (`name`, `shotCount`, `user`) VALUES (?, ?, ?)',
        timeout: 10000,
        values: [name, 0, userID]
    });

    res.status(200);
    logActivity('Gebruiker heeft geprobeerd een nieuw onderdeel aan te maken.', 'p');
});

app.put('/api/addShotsToPart/', authenticateToken, (req, res) => {
    const {partID, amount} = req.body;

    let userID;
    jwt.verify(req.headers['authorization'], process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) throw err;
        userID = user.userID;
    });

    connection.query({
        sql: 'SELECT * FROM `parts` WHERE `partID`=? and `user`=?',
        timeout: 10000,
        values: [partID, userID]
    }, function(error, results, fields) {
        if (error) throw error;
        if (results[0] == undefined) return res.status(418);
        const newShotsCount = results[0].shotCount + amount;
        connection.query({
            sql: 'UPDATE `parts` SET `shotCount`=? WHERE `partID`=? and `user`=?',
            timeout: 10000,
            values: [newShotsCount, partID, userID]
        });
    });

    logActivity('Gebruiker heeft geprobeerd schoten toe te voegen aan de onderdelen.', 'p');
});

app.delete('/api/deletePart/', authenticateToken, (req, res) => {
    const {partID} = req.body;

    let userID;
    jwt.verify(req.headers['authorization'], process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) throw err;
        userID = user.userID;
    });

    connection.query({
        sql: 'DELETE FROM `parts` WHERE `partID`=? and `user`=?',
        timeout: 10000,
        values: [partID, userID]
    });

    logActivity('Gebruiker heeft geprobeerd een onderdeel te verwijderen.', 'p');
});

app.put('/api/resetPart/', authenticateToken, (req, res) => {
    const {partID} = req.body;

    let userID;
    jwt.verify(req.headers['authorization'], process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) throw err;
        userID = user.userID;
    });

    connection.query({
        sql: 'UPDATE `parts` SET `shotCount`=? WHERE `partID`=? and `user`=?',
        timeout: 10000,
        values: [0, partID, userID]
    });

    logActivity('Gebruiker heeft geprobeerd een onderdeel te resetten.', 'p');
});




// Auth server parts!
app.post('/api/token', (req, res) => {
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

app.delete('/api/logout', (req, res) => {
//   refreshTokens = refreshTokens.filter(token => token !== req.body.token)

  connection.query({
    sql: 'DELETE FROM `refreshTokens` WHERE code=?',
    timeout: 10000,
    values: [req.body.token]
    });
  res.sendStatus(204);

  logActivity('User logged out.');
});

app.post('/api/login', (req, res) => {
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