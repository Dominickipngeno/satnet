const express = require('express');
const nodemailer = require("nodemailer");
const router = express.Router();


router.get('/', (req, res)=>{
    res.render ("index",{tittle: 'Satnetwork-Home'}) 
})
router.get('/products', (req, res)=>{
    res.render ("products",{tittle: 'Satnetwork-Products and services',layout: 'products'}) 
})
router.get('/projects', (req, res)=>{
    res.render ("projects",{tittle: 'Satnetwork-Completed Projects',layout: 'projects'}) 
})
router.get('/about', (req, res)=>{
    res.render ("about",{tittle: 'Satnetwork-About Us',layout: 'about'}) 
})
router.get('/contact', (req, res)=>{
    res.render ("contact",{tittle: 'Satnetwork-Contact Us',layout: 'contact'}) 
})
router.post('/send', async (req, res)=>{
   //const output = '<p> You have a new Message </p> <h3> Details</h3><li> Name: ${req.body.name} </li> <li> Email: ${req.body.email}</li> <li> Subject: ${req.body.subject}</li><h3> <h3> Message: </h3><p>${req.body.message}</p> ';
    // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "mail.satnetworksafricaenterprise.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_ID, 
      pass: process.env.PASSWORD
    },
    tls:{
        rejectUnauthorized: false

    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Satnetwork Client👻" <operations@satnetworksafricaenterprise.com>', // sender address
    to: process.env.EMAIL_ID, // list of receivers
    subject: "Satnetwork Africa ", // Subject line
    html: `You got new message from':<br>
    Email : ${req.body.email}<br>
    Name: ${req.body.name}<br>
    Subject: ${req.body.subject}<br>
    Message: ${req.body.message} <br>`, // html body
  }); 

  console.log("Message sent: %s");
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
 // Preview only available when sending through an Ethereal account
 console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
 // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
 req.flash('success_msg', 'Email Sent Successfully')
 res.redirect('/contact')
 

})

module.exports = router