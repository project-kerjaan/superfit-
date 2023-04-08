require('dotenv').config({debug:true});

const express = require('express');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;
const mongoose = require('mongoose');

const app = express();

const homeRoutes = require('./routes/home/Home');
const authRoutes = require("./routes/auth/AuthenticationRoutes");
const profileRoutes = require("./routes/profile/Profile");
const accountRoutes = require("./routes/settings/Setting");
const foodDiaryRoutes = require("./routes/foodDiary/FoodDiary");

cloudinary.config({
    cloud_name: "dofjcahla",
    api_key: "535534286139129",
    api_secret: "KTf8dM5afX9DM-t_lgwhDDXZgRY"
  });

app.use(cors({
    origin:'*',
    methods:['GET','POST', 'PUT','DELETE'],
    allowedHeaders:'*'
}));
app.use(express.json());

app.use('/api/auth',authRoutes);
app.use('/api/home' , homeRoutes);
app.use('/api/profile' ,profileRoutes);
app.use("/api/setting",accountRoutes);
app.use("/api/food-diary",foodDiaryRoutes);

mongoose.connect(`${process.env.MONGO_URI}`)
.then(() => {
    app.listen(8080 , () => console.log(`running server`));
})
.catch(err => console.log(err));