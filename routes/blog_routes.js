const express = require('express');
const router = express.Router();
const Blog = require('../models/blogs');


router.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create a new blog',
        purpose: 'Make a new blog'
    });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then((result) => {
            res.render('blog', result)
        })
        .catch(err => console.log(err));
});

router.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then((result) => {
            res.redirect('/');
        })
        .catch(err => console.log(err));
});

router.post('/create', (req, res) => {
    const body = req.body;
    let blog = new Blog(body);

    blog.save()
        .then(result => console.log(result))
        .catch(err => console.log(err));

    res.redirect('/');
})


router.use((req, res) => {
    res.status(404).render('404', {
        title: '404',
        purpose: 'Page Not Found'
    });
});


module.exports = router;