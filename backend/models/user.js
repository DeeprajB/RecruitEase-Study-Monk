const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    company_name : {
        type: String,
        required: true
    },
    company_url : {
        type: String,
        required: true
    },
    username : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    industry_type : {
        type: String,
        required: true
    },
    industry_size : {
        type: Number,
        required: true
    },
    location : {
        type: String,
        required: true
    },
    details : {
        type: String,
        required: false
    },
    requirements : {
        type: String,
        required: false
    },
}, {timestamps : true})

module.exports = mongoose.model("User", UserSchema)