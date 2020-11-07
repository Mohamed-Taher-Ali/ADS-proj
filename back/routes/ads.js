const express = require('express');
const router = express.Router();
const auth = require('../middleware/authorization');
const {upload} = require('../helper');
const { add, upd, get, del } = require('../controllers/ads');


router
.get(['/own'], [auth("adv")], get(true))
.get(['/'], [auth("adv")], get())
.delete('/delete/:id', [auth("adm")], del)
.post('/add', [auth("adm"), upload.single('photo')], add)
.put('/update/:id', [auth("adm"), upload.single('photo')], upd)



module.exports = router; 
