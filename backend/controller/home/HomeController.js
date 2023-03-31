const userCalories = require('../../schema/UserCalories');
const userMacros = require('../../schema/UserMacros');

const HomeData = async (req,res) => {

    const userId = req.userId;

    if(!userId) {
        return res.status(401).json({message:'Unauthorized'});
    }

    try {
      const caloriesAll = await userCalories.findOne({ user_id:userId });
      const macrosAll = await userMacros.findOne({user_id:userId});

      return res.status(200).json({
        results: {
            caloriesAll,
            macrosAll
        }
      })

    } catch(err) {
        return res.status(500).json({message:err.message});
    }
}

module.exports = {
    HomeData 
}