const mongoose = require('mongoose');




const user = mongoose.model('User',{


    fname : {type : String },

    lname : {type : String},

    sorb : {type : String},

    email  : {type : String, unique: true, dropDups: true}, 

    password : {type : String},

    books   : [
        {
            bname: {type: String },
            authname : {type : String},
            qty:  {type: Number}
            
        }
    ]

});

module.exports = user;