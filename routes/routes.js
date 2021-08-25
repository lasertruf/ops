const express = require('express');


const router = express.Router();
const user = require('../backend/models/user.js');
const ObjectId = require('mongoose').Types.ObjectId;

//get
router.get('/api/', (req,res) => {
    user.find((err,doc)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(doc); 

        }
    })
    });

//get
router.get('/', (req,res) => {
    user.find((err,doc)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(doc); 

        }
    })
    });



// get by id
router.get('/api/:id', (req,res) => {

    if(ObjectId.isValid(req.params.id)){

        user.findById(req.params.id,(err,doc)=>{
            if(err){
                console.log('error in get post by id' + err);
            }
            else{
                res.send(doc); 
    
            }
        });
    }else{
        return res.status(400).send('No records forund with id ' + req.paramsa.id);
    }


    
    });

//post
router.post('/api/', (req,res) => {
let nuser = new user ({

    fname : req.body.fname,

    lname : req.body.lname,
    
    sex : req.body.sex,

    email  : req.body.email,

    contact : req.body.contact,
        
    password : req.body.password,

    date : req.body.date,
});

nuser.save((err,doc)=>{
    if(err){
        console.log('Error in Post data' + err);
    }
    else{
        res.send(doc); 
        console.log(doc);
    }
});
});






//put 
router.put('/api/:id', (req,res) => {

    if(ObjectId.isValid(req.params.id)){
        let nuser = {
            fname : req.body.fname,

            lname : req.body.lname,
            
            sex : req.body.sex,
        
            email  : req.body.email,
        
            contact : req.body.contact,
        
            password : req.body.password,

            date : req.body.date,
       };

        user.findByIdAndUpdate(req.params.id,{$set:nuser},{new:true},(err,doc)=>{
            if(err){
                console.log('error in delete post by id' + err);
            }
            else{
                res.send(doc); 
    
            }
        });
        
    }else{
        return res.status(400).send('No records forund with id ' + req.paramsa.id);
    }

});


//delete 
router.delete('/api/d/:id', (req,res) => {

    if(ObjectId.isValid(req.params.id)){

        user.findByIdAndRemove(req.params.id,(err,doc)=>{
            if(err){
                console.log('error in delete post by id' + err);
            }
            else{
                res.send(doc); 
    
            }
        });

    }else{
        return res.status(400).send('No records forund with id ' + req.paramsa.id);
    }

});




module.exports= router;