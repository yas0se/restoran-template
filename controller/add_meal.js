const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const addMeal = async (req, res) => {
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
};

module.exports = {
    addMeal,
};