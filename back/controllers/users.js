const { secureReq } = require("../helper")
const { User } = require("../models/user")


exports.
getAdvertisiersController = secureReq(async(req, res)=>{
  let users = await User.find({role: "adv", ...req.params})
  return res.status(200).send(users);
});


exports.
LoginController = secureReq(async(req, res)=>{
  let user = await User.findOne(req.body)
  let {password, ...rest} = user.toObject()
  return res.status(200).send(rest);
});