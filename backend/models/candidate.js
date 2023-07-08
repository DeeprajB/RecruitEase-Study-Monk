const mongoose = require("mongoose")

const CandidateSchema = mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    age : {
        type: Number,
        required: true
    },
    application_date : {
        type: Date,
        required: true
    },
    selected : {
        type: Boolean,
        required: true
    },
    attachments : {
        type: Number,
        required: true
    },
})

module.exports = mongoose.model("Candidate", CandidateSchema)