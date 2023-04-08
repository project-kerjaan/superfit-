import { useState,useEffect } from "react";
import { Brand,SkeletonLoading } from "../../components";
import { fetchFoods } from "../../api/publicApi";
import { Link } from "react-router-dom";

const MealPlan = () => {
    const [foods,setFoods] = useState(null);
    const [loading,setLoading] = useState(false);
   
    useEffect(() => {
     fetchFoods({setFoods,setLoading});
    }, []);

    return (
        <section className="w-[30vw] min-w-[30vw] mx-auto bg-white min-h-screen py-5 px-7">
                <div className='flex items-center gap-x-7'>
                <Link to="/home">
                 <i className="ri-arrow-left-line text-2xl"></i> 
                </Link>
                <h2 className='flex-1 mr-10 text-xl text-center font-bold mb-2 '>Plans</h2>
            </div>
            {loading ? <SkeletonLoading numberOfItems={15} /> : (
                <div className="mt-7 grid grid-cols-2 gap-2">
                {Array.isArray(foods) && foods.map((food, idx) => (
                 <Link key={idx} to={`/home/food-detail/${food?.content?.details?.id}`}>
                  <div className="w-full rounded-lg overflow-hidden bg-gray-500">
                      <img src={food?.display?.images[0]} alt="images" className="object-cover w-full h-[100px]"/>
                      <div className="py-2">
                        <p className="text-white text-sm text-center font-semibold">{food?.type}</p>
                      </div>
                  </div>
                 </Link>
                ))}   
              </div>
            )}
        </section>

    )
}

export default MealPlan;