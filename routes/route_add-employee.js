const express = require('express');
const router = express.Router();
const multer = require('multer');

const employeeController = require('../controller/add-employee');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage });

router.post('/add-employee', upload.single('image'), employeeController.addEmployee);

module.exports = router;