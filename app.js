
require('dotenv').config()
const express= require('express')
var expressLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser')
const nodemailer = require("nodemailer");
const flash = require('connect-flash')
const session = require('express-session')
const userRoutes = require('./routes/index')
const app = express()
const port = 3000


//set engine
app.set('view engine', 'ejs')
app.use(expressLayouts);
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.set("layout products", false);
app.set("layout about", false);
app.set("layout contact", false);
// Express session

app.use(session({
    secret: 'secret',
    resave:true,
    saveUninitialized: true
}))
//statics folders
app.use(express.static('public'))

app.use(flash())
//Global vars

app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg')
    next()
})
// call routes 
app.use('/', require('./routes/index'))
//setting port
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
  })