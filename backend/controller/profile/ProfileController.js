const user = require("../../schema/User");
const cloudinary = require('cloudinary').v2;
const jwt = require('jsonwebtoken');

const GetUserProfile = async (req,res) => {
  const userId = req.userId;

  try {

    const findUser = await user.findOne({ _id: userId });
    if(findUser) {
        return res.status(200).json(findUser);
    }

    return res.status(404).json({message:"Profile is not match"});
    
  } catch(err) {
     return res.status(500).json({message:err.message});
  }

}


const updateUserAvatar = async (req,res) => {
    const userId = req.userId;

    try {
      const findUser = await user.findOne({ _id:userId });

      if(!findUser) {
          return res.status(401).json({message:"Unauthorized"});
      }
      
      cloudinary.uploader.upload(req.body.file,{public_id:`${req.body.username}`})
      .then(async (result) => {            
          findUser.profile = result.url;
          const saved = await findUser.save();

          if(saved) {
            return jwt.sign( {
              _id:findUser._id,
              name:findUser.name,
              email:findUser.email,
              profile:findUser.profile
           }, `${process.env.SECRET}`,(err,token) => {
                return res.status(200).json(token);
           }, { expiresIn:"1d" });

          }
      }).catch(err => res.status(500).json({message:err.message}));

    } catch(err) {
      return res.status(500).json({message:err.message});
    }
}

module.exports = { GetUserProfile, updateUserAvatar };