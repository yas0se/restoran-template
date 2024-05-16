const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const load = async (req, res) => {
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
};

module.exports = {
    load,
};