const { Cat } = require("../models/cat")
const { crudController } = require("../helper")


module.exports = crudController(Cat)