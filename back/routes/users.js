const express = require('express');
const router = express.Router();
const auth = require('../middleware/authorization');
const { getAdvertisiersController, LoginController } = require('../controllers/users');


router
.get('/advertisiers', [auth("adv")], getAdvertisiersController)
.post('/login', LoginController)



module.exports = router; 
