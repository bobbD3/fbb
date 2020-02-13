const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    flash = require('connect-flash'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    methodOverrried = require('method-override'),
    Blog = require('./modules/blogs'),
    User = require('./modules/user'),
    nodemailer = require('nodemailer'),
    port = process.env.PORT || 3000

const blogRoutes = require('./routes/blog'),
    authRoutes = require('./routes/auth')

    mongoose.connect(process.env.DATABASEURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })  .then(() => console.log('🔥  MongoDB Connected...'))
    .catch(err => console.log(err))

app.use(bodyParser.urlencoded({
    extended: true
}))
app.set('view engine', 'ejs')
app.use(express.static(__dirname + "/public"))
app.use(methodOverrried('_method'))
app.use(flash())

//Passport config
app.use(require("express-session")({
    secret: "....",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error")
    res.locals.success = req.flash("success")
    next();
});


app.use('/blog', blogRoutes);
app.use('/', authRoutes);


app.post('/send-email', (req,res) => {
    console.log(req.body) 
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            type: 'OAuth2',
            user: 'functionalbodiesbg@gmail.com',
            clientId: process.env.CLIENT_ID_HERE,
            clientSecret: process.env.CLIENT_SECRET_HERE,
            refreshToken: process.env.REFRESH_TOKEN_HERE,
            accessToken: process.env.ACCESS_TOKEN_HERE,
        },
        tls:{
          rejectUnauthorized:false
        }
      });
   
    
      // setup email data with unicode symbols
      let mailOptions = {
          to: 'functionalbodiesbg@gmail.com', // list of receivers
          subject: req.body.subject , // Subject line
          text: req.body.subject, // plain text body
          html: '<h1>Запитване: '+ req.body.subject +'</h1><h3> Име: ' + req.body.name +'</h3><h3>Имейл: ' + req.body.email +'</h3><h3>Телефон: ' +  req.body.phone   +'</h3><br><h3>Съобщение: ' + req.body.message +'</h3>'
      };
    
      // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message sent: %s', info.messageId);   
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    
          
      });

            // setup email data with unicode symbols
            let mailOptionsUser = {
                to: req.body.email, // list of receivers
                subject: req.body.subject , // Subject line
                text: req.body.subject, // plain text body
                html: "<h1>Благодарим за запитването, ще отговорим на запитването Ви при първа възможност<h1>" + '<h1>Запитване: '+ req.body.subject +'</h1><h3><br><h3>Съобщение: ' + req.body.message +'</h3>' +"<h3>Екипът на Functional Bodies</h3>"
            };
          
            // send mail with defined transport object
            transporter.sendMail(mailOptionsUser, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);   
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
          
                
            });

      res.render('send-email')
      });

      
app.use('/services', (req,res)=> {
    res.render('services')
})

app.use('/contact', (req,res)=> {
    res.render('contact')
})

app.use('/cookies', (req,res)=> {
    res.render('cookies')
})

app.use('*', (req,res)=> {
    res.render('404')
})

app.listen(port, function () {
    console.log("The server has started")
})