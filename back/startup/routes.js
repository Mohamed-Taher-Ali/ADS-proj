const error = require('../middleware/error');
const users = require('../routes/users');
const cats = require('../routes/cats');
const tags = require('../routes/tags');
const ads = require('../routes/ads');


const cors = require('cors');
const bodyParser = require('body-parser');


module.exports = function (app) {
  app.use(cors());

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.use('/api/users', users)
  app.use('/api/cats', cats)
  app.use('/api/tags', tags)
  app.use('/api/advrs', ads)

  app.use(error);

} 
