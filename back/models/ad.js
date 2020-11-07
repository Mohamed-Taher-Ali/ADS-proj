const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    cat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cat",
        required: true,
    },
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
        required: true,
    }],
    type: {
        type: String,
        required: true,
        enum: ["free", "paid"]
    },
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    sDate: {
        type: Date,
        required: true,
    },
    eDate: {
        type: Date,
        required: true,
    },
    photo: String,

},
{timestamps: true});


const Ad = mongoose.model('Ad', adSchema);


exports.Ad = Ad;