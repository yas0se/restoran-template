const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const nodemailer = require('nodemailer');


const newsletterController = {

    create: async (req, res) => {
    const { email } = req.body;
    try {
      const newsletter = await prisma.newsletter.create({
        data: { 
            newsletter_email: email,
         },
      });
      console.log(newsletter.newsletter_email);

      const transporter = nodemailer.createTransport({
        host: "smtp.zoho.com",
        port: 465,
        secure: true, 
        auth: {
          user: "apprenant3@talents4starups.com",
          pass: "c2ddvc-A",
        },
      });
      const mailOptions = {
        from: "apprenant3@talents4starups.com",
        to: newsletter.newsletter_email,
        subject: "Découvrez les dernières nouveautés de notre restaurant !",
        text: "mehna bik 3andna 🎂",
      }
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log(error);
        } else {
        console.log('Email sent: ' + info.response);
        }
        });
        

    //   await transporter.sendMail({
    //     from: "apprenant3@talents4starups.com",
    //     to: newsletter.email,
    //     subject: "Sending Email using Node.js",
    //     text: "That was easy!",
    //   });
console.log("1");

      res.redirect('/');
    } catch (error) {
      console.error("Error creating newsletter:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },


};

module.exports = newsletterController;

