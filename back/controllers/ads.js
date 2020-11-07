const { secureReq, addOne, bodyToJsonThenAssignPhoto, assignHostToPhotos } = require("../helper")
const { Ad } = require("../models/ad")
const { Tag } = require("../models/tag");
const { User } = require("../models/user");


exports.
  add = secureReq(async (req, res) => {

    req.body = bodyToJsonThenAssignPhoto(req);

    let { user, tags, ...restBody } = req.body,
        {newT=[], existT=[]} = tags;

    let userBody = (typeof user == 'string') ?
      { _id: user } : await addOne(User, user);
      
    let tagsBody = !newT ? [] : await Tag.insertMany(newT);

    if (userBody && (newT?tagsBody:true)) {

      let adBody = {
        ...restBody,
        user: userBody._id,
        tags: [...existT, ...tagsBody.map(t => t._id)]
      };

      let ad = await addOne(Ad, adBody);

      ad = await Ad
        .findById(ad._id)
        .populate('user')
        .populate('tags')
        .populate('cat');

      return res.status(200).send(assignHostToPhotos(req, ad))
    }
  });


exports.
  get = (own)=>secureReq(async (req, res) => {
    
    let query = req.query,
        {_id,role} = req.user


    let user = role == "adv" && own ?
    {user: _id} : {}

    query = {
      ...query,
      ...(query.tags && {tags: {$in: query.tags}}),
      ...user
    }
    
    let ads = await Ad
      .find(query)
      .populate('user')
      .populate('tags')
      .populate('cat');

    return res.status(200).send(assignHostToPhotos(req, ads))
  });


  exports.
  upd = secureReq(async (req, res) => {

    req.body = bodyToJsonThenAssignPhoto(req);

    let { tags=[], ...restBody } = req.body
    
    tags = !tags.length? []: await Tag.insertMany(tags);

    let adBody = {
      ...restBody,
      tags: tags.map(t=>t._id)
    };

    let ad = await Ad
      .findByIdAndUpdate(
        req.params.id,
        adBody, { new: true }
        )
      .populate('user')
      .populate('tags')
      .populate('cat');

      return res.status(200).send(assignHostToPhotos(req, ad))
  });

  exports.
  del = secureReq(async (req, res) => {
    let { id } = req.params,
        ad = await Ad.findByIdAndRemove(id);

    return res.status(200).send(ad)
  });