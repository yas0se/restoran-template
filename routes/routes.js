const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const multer = require('multer');
const newsletterController = require('../controller/mail')

router.get("/add_employees", (req, res) => {
    res.render('add_employees', { title: 'add employees' });
});
router.get("/add_meal", (req, res) => {
    res.render('add_meal', { title: 'add meal' });
});



const upload = multer({ dest: 'uploads/' });

router.post('/add-employee', upload.single('image'), async (req, res) => {
    try {
        const { name, restaurant } = req.body;
        const image = req.file.filename; // Nom du fichier image téléchargé

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

router.get('/', async (req, res) => {
    try {
        const categoriesWithMeals = await prisma.category.findMany({
            include: {
                meals: true
            }
        });


        const chefs = await prisma.employees.findMany();
        res.render('index', { categoriesWithMeals, chefs });
    } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
        res.status(500).send('Erreur serveur');
    }
});
router.get("/about", async (req, res) => {
    try {
        const chefs = await prisma.employees.findMany();

        res.render('about', { title: 'About', chefs });
    } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
        res.status(500).send('Erreur serveur');
    }});
router.get("/contact", (req, res) => {
    res.render('contact', { title: 'Contact' });
});

// router.post('/signup', (req, res) => {
//     // Configurer les options de l'e-mail
//     var mailOptions = {
//         from: 'apprenant3@talents4startups.com',
//         to: 'mestaouiyasser0@gmail.com', 
//         subject: 'New Signup',
//         text: 'A new user signed up!'
//     };

//     // Envoyer l'e-mail
//     transporter.sendMail(mailOptions, function (error, info) {
//         if (error) {
//             console.log(error);
//             res.status(500).send('Failed to send email');
//         } else {
//             console.log('Email sent: ' + info.response);
//             res.send('Email sent successfully');
//         }
//     });
// });

router.post('/newsletters', newsletterController.create);


module.exports = router;