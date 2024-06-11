// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/registrationDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB', err);
});

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
});

const User = mongoose.model('User', userSchema);

app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    const newUser = new User({
        username,
        email,
        password,
    });

    newUser.save()
        .then(() => res.status(201).send('User registered'))
        .catch(err => res.status(400).send('Error: ' + err));
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
