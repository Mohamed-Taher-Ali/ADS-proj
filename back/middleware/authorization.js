const {User} = require("../models/user")


module.exports = (role) => (async function (req, res, next) {
  let token = req.headers.authorization || req.query.token,
      user = {};

  if (
    req.headers.authorization &&
    req.query.token &&
    req.headers.authorization != req.query.token
  ) return res.status(401).send({ error: "unAuthorized" });

  if (!token) return res.status(401).send({ error: "notFound" })
      
      user = await User.findOne({token}).lean();

  if (!user._id) return res.status(401).send({ error: "notFound" })

  
  if (roles[role].includes(user.role)) {
    let {password, ...userInfo} = user;
    req.user = userInfo;

    let {token, ...remainQ} = req.query;
    req.query = remainQ;
    
    return next();
  }
  else return res.status(401).send({ error: "unAuthorized" })
})


let roles = {
  adm: ["adm"],
  adv: ["adm", "adv"]
};