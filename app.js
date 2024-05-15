require('dotenv').config();

const express = require('express');
const app = express();
const session = require('express-session');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const PORT = process.env.PORT || 3003;

const log = require('./jjs/log');
const logger = require('./jjs/log');


//midlware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({
    secret: 'my secret key',
    saveUninitialized: true,
    resave: false,
}));
app.use((req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
});

// Middleware pour rendre les fichiers statiques dans le répertoire "public"
app.use(express.static('public'));
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));


//ejs
app.set("view engine","ejs");

//route prefix
app.use("", require("./routes/routes"));
app.get('/uploads/:filename', (req, res) => {
    const fileName = req.params.filename;
    const filePath = path.join(__dirname, 'uploads', fileName); // Assuming uploads directory is in the root of your project

    // Send the file
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error('Error sending file:', err);
            res.status(404).send('File not found');
        } 
    });
});

app.listen(PORT, () => {
    logger.info(` server started at http://localhost:${PORT}`);
});

