 const mongoose = require('mongoose');


module.exports = function () {
  mongoose.connect('mongodb://localhost/adsDB', {useCreateIndex: true,
  useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("Connetion To MongoDB ......."))
    .catch((err) => console.error('error When Connecting to MongoDB...',err))
}