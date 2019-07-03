
const mongoose = require('mongoose')

// Todo model
const Region = mongoose.model('Region', {
    region: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    country: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 2,
        trim: true
    }
})

module.exports = {
    Region,
}