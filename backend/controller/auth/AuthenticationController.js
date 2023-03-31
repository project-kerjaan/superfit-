const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//user
const user = require('../../schema/User');
const UserCalories = require('../../schema/UserCalories');
const UserMacros = require('../../schema/UserMacros');

//function
const {caloriesCount} = require("../../function/caloriesCount");


const LoginHandler = async (req,res) => {
    try {
        const { email , password } = req.body;
        const find_user = await user.findOne({ email });

        if(!find_user) {
           return res.status(404).json({message:'Account is not found'});
        }

        bcrypt.compare(password,find_user.password , (err,result) => {
             if(err) {
                return res.status(500).json({message:'error'});
             }

             if(!result){
                return res.status(401).json({message:'Unauthorized'});
             }

             return jwt.sign( {
                _id:find_user._id,
                name:find_user.name,
                email:find_user.email
             }, `${process.env.SECRET}`,(err,token) => {
                  return res.status(200).json(token);
             });
        });

    } catch(err) {
        return res.status(400).json({message:err.message});
    }
}

const RegisterHandler = async (req,res) => {
    try{
        const { email , password, name,confirm } = req.body;
        const find_user = await user.findOne({ email });

        if(find_user) {
            return res.status(500).json({message:'Fail to create account'});
        }

        if(confirm != password) {
            return res.status(400).json({message:'Password is not match'});
        }

        const initUser = new user({
             email,
             name
        });

        bcrypt.genSalt(Number(process.env.SALT), (err,salt) => {
            if(err) {
                return res.status(500).json({message:"error"});
            }

            bcrypt.hash(password,salt,async (err,hash)=> {
                 initUser.password = hash;
                 const saved = await initUser.save();

                 if(saved) {
                    return res.status(200).json({id:initUser._id});
                 }

                return res.status(500).json({message:"error"});

            })
        });

    }catch(err) {
        return res.status(400).json({message:err.message});

    }
}

const UserSetting = async (req,res) => {
    try {

        const userCalories = await UserCalories.findOne({ user_id: req.body.user_id });;
        const userMacros = await UserMacros.findOne({ user_id: req.body.user_id });

        if(userCalories && userMacros) {
            return res.status(400).json({message:'already exists'});
        }

        const { 
            goal,
            weight,
            height,
            active_title,
            active_count,
            gender,
            address,
            age,
            user_id
        } = req.body;



        const initUserCalories = new UserCalories({
             calories_total:caloriesCount({
                 age,
                 height,
                 weight,
                 active_count,
                 gender
             }),
             food_total:0,
             calories_remaining:0,
             food_remaining:0,
             user_id
        });

        const inituserMacros = new UserMacros({
             carbohdyrates_total:0,
             fat_total:0,
             protein_total:0,
             carbohdyrates_count:0,
             fat_count:0,
             protein_count:0,
             user_id
        }); 

        await initUserCalories.save();
        await inituserMacros.save();
        await user.updateOne({ _id:user_id } , {
            $set: {
                isCompleteStep:true,
                address,
                active_title,
                goal,
                active_count,
                height,
                gender,
                weight
            }
        });

        return res.status(200).json({message:'step is complete'});

    } catch(err) {
        return res.status(400).json({message:err.message});

    }
}

module.exports = { LoginHandler,RegisterHandler,UserSetting };