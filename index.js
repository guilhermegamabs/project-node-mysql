const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const Post = require('./models/Post');

// Config
// Template Engine
app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Config
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Routes
app.get('/reg', (req, res) => {
  res.render('forms');
});

app.post('/add', (req, res) => {
  Post.create({
    title: req.body.title,
    content: req.body.content
  }).then(() => {
    res.redirect('/');
  }).catch((err) => {
    res.send(`There was an error ${err}`);
  });
});

app.get('/', (req, res) => {
  Post.findAll().then((posts) => {
    res.render('home', {posts: posts});
  });
});

app.get('/delete/:id', (req, res) => {
  Post.destroy({where: {id: req.params.id}}).then(() => {
    res.send('Successfully deleted Post!');
  }).catch(err => {
    res.send('This post do not exist.');
  });
});

app.listen(3030, () => {
  console.log('SERVER RUNNING ON URL: http://localhost:3030');
});
