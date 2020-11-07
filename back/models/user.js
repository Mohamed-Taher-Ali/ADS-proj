const mongoose = require('mongoose');
const {seedAdmin, tokenGenerator} = require('../helper');


/**
 * to simlify i ::
 * didn't create role model
 */


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "adv",
        enum: ["adv", "adm"]
    },
    token: {
        type: String,
        unique: true,
        default: tokenGenerator(20)
    }
},
{timestamps: true});

const User = mongoose.model('User', userSchema);

//seed admin {name: admin, password: admin}
seedAdmin(User);

exports.User = User;