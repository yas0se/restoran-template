require('dotenv').config();

const express = require('express');
const app = express();
const session = require('express-session');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const PORT = process.env.PORT || 3003;

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

//ejs
app.set("view engine","ejs");

//route prefix
app.use("", require("./routes/routes"));

app.listen(PORT, () => {
    console.log(` server started at http://localhost:${PORT}`);
});

