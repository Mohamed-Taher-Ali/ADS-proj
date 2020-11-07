const express = require('express');
const router = express.Router();
const auth = require('../middleware/authorization');
const { add, get, upd, del } = require('../controllers/tags');


router
.get('/', [auth("adv")], get)
.post('/add', [auth("adm")], add)
.delete('/delete/:id', [auth("adm")], del)
.put('/update/:id', [auth("adm")], upd)



module.exports = router; 
