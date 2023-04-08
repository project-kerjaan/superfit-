const foodDiary = require("../../schema/FoodDiary");
const food_master_data = require("../../schema/MasterDataFood");
const userMacros = require("../../schema/UserMacros");
const userCalories = require("../../schema/UserCalories");

const AllFoodDiary = async (req,res) => {
    const userId = req.userId;
    try {
        const allData = await foodDiary.find({user_id:userId}) ;
        return res.status(200).json(allData);
     } catch(err) {
          return res.status(500).json({message:err.message});
     }
}

const AddFoodDiary = async (req,res) => {
    const userId = req.userId;

    try{
        const { type, food_id,quantity } = req.body;
        const find_food = await food_master_data.findOne({ _id:food_id });
        const findUserCalories = await userCalories.findOne({ user_id:userId });
        const findUserMacros = await userMacros.findOne({user_id:userId});

        if(find_food && findUserCalories) {
            const init = new foodDiary({
                 title:find_food?.title,
                 calories:find_food?.calories,
                 fat:Math.floor(find_food?.fat * quantity ),
                 carbo:Math.floor(find_food?.carbo * quantity),
                 protein:Math.floor(find_food?.protein * quantity),
                 type,
                 user_id:userId
            });

            const saved = await init.save();

            //update calories
            findUserCalories.calories_remaining = findUserCalories.calories_remaining + saved.calories;

            //update macros
            findUserMacros.carbohdyrates_count = findUserMacros.carbohdyrates_count + saved.carbo;
            findUserMacros.fat_count = findUserMacros.fat_count + saved.fat;
            findUserMacros.protein_count = findUserMacros.protein_count + saved.protein;

            const savedCalories = await findUserCalories.save();
            const savedMacros = await findUserMacros.save();

            if(saved && savedCalories && savedMacros) {
                return res.status(200).json(saved);
            }

            return res.status(400).json({message:"there is some error in your request"});

        }

        return res.status(500).json({message:"something wen't wrong"});
           
    } catch(err) {
       return res.status(500).json({message:err.message});
    }
}

const DeleteDiary = async (req,res) => {
   const userId = req.userId;

    try{
        const id = req.params.id;
        if(id) {
           const findDiary = await foodDiary.findOneAndDelete({_id:id});
           const findUserCalories = await userCalories.findOne({user_id:userId});
           const findMacros = await userMacros.findOne({user_id:userId});

           findUserCalories.calories_remaining = findUserCalories.calories_remaining - findDiary.calories;
           findMacros.fat_count = findMacros.fat_count - findDiary.fat;
           findMacros.carbohdyrates_count = findMacros.carbohdyrates_count - findDiary.carbo;
           findMacros.protein_count = findMacros.protein_count - findDiary.protein;

           await findUserCalories.save();
           await findMacros.save();

           return res.status(200).json({message:"success delete diary"});
        }
        return res.status(404).json({message:"diary is not found"});
    } catch(err) {
        return res.status(500).json({message:err.message});
    }
}

const DetailFoodDiary = async (req,res) => {
    const userId = req.userId;
    try {
        const allData = await foodDiary.find({ $and:[{ type:req.query.type }, { user_id:userId }] }) ;
        return res.status(200).json(allData);
     } catch(err) {
          return res.status(500).json({message:err.message});
     }
}

const foodMasterData = async (req,res) => {
    try {
       const allData = await food_master_data.find() ;
       return res.status(200).json(allData);
    } catch(err) {
         return res.status(500).json({message:err.message});
    }
}

module.exports = {
    AddFoodDiary,
    foodMasterData,
    AllFoodDiary,
    DetailFoodDiary,
    DeleteDiary
}
