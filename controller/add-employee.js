const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const addEmployee = async (req, res) => {
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
};

module.exports = {
    addEmployee,
};