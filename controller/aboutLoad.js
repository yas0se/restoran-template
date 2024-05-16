const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const aboutLoad = async (req, res) => {
    try {
        const chefs = await prisma.employees.findMany();

        res.render('about', { title: 'About', chefs });
    } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
        res.status(500).send('Erreur serveur');
    }
};

module.exports = {
    aboutLoad,
};