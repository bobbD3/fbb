const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../modules/user')
const Blog = require('../modules/blogs')
const async = require('async')
const nodemailer = require('nodemailer')
const crypto = require('crypto')

// Auth Routes 
router.get('/register', function (req, res) {
    res.render('register')
})
// handle sign up logic
router.post("/register", function (req, res) {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
    });
    // if (req.body.adminCode === process.env.PASSWORD) {
        if (req.body.adminCode === process.env.PASSWORD ) {
            newUser.isAdmin = true;
    }

    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function () {
            req.flash("success", "Successfully Signed Up! Nice to meet you " + req.body.username);
            res.redirect("/");
        });
    });
});

// show login form
router.get("/", function (req, res) {
   // get all blog posts from DB
   Blog.find({}, function (err, allBlogPosts) {
    if (err) {
        console.log(err)
    } else {
        res.render('index', {
            blog: allBlogPosts,
            currentUser: req.user
        })
    }
})

})


router.get("/login", function (req, res) {
    res.render("login");
});
// handling login logic
router.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
}), function (req, res) {});

// logout route
router.get("/logout", function (req, res) {
    req.logout();
    req.flash("success", "Logged you out!")
    res.redirect("/");
});

//forgot Password
router.get('/forgot', function(req, res) {
    res.render('forgot');
  });
  
  router.post('/forgot', function(req, res, next) {
    async.waterfall([
      function(done) {
        crypto.randomBytes(20, function(err, buf) {
          var token = buf.toString('hex');
          done(err, token);
        });
      },
      function(token, done) {
        User.findOne({ email: req.body.email }, function(err, user) {
          if (!user) {
            req.flash('error', 'No account with that email address exists.');
            return res.redirect('/forgot');
          }
  
          user.resetPasswordToken = token;
          user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  
          user.save(function(err) {
            done(err, token, user);
          });
        });
      },
      function(token, user, done) {
        var smtpTransport = nodemailer.createTransport({
          service: 'smtp.gmail.com',
          port: 465, 
          secure: true,
          auth: {
            type: 'OAuth2',
            user: 'functionalbodiesbg@gmail.com',
            clientId: '000000000000-xxx0.apps.googleusercontent.com',
            clientSecret: 'XxxxxXXxX0xxxxxxxx0XXxX0',
            refreshToken: '1/XXxXxsss-xxxXXXXXxXxx0XXXxxXXx0x00xxx',
            accessToken: 'ya29.Xx_XX0xxxxx-xX0X0XxXXxXxXXXxX0x',
            pass: process.env.GMAILPW
          }
        });
        var mailOptions = {
          to: user.email,
          from: 'functionalbodiesbg@gmail.com',
          subject: 'Functional bodies password reset',
          text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            'http://' + req.headers.host + '/reset/' + token + '\n\n' +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
        };
        smtpTransport.sendMail(mailOptions, function(err) {
          console.log('mail sent');
          req.flash('success', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
          done(err, 'done');
        });
      }
    ], function(err) {
      if (err) return next(err);
      res.redirect('/forgot');
    });
  });
  
  router.get('/reset/:token', function(req, res) {
    User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
      if (!user) {
        req.flash('error', 'Password reset token is invalid or has expired.');
        return res.redirect('/forgot');
      }
      res.render('reset', {token: req.params.token});
    });
  });
  
  router.post('/reset/:token', function(req, res) {
    async.waterfall([
      function(done) {
        User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
          if (!user) {
            req.flash('error', 'Password reset token is invalid or has expired.');
            return res.redirect('back');
          }
          if(req.body.password === req.body.confirm) {
            user.setPassword(req.body.password, function(err) {
              user.resetPasswordToken = undefined;
              user.resetPasswordExpires = undefined;
  
              user.save(function(err) {
                req.logIn(user, function(err) {
                  done(err, user);
                });
              });
            })
          } else {
              req.flash("error", "Passwords do not match.");
              return res.redirect('back');
          }
        });
      },
      function(user, done) {
        var smtpTransport = nodemailer.createTransport({
          service: 'smtp.gmail.com',
          port: 465, 
          secure: true,
          auth: {
            type: 'OAuth2',
            user: 'functionalbodiesbg@gmail.com',
            clientId: '000000000000-xxx0.apps.googleusercontent.com',
            clientSecret: 'XxxxxXXxX0xxxxxxxx0XXxX0',
            refreshToken: '1/XXxXxsss-xxxXXXXXxXxx0XXXxxXXx0x00xxx',
            accessToken: 'ya29.Xx_XX0xxxxx-xX0X0XxXXxXxXXXxX0x',
            pass: process.env.GMAILPW
          }
        });
        var mailOptions = {
          to: user.email,
          from: 'functionalbodiesbg@gmail.com',
          subject: 'Паролата Ви беше сменена',
          text: 'Hello,\n\n' +
            'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
        };
        smtpTransport.sendMail(mailOptions, function(err) {
          req.flash('success', 'Success! Your password has been changed.');
          done(err);
        });
      }
    ], function(err) {
      res.redirect('/');
    });
  });


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "Моля, регистрирайте се първо!")
    res.redirect("/login");
}

module.exports = router;