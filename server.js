const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const multer  = require('multer');
const upload = multer({ dest: './public/data/uploads/' })


const app = express();
app.engine('.hbs', hbs());
app.set('view engine', '.hbs');
app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

app.get('/hello/:name', (req, res) => {
  res.render('hello', { name: req.params.name });
});

app.get('/', (req, res) => {
  res.render('index')
});

app.get('/about', (req, res) => {
  res.render('about.hbs', { layout: 'dark' });
});

app.get('/contact', (req, res) => {
  res.render('contact')
});

app.get('/info', (req, res) => {
  res.render('info')
});

app.get('/history', (req, res) => {
  res.render('history')
});

// app.post('/contact/send-message', (req, res) => {

//   const { author, sender, title, message, file } = req.body;

//   if (author && sender && title && message && file) {
//     res.render('contact', { isSent: true, file: file });
//   }
//   else {
//     res.render('contact', { isError: true });
//   }

// });

app.post('/contact/send-message', upload.single('file'), function (req, res) {
  // req.file is the name of your file in the form above, here 'uploaded_file'
  // req.body will hold the text fields, if there were any 
    const { author, sender, title, message } = req.body;

  if (author && sender && title && message && req.file) {
    res.render('contact', { isSent: true, file: req.file.originalname });
  }
  else {
    res.render('contact', { isError: true });
  }
  // console.log(req.file);
});

app.use(express.static(path.join(__dirname, '/public')));

app.use((req, res) => {
  res.status(404).send('404 not found...');
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});