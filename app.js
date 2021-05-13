const express = require('express');
const mongoose = require('mongoose');
const Blog = require('./models/blogs');
const blogRoutes = require('./routes/blog_routes')
const app = express();
const dburl = 'mongodb+srv://kami:opensaysme@cluster0.gqa8u.mongodb.net/Nodeprac?retryWrites=true&w=majority'

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        app.listen(port, () => {
            console.log(`Server started on port`);
        });
    })
    .catch((err) => console.log(err));

app.set('view engine', 'ejs');
app.use(express.static('views'));
app.use(express.urlencoded({ extended: true }));



app.get('/', (req, res) => {
     res.redirect('/blog');
});

app.get('/blog', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
    .then((result) => {
        res.render('index', {
            title: 'Blog City',
            purpose: 'Welcome to blog city',
            blogs: result,

        });
    })
    .catch(err => console.log(err))
});

app.get('/blog/about', (req, res) => {
    res.render('about', {
        title: ' About Blog City',
        purpose: 'Know about us'
    });
});

app.use('/blog', blogRoutes);


app.use((req, res) => {
    res.status(404).render('404', {
        title: '404',
        purpose: 'Page Not Found'
    });
});

//hmmmmmmmmmmmmmm