const mongoose = require('mongoose');




const user = mongoose.model('UserSchema',{


    fname : {type : String },

    lname : {type : String},

    sex : {type : String},

    email  : {type : String, unique: true, dropDups: true}, 

    contact : {type : String},

    password : {type : String},

    date : {type : String},



});

module.exports = user;