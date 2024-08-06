const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const USERS = [
    { username: 'admin', password: '$2a$10$abcdefghijklmnopqrstuv' } // hash of 'password'
];

app.get('/upload', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/upload.html'));
});

app.post('/upload', upload.single('file'), (req, res) => {
    const { username, password } = req.body;
    const user = USERS.find(u => u.username === username);
    if (user && bcrypt.compareSync(password, user.password)) {
        // Save the uploaded file
        const tempPath = req.file.path;
        const targetPath = path.join(__dirname, 'public', req.file.originalname);

        fs.rename(tempPath, targetPath, err => {
            if (err) return res.status(500).send('File upload failed');
            res.send('File uploaded successfully');
        });
    } else {
        res.status(401).send('Unauthorized');
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
