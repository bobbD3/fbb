const express = require('express')
const router = express.Router()
const Blog = require('../modules/blogs')


//Blog routes 
router.get("/", function (req, res) {
    // get all blog posts from DB
    Blog.find({}, function (err, allBlogPosts) {
        if (err) {
            console.log(err)
        } else {
            res.render('blog', {
                blog: allBlogPosts,
                currentUser: req.user
            })
        }
    })

})

router.post("/", isLoggedIn, function (req, res) {
    const name = req.body.name
    const image = req.body.image
    const description = req.body.description
    const metadata = req.body.metadata
    const metadataDesc = req.body.metadataDesc
    const newBlogPost = {
        name: name,
        image: image,
        description: description,
        metadata: metadata,
        metadataDesc: metadataDesc
    }
    // Create a new blog post and save to db
    Blog.create(newBlogPost, function (err, newlyCreatedBlogPost) {
        if (err) {
            console.log(err)
        } else {
            res.redirect('/blog')
        }
    })


})

router.get('/new', isLoggedIn, function (req, res) {
    res.render('new.ejs')
})

router.get('/:id', function (req, res) {
    Blog.findById(req.params.id, function (err, foundBlogPost) {
        if (err) {
            console.log(err)
        } else {
            res.render('show', {
                blog: foundBlogPost
            })
        }
    })


})
// Edit Blogs 

router.get('/:id/edit', isLoggedIn, function (req, res) {
    Blog.findById(req.params.id, function (err, foundBlog) {
        if (err) {
            res.redirect('/blog')
        } else {
            res.render('./edit', {
                blog: foundBlog
            })
        }
    })

})
// Update Blogs 
router.put('/:id', isLoggedIn, function (req, res) {
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function (err, updateBlog) {
        if (err) {
            res.redirect("/blog")
        } else {
            res.redirect('/blog/' + updateBlog.id)
        }
    })
})

//Destroy blog 
router.delete('/:id', isLoggedIn, function (req, res) {
    Blog.findByIdAndRemove(req.params.id, req.body.blog, function (err) {
        if (err) {
            res.redirect('/blog')
        } else {
            res.redirect('/blog')
        }
    })
})


//middleware 
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "Моля, регистрирайте се първо!")
    res.redirect("/login");
}



module.exports = router;