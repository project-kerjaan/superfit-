import { Link } from "react-router-dom";
import { BottomBar } from "../../components";
import { useSelector } from "react-redux";

const FoodDiary = () => {
    const { foodDiary:{ allDiaries } } = useSelector(state=>state);


    return (
        <section className="w-[30vw] max-w-[30vw] mx-auto bg-white min-h-screen py-5 px-7 relative">
                <div className='flex items-center gap-x-7'>
                <h2 className='text-xl font-bold mb-2 text-center'>Food Diary</h2>
            </div>
            <div className="mt-7 flex flex-col gap-y-3">
                <div className="bg-blue-50 rounded-sm  px-3">
                    <div className="border-b-2 flex items-center justify-between border-gray-500 py-2">
                        <p className="font-bold text-[15px]">Exercises</p>
                        <p>0</p>
                    </div>
                  <div className="py-2">
                  <Link to="/food-diary/add?type=Exercises">
                        <p className="text-[#2250CB] font-bold text-[15px]">Add Food</p>
                    </Link>
                  </div>
                </div>
                <div className="bg-blue-50 rounded-sm  px-3">
                    <div className="border-b-2 flex justify-between border-gray-500 py-2">
                        <p className="font-bold text-[15px]">Breakfast</p>
                        <p className="font-semibold">
                          {allDiaries.filter(item=>item.type === "Breakfast").length}
                        </p>
                    </div>
                    <div className="py-2">
                  <Link to="/food-diary/add?type=Breakfast">
                        <p className="text-[#2250CB] font-bold text-[15px]">Add Food</p>
                    </Link>
                  </div>
                </div>
                <div className="bg-blue-50 rounded-sm  px-3">
                    <div className="border-b-2 flex justify-between border-gray-500 py-2">
                        <p className="font-bold text-[15px]">Lunch</p>
                        <p>{allDiaries.filter(item=>item.type==="Lunch").length}</p>
                    </div>
                    <div className="py-2">
                  <Link to="/food-diary/add?type=Lunch">
                        <p className="text-[#2250CB] font-bold text-[15px]">Add Food</p>
                    </Link>
                  </div>
                </div>
                     <div className="bg-blue-50 rounded-sm  px-3">
                    <div className="border-b-2 flex justify-between border-gray-500 py-2">
                        <p className="font-bold text-[15px]">Dinner</p>
                        <p>
                        {allDiaries.filter(item=>item.type==="Dinner").length}
                        </p>
                    </div>
                    <div className="py-2">
                  <Link to="/food-diary/add?type=Dinner">
                        <p className="text-[#2250CB] font-bold text-[15px]">Add Food</p>
                    </Link>
                  </div>
                </div>
            </div>
            <BottomBar page="food diary"/>
        </section>
    )
}

export default FoodDiary;