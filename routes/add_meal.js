const express = require('express');
const router = express.Router();
const mealController = require('../controller/add_meal');
const multer = require('multer');


router.get("/", (req, res) => {
    res.render('add_meal', { title: 'add meal' });
});
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage });
router.post("/", upload.single('image'), mealController.addMeal);


module.exports = router;