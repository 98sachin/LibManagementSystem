// model is a schema (schema indicates the representation of a particular table)

const mongoose = require("mongoose");

const Schema =  mongoose.Schema;

const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },

    surname:{
        type: String,
        required: true
    },

    email:{
        type:String,
        required:true
    },

    issuedBook:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Book", // reference table
        required: false
    },

    returnDate:{
        type:String,
        required: false
    },

    subscriptionType:{
        type:String,
        required:true
    },

    subscriptionDate:{
        type: String,
        required:true
    }
},

{
    timestamps:true  // to check the realtime entry 
}
)

module.exports = mongoose.model("Users", userSchema);