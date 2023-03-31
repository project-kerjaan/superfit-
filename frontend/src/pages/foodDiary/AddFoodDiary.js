import { useState,useEffect } from "react";
import { Link,useLocation } from 'react-router-dom';
import axios from "axios";
import { CreateFoodDiary,GetDiaries } from "../../slice/FoodDiarySlice";
import { useDispatch,useSelector } from 'react-redux';

const AddFoodDiary = () => {
    const location = useLocation();
    const getQuery = location && location.search ? location.search.split("=")[1]  : "";
    const dispatch = useDispatch();
    const { foodDiary } = useSelector(state=>state);

    const [open,setOpen] = useState(false);
    const [foods,setFoods] = useState(null);
    const [diaryForm,setDiaryForm] = useState({
        quantity:0,
        food_id:"",
        type:getQuery
    });


    const fetchFoods = async () => {
        const { data } = await axios.get(`http://localhost:8080/api/food-diary/data`);
        setFoods(data);
    }

    useEffect(() => {
        fetchFoods();   
        setDiaryForm({
            quantity:0,
            food_id:"",
            type:getQuery
        });
        dispatch(GetDiaries({ type:getQuery }));
    },[]);

    const addFoodDiary = (e) => {
        e.preventDefault();
       dispatch(CreateFoodDiary({ diaryForm,dispatch,setOpen }));
    }

    return (
        <section className="relative w-[30vw] py-5 px-7 min-w-[30vw] mx-auto bg-white min-h-screen">
        <div className="border-b-2 border-gray-400 pb-5">
        <div className='flex items-center gap-x-7'>
                <Link to="/food-diary">
                 <i className="ri-arrow-left-line text-2xl"></i> 
                </Link>
                <h2 className='text-2xl text-center font-bold mb-2'>{getQuery}</h2>
            </div>
            <div className="mt-4">
                <input type="text" className="w-full border-2 border-gray-400 rounded-lg py-2 px-3 outline-none"/>
            </div>
        </div>
        <div className="mt-5">
        <button onClick={() => setOpen(true)}  className="w-full block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
  Create Diaries
</button>
        </div>
        <div className="mt-7">
            <h2 className="text-xl font-bold">History</h2>
            <div className="mt-5 flex flex-col gap-y-3">
                {foodDiary.diaries.map((diary,idx)=>(
                    <div key={idx} className="bg-blue-50 py-3 px-3 rounded-md">
                        <div className="flex justify-between items-center">
                         <div className="flex flex-col">
                         <h3 className="font-bold">
                        {diary?.title}
                        </h3>
                        <p className="text-sm text-gray-500">{diary?.protein}gr , {diary?.fat}gr, {diary?.calories} calories</p>
                         </div>
                        <button> <i class="ri-delete-bin-7-line"></i></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    
       {
       open ?  
       <div 
       className="w-[30vw] px-5 fixed top-0 left-[50%] -translate-x-[50%] min-h-screen flex items-center justify-center"     
       style={{
        backgroundColor:"rgba(10,10,10,0.4)"
      }}>
         <div  id="modal" className="bg-white w-full py-5 px-5 rounded-lg">
            {
                foodDiary.loading &&
                <div className={`w-full ${foodDiary.variant} py-2 px-3 rounded-md mb-4`}>
                    <h4 className={`${foodDiary.textVariant}`}>{foodDiary.message}</h4>
                </div>
            }
            <h2 className="text-xl font-bold text-center">Add Food</h2>
            <form onSubmit={addFoodDiary} className="mt-5 flex flex-col gap-y-3 ">
                <div className="w-full flex flex-col gap-y-2">
                    <label className="text-md mb-1 font-semibold">Food type</label>
                    <select
                     onChange={(e)=>setDiaryForm({...diaryForm,food_id:e.target.value})} 
                     value={diaryForm?.food_id}
                    className="rounded-md outline-none">
                        {foods?.map((food,idx) => (
                            <option key={idx} value={`${food?._id}`}>{food?.title}</option>
                        ))}
                    </select>
                </div>
                <div className="w-full flex flex-col gap-y-2">
                    <label className="text-md mb-1 font-semibold">Quantity</label>
                    <input
                     value={diaryForm?.quantity}
                     onChange={(e)=>setDiaryForm({...diaryForm,quantity:Number(e.target.value)})} 
                     type="number" className="w-full rounded-md border border-gray-400 py-2 px-3"/>
                </div>

                <button  type="submit" className="mt-5 bg-[#2250CB] py-2 rounded-full text-white font-semibold text-sm">Add Food</button>
                <button type="button" onClick={()=>setOpen(false)} className="w-full bg-transparent outline-none text-gray-400 mt-1 text-sm">Close</button>
            </form>
         </div>
      </div> : 
      null
      }
        
        </section>
    )
}

export default AddFoodDiary;