const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser")
const port = 80;

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/contactvikalp',  {useNewUrlParser: true});
}

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    student: String,
    number: String,
    message: String
  });

const Contact = mongoose.model('Contact', contactSchema);  

app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    const params = { }
    res.status(200).render('index.pug', params);
})
app.get('/trust', (req, res)=>{
    const params = { }
    res.status(200).render('trust.pug', params);
})
app.get('/contact', (req, res)=>{
    const params = { }
    res.status(200).render('index.pug', params);
})
app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("Your details have been saved")
    }).catch(()=>{
        res.status(400).send("Your's details have not been saved")
    });
})    

app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});