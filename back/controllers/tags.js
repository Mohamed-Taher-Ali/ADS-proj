const { Tag } = require("../models/tag")
const { crudController } = require("../helper")


module.exports = crudController(Tag);