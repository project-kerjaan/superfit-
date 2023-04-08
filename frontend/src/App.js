import { Routes,Route } from 'react-router-dom';
import {
  MainAuth, 
  MainProfile,
  AuthChoose,
  Welcome,
  Login,
  Register,
  UserSetting,
  Homepage,
  Profile,
  Goals,
  MainSettings,
  Settings,
  MainFoodDiary,
  EditProfile,
  FoodDiary,
  MainMealPlan,
  MainHome,
  FoodDetail,
  Password,
  AddFoodDiary,
  Friends,
  MealPlan
} from "./pages";
import { closeAlert } from './slice/AlertSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

function App() {
  const { alert } = useSelector(state=>state);
  const dispatch = useDispatch();

  useEffect(() => {
     setTimeout(() => {
       dispatch(closeAlert());
     }, 4000)
  } ,[alert]);

  return (
    <div className="w-full flex justify-center items-center min-h-screen bg-gray-100">
      <Routes>
        <Route index element={<Welcome/>}/>
        //auth routing
        <Route path="/auth" element={<MainAuth/>}>
          <Route index element={<AuthChoose/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="register" element={<Register/>}/>
          <Route path="userSetting" element={<UserSetting/>}/>
        </Route>

        //home routing
        <Route path="/home" element={<MainHome/>}>
          <Route index element={<Homepage/>}/>
          <Route path="food-detail/:id" element={<FoodDetail/>}/>
        </Route>

        //profile routing
        <Route path="/profile" element={<MainProfile/>}>
          <Route index element={<Profile/>}/>
          <Route path="goals" element={<Goals/>}/>
          <Route path="friends" element={<Friends/>}/>
        </Route>

        //setting routing
        <Route path="/settings" element={<MainSettings/>}>
           <Route index element={<Settings/>}/>
           <Route path="edit-profile" element={<EditProfile/>}/>
           <Route path="change-password" element={<Password/>}/>
           <Route path="delete-account" element={<Password/>}/>
        </Route>

        //food diary routing
        <Route path="/food-diary" element={<MainFoodDiary/>}>
           <Route index element={<FoodDiary/>}/>
           <Route path="add" element={<AddFoodDiary/>}/>
        </Route>
        
        //meal plan routing
        <Route path="/meal-plan" element={<MainMealPlan/>}>
          <Route index element={<MealPlan/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
