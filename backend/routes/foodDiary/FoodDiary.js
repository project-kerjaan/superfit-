const routes = require('express').Router();
const verifToken = require('../../middleware/VerifToken');
const { 
    foodMasterData,
    AddFoodDiary,
    AllFoodDiary,
    DetailFoodDiary
} = require("../../controller/foodDiary/FoodDiary");

routes.get("/all",verifToken,AllFoodDiary);
routes.get("/detail",verifToken,DetailFoodDiary);
routes.get('/data',foodMasterData);
routes.post("/add" ,verifToken, AddFoodDiary);

module.exports = routes;