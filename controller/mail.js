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
        host:process.env.SMTP_host ,
        port: 465,
        secure: true, 
        auth: {
          user: process.env.SMPT_user ,
          pass: process.env.SMPT_pass ,
        },
      });
      const mailOptions = {
        from: "apprenant3@talents4starups.com",
        to: newsletter.newsletter_email,
        subject: "Découvrez les dernières nouveautés de notre restaurant !",
        text: "merhba bik 3andna 🎂",
      }
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log(error);
        } else {
        console.log('Email sent: ' + info.response);
        }
        });
        
console.log("1");

      res.redirect('/');
    } catch (error) {
      console.error("Error creating newsletter:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },


};

module.exports = newsletterController;

