
const mongoose = require('mongoose')

// Todo model
const Country = mongoose.model('Country', {
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    code: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 2,
        trim: true
    }
})

module.exports = {
    Country,
}