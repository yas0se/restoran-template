const express = require('express');
const router = express.Router();

router.get("/add_employees", (req,res) => {
    res.render('add_employees', { title: 'add employees'});
});
router.get("/add_meal", (req,res) => {
    res.render('add_meal', { title: 'add meal'});
});
router.get("/", (req,res) => {
    res.render('index', { title: 'home page'});
});
module.exports = router;