const express = require('express');


const router = express.Router();
const user = require('../backend/models/user.js');
const ObjectId = require('mongoose').Types.ObjectId;
const soldbooksdb = require('../backend/models/soldbooks');

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

//get soldbooks
router.get('/api/getsoldbooks/', (req,res) => {
    soldbooksdb.find((err,doc)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(doc); 

        }
    })
    });



// get by id
router.get('/api/getuserbyid/:id', (req,res) => {

    if(ObjectId.isValid(req.params.id)){

        user.findById(req.params.id,(err,doc)=>{
            if(err){
                console.log('error in get data by id' + err);
            }
            else{
                res.send(doc); 
    
            }
        });
    }else{
        return res.status(400).send('No records found with id ' + req.params.id);
    }


    
    });

// get by mail
router.get('/api/getuserbyemail/:id', (req,res) => {

    if(ObjectId.isValid(req.params.id)){

        user.find({},(err,doc)=>{
            if(err){
                console.log('error in get data by id' + err);
            }
            else{
                res.send(doc); 
    
            }
        });
    }else{
        return res.status(400).send('No records found with id ' + req.params.id);
    }


    
    });



//post new user
router.post('/api/postuser/', (req,res) => {
let nuser = new user ({

    fname : req.body.fname,

    lname : req.body.lname,
    
    sorb : req.body.sorb,

    email  : req.body.email,
        
    password : req.body.password,

  // books : [ {bname: req.body.bname , qty: req.body.qty, authname : req.body.authname} ],


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


//post add new sold book
router.post('/api/postsoldbook/', (req,res) => {
    let newsoldbooks = new soldbooksdb ({
    
        sellerfname : req.body.sellerfname,
    
        sellerlname : req.body.sellerlname,
    
        selleremail  : req.body.selleremail,
            
        soldbooks : [ {bname: req.body.bname , authname : req.body.authname, qty: req.body.qty} ],
    
    });
    
  newsoldbooks.save((err,doc)=>{
        if(err){
            console.log('Error in Post data' + err);
        }
        else{
            res.send(doc); 
            console.log(doc);
        }
    });
    });

    




//push  book 
router.put('/api/pushbook/:id/', (req,res) => {

    if(ObjectId.isValid(req.params.id)){
        let newbook= {
          
           books : [ {bname: req.body.bname, authname: req.body.authname  ,qty: req.body.qty} ]
           
       };

        user.findByIdAndUpdate(req.params.id,{$push:newbook},{new:true},(err,doc)=>{
            if(err){
                console.log('error in put by id' + err);
            }
            else{
                res.send(doc); 
    
            }
        });
        
    }else{
        return res.status(400).send('No records forund with id ' + req.params.id);
    }

});

//edit book details in array
router.put('/api/putbook/:id/:bid', (req,res) => {

    if(ObjectId.isValid(req.params.id)){
        let newbook= {
          
           books :  {_id : req.params.bid , bname: req.body.bname, authname: req.body.authname  ,qty: req.body.qty} 
           
       };

        user.updateOne({'books._id': req.params.bid},{$set: {'books.$.bname' : req.body.bname,
        'books.$.authname' : req.body.authname,'books.$.qty' : req.body.qty}},(err,doc)=>{
            if(err){
                console.log('error in put by id' + err);
            }
            else{
                res.send(doc); 
    
            }
        });
        
    }else{
        return res.status(400).send('No records forund with id ' + req.paramsa.id);
    }

});

//edit soldbook details in array
router.put('/api/editsoldbook/:id/:bid', (req,res) => {

    if(ObjectId.isValid(req.params.bid)){
        let newbook= {
          
           soldbook :  {_id : req.params.bid , bname: req.body.bname, authname: req.body.authname  ,qty: req.body.qty} 
           
       };

        soldbooksdb.updateOne({'soldbooks._id': req.params.bid},{$set: {'soldbooks.$.bname' : req.body.bname,
        'soldbooks.$.authname' : req.body.authname,'soldbooks.$.qty' : req.body.qty}},(err,doc)=>{
            if(err){
                console.log('error in put by id' + err);
            }
            else{
                res.send(doc); 
    
            }
        });
        
    }else{
        return res.status(400).send('No records forund with id ' + req.paramsa.id);
    }

});


// push new  sold books
router.put('/api/pushsoldbook/:id', (req,res) => {

    if(ObjectId.isValid(req.params.id)){
        let newsbook= {
          
           
           soldbooks : [ {bname: req.body.bname ,qty: req.body.qty, authname : req.body.authname} ]
           
       };

        soldbooksdb.findByIdAndUpdate(req.params.id,{$push:newsbook},{new:true},(err,doc)=>{
            if(err){
                console.log('error in sold , put  by id' + err);
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
router.delete('/api/deletebook/:id/:bid', (req,res) => {

    if(ObjectId.isValid(req.params.id)){

        user.findByIdAndUpdate(req.params.id, { $pull: { 'books': {  _id: req.params.bid } } },(err,doc)=>{
            if(err){
                console.log('error in delete post by id ' + err);
            }
            else{
                res.send(doc); 
    
            }
        });

    }else{
        return res.status(400).send('No records found with id ' + req.paramsa.id);
    }

});

//delete user
router.delete('/api/deleteuser/:id', (req,res) => {

    if(ObjectId.isValid(req.params.id)){

        user.findByIdAndDelete(req.params.id,(err,doc)=>{
            if(err){
                console.log('error in delete post by id ' + err);
            }
            else{
                res.send(doc); 
    
            }
        });

    }else{
        return res.status(400).send('No records found with id ' + req.paramsa.id);
    }

});




module.exports= router;