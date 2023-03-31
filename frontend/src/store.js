import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from "./slice/AuthSlice";
import AlertSlice from './slice/AlertSlice';
import FoodDiarySlice from './slice/FoodDiarySlice';

const store = configureStore({
    reducer: {
        auth:AuthSlice,
        alert:AlertSlice,
        foodDiary:FoodDiarySlice
    }
});

export default store;