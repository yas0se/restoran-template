const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const multer = require('multer');

router.get("/add_employees", (req, res) => {
    res.render('add_employees', { title: 'add employees' });
});
router.get("/add_meal", (req, res) => {
    res.render('add_meal', { title: 'add meal' });
});
router.get("/", (req, res) => {
    res.render('index', { title: 'home page' });
});

const upload = multer({ dest: 'uploads/' });

router.post('/add-employee', upload.single('image'), async (req, res) => {
    try {
        const { name, restaurant } = req.body;
        const image = req.file.filename; // Nom du fichier image téléchargé

        // Enregistrer les données de l'employé dans la base de données
        const newEmployee = await prisma.employees.create({
            data: {
                employee_name: name,
                employee_img: image,
                restaurant: {
                    connect: { restaurant_name: restaurant } // Connecter l'employé au restaurant par le nom du restaurant
                }
            }
        });

        res.status(200).send('Employee added successfully.');
    } catch (error) {
        console.error('Error adding employee:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/add-meal', upload.single('image'), async (req, res) => {
    try {
        const { name, description, price, category } = req.body;
        const meal_price = parseFloat(price);
        const image = req.file.filename; 
        const newMeal = await prisma.meal.create({
            data: {
                meal_name: name,
                meal_description: description,
                meal_price: meal_price,
                meal_img: image,
                category: {
                    connect: { category_name: category } 
                }
            }
        });

        res.status(200).send('Meal added successfully.');
    } catch (error) {
        console.error('Error adding Meal:', error);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;