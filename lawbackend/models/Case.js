const mongoose = require('mongoose')

const caseSchema = new mongoose.Schema({

    case_title: {
        type: String,
        required: true
    },

    law_section: {
        type: String,
        required: true
    },

    case_type: {
        type: String
    },

    description: {
        type: String
    },

    punishment: {
        type: String
    },

    court: {
        type: String
    },

    past_cases: [
        {
            case_name: String,
            year: Number
        }
    ]

})

module.exports = mongoose.model("lawcases", caseSchema)