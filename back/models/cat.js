const mongoose = require('mongoose');


const catSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
},
{timestamps: true});


const Cat = mongoose.model('Cat', catSchema);


exports.Cat = Cat;