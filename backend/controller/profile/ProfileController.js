const user = require("../../schema/User");

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

const UpdateUserProfile = async (req,res) => {
    const userId = req.userId;

    try {
       
    } catch(err) {
       
    }
}

module.exports = { GetUserProfile,UpdateUserProfile };