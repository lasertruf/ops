
const bodyParser = require('body-parser');
const express = require('express');
// const cors = require('cors');


const user = require('./models/user');

const app = express();

const mongoose = require('./models/db');

const url = 'http://localhost:4200';

const routes = require('../routes/routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(function(req,res,next) {
    var allowedOrigins = ['https://Localhost:4200/','https://192.168.0.1:4200/','https://192.168.0.1:4200','https://Localhost:4200/','https://localhost:4200/api',,'https://localhost:4200'];
    var origin = req.headers.origin;
    if(allowedOrigins.indexOf(origin) > -1){
         res.setHeader('Access-Control-Allow-Origin', origin);
    }
    
   // res.setHeader("Access-Control-Allow-Origin",req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods','GET,POST,OPTIONS, DELETE,PUT');
    res.setHeader("Access-Control-Allow-Headers","*");
    next();
     
}); 



// app.listen(3000);    app.use(cors({origin:'http://localhost:4200'})); app.use(cors({origin: url}));

app.use('/api', routes);
app.use('/', routes);


// app.post("/api/user", (req,res,next) => {
// const post = new Post({
// title:req.body.title,
// content:req.body.content,
// email:req.body.email,

// });

// app.save();

// res.status(201).json({
//     message: "Post added"
//     });
// });



module.exports = app;