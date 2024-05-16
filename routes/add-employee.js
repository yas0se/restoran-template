const express = require('express');
const router = express.Router();
const employeeController = require('../controller/add-employee');
const multer = require('multer');


router.get("/", (req, res) => {
    res.render('add_employees', { title: 'add employees' });
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
router.post("/", upload.single('image'), employeeController.addEmployee);


module.exports = router;