const mongoose = require('mongoose');




const soldbooksdb = mongoose.model('soldbooks',{


    sellerfname : {type : String },

    sellerlname : {type : String},

    selleremail  : {type : String, unique: true, dropDups: true}, 

    soldbooks   : [
        {
            bname: {type: String },
            authname : {type : String},
            qty:  {type: Number,}
        }
    ]
});

module.exports = soldbooksdb;


