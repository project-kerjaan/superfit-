const user = require("../../schema/User");
const userCalories = require("../../schema/UserCalories");
const userMacros = require("../../schema/UserMacros");

const bcrypt = require('bcrypt');

const ChangePassword = async (req,res) => {
    const userId = req.userId;

    if(!userId) {
        return res.status(401).json({message:'Unauthorized'});
    }

    const findUser = await user.findOne({ _id:userId });
    
    bcrypt.compare(req.body.password,findUser?.password,async (err,result) => {
        console.log(result);

         if(result) {
             try {
         
               if(findUser) {
                 
                return bcrypt.genSalt(Number(process.env.SALT) , (err,salt) => {
                     if(err) {
                         return res.status(500).json({message:'Something went wrong'});
                     }
         
                     bcrypt.hash(req.body.password, salt , async (err,hash) => {
                         findUser.password = hash;
                         const saved = await findUser.save();
         
                         if(saved) {
                             return res.status(200).json({message:"Success update password"});
                         }
                     });
                 })
         
               }
         
             } catch(err) {
                 return res.status(500).json({message:err.message});
             }
         } else {
             return res.status(401).json({message:"Unauthorized"});
         }

    });

}

const UpdateProfile = async (req,res) => {
   const userId = req.userId;
   const {
     name,
     gender,
     height,
     weight,
     address,
     birthday,
     email,
     phone
   } = req.body;

    try {
       const findUser = await user.findOne({_id:userId});
       findUser.name = name;
       findUser.gender = gender;
       findUser.weight = weight;
       findUser.height = height;
       findUser.address = address;
       findUser.birthday = birthday;
       findUser.email = email;
       findUser.phone = phone;

       const saved = await findUser.save();

       if(saved) {
        return res.status(200).json(saved);
       }
     
    } catch(err) {
        return res.status(500).json({message:err.message});
    }
}

const DeleteAccount = async (req,res) => {
    const userId = req.userId;

    if(!userId) {
        return res.status(401).json({message:'Unauthorized'});
    }

    const findUser = await user.findOne({_id:userId});


    bcrypt.compare(req.body.password, findUser?.password, async (err,result) => {


        if(err) {
            return res.status(500).json({message:err});
        }

        if(result) {
            try {
                if(findUser) {
                    const deletedUser = await user.deleteOne({_id:userId});
                    const deletedCalories = await userCalories.deleteOne({ user_id:userId });
                    const deletedMacros = await userMacros.deleteOne({ user_id:userId });
        
                    if(deletedUser && deletedCalories && deletedMacros) {
                        return res.status(200).json({message:"Account deleted"});
                    }
                    
                    return res.status(400).json({message:"fail to delete account"});
                }
        
            } catch(err) {
                return res.status(500).json({message:err.message});
        
            }
        } else {
            return res.status(400).json({message:"Action is failed"});
        }


    });
    
}

module.exports = {
    ChangePassword,
    DeleteAccount,
    UpdateProfile
}