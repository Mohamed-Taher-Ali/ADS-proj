const multer = require('multer')
const path = require('path')

exports.isNumber = str => !isNaN(str)

exports.strToBool = str => (str == "true") ?
    true : (str == "false") ? false : ""

exports.randomDate = function (start, end) {
    return new Date(
        start.getTime() + Math.random() *
        (end.getTime() - start.getTime())
    );
}

exports.randomOfArray = (array) => array[Math.floor(
    Math.random() * array.length
)];

exports.assignHostToPhotos = (req, body) => {
    let editedBody = JSON.stringify(body);
    let host = `${req.protocol}://${req.get('host')}`;

    editedBody = editedBody.replace(/\/uploads\//g, `${host}/uploads/`)

    return JSON.parse(editedBody)
}


exports.tokenGenerator = (len) => {
    var text = "";

    var charset = "abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";

    for (var i = 0; i < len; i++)
        text += charset.charAt(Math.floor(Math.random() * charset.length));

    return text;
}

exports.checkDateIsTomorrow = (isoDate) => {
    let today = new Date(),
        checkedDate = new Date(isoDate)

    if (
        today.getFullYear() == checkedDate.getFullYear() &&
        today.getMonth() == checkedDate.getMonth() &&
        (today.getDate() + 1) == checkedDate.getDate()
    ) return true; return false;
}


exports.upload = multer({ storage: multer.diskStorage({
    // destination
    destination: function (req, file, cb) {
  
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      var mask = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      var result = '';
      for (var i = 15; i > 0; --i) result += mask[Math.floor(Math.random() * mask.length)];
  
      var id = result + Date.now() + path.extname(file.originalname);
      cb(null, id);
    }
  })
});

exports.bodyToJsonThenAssignPhoto = (req) => {
    let body = JSON.parse(req.body.data || {});

    let photo = {
        ...(req.file && { photo: `/uploads/${req.file.filename}` })
    }

    return { ...body, ...photo }
}


exports.seedAdmin = async (User) => {
    let admins = await User.find({ role: "adm" })

    if (!admins.length) {
        let adminData = {
            name: "admin",
            password: "admin",
            role: "adm",
        }
        this.addOne(User, adminData);
    }
}


exports.addOne = async (Model, data) => {
    let result = new Model(data)
    result = await result.save();
    return result;
}

exports.secureReq = (body) => (req, res) => {
    try {
        body(req, res);
    } catch (error) {
        return res.status(200).send(ret);
    }
}


exports.crudController = (Model) => ({

    add: this.secureReq(async (req, res)=>{
        let ret = await Model.insertMany(req.body)
            return res.status(200).send(ret);
    }),

    upd: this.secureReq(async (req, res)=>{
        let ret = await Model.findByIdAndUpdate(
            req.params.id, req.body, { new: true });
        return res.status(200).send(ret);
    }),

    del: this.secureReq(async (req, res)=>{
        let ret = await Model.findByIdAndRemove(
            req.params.id);
        return res.status(200).send(ret);
    }),

    get: this.secureReq(async (req, res)=>{
        let ret = await Model.find(req.query);
        return res.status(200).send(ret);
    }),
})