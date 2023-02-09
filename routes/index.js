const express = require('express');
const nodemailer = require("nodemailer");
const router = express.Router();


router.get('/', (req, res)=>{
    res.render ("index",{tittle: 'Satnetwork Home page'}) 
})
router.get('/products', (req, res)=>{
    res.render ("products",{tittle: 'Satnetwork Products and'}) 
})
router.get('/about', (req, res)=>{
    res.render ("about",{tittle: 'Satnetwork- About Us'}) 
})
router.get('/contact', (req, res)=>{
    res.render ("contact",{tittle: 'Satnetwork- Contact Us'}) 
})
router.post('/send', async (req, res)=>{
   const output = '<p> You have a new Message </p> <h3> Details</h3><li> Name: ${req.body.name} </li> <li> Email: ${req.body.email}</li> <li> Subject: ${req.body.subject}</li><h3> <h3> Message: </h3><p>${req.body.message}</p> ';
    // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'kipdomin@gmail.com', // generated ethereal user
      pass: 'mokaeageaaakuuts', // generated ethereal password
    },
    tls:{
        rejectUnauthorized: false

    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <kipdomin@gmail.com>', // sender address
    to: "kipngeno4059@gmail.com", // list of receivers
    subject: "Satnetwork Africa", // Subject line
    text: "Hello world?", // plain text body
    html: output // html body
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