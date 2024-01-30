// server.js

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

let userTrackingCodes = {};

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/register.html');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

app.post('/register', (req, res) => {
    const { email, website } = req.body;
    const trackingCode = generateTrackingCode();

    userTrackingCodes[email] = trackingCode;

    res.send(`Registration successful. Your tracking code is: ${trackingCode}`);
});

app.post('/login', (req, res) => {
    const { email } = req.body;
    const trackingCode = userTrackingCodes[email];

    if (trackingCode) {
        res.send(`Login successful. Your tracking code is: ${trackingCode}`);
    } else {
        res.send('User not found');
    }
});

function generateTrackingCode() {
    return Math.random().toString(36).substring(2, 15);
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
