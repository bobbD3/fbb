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
// app.use('*', (req,res)=> {
//     res.render('404')
// })

app.listen(port, function () {
    console.log("The server has started")
})