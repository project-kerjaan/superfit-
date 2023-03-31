import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { GetAllDiaries } from "../../slice/FoodDiarySlice";

const MainFoodDiary = () => {
    const dispatch = useDispatch();
    const { foodDiary } = useSelector(state=>state);

    useEffect(() => {
        dispatch(GetAllDiaries());

        console.log('test');
    },[foodDiary.diaries]);

    return (
        <Outlet/>
    )
}

export default MainFoodDiary;