require('dotenv').config();

const express = require('express');
const app = express();
const session = require('express-session');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3003;
const logger = require('./controller/log');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine","ejs");
app.use(express.static('public'));

const aboutRoute = require('./routes/about');
const loadRoute = require('./routes/load');
const addMealRoute = require('./routes/add_meal');
const contactRoute = require('./routes/contact');
const employeeRoute = require('./routes/add-employee');

app.use('/about', aboutRoute);
app.use('/', loadRoute);
app.use('/add_meal', addMealRoute);
app.use('/add_employees', employeeRoute);
app.use('/contact', contactRoute);


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

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
app.use("", require("./routes/routes"));
app.get('/uploads/:filename', (req, res) => {
    const fileName = req.params.filename;
    const filePath = path.join(__dirname, 'uploads', fileName); 

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