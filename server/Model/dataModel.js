const mongoose = require('mongoose')

const DataSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
}, {
    timestamp: true
})

module.exports = mongoose.model( 'Data', DataSchema )