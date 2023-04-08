import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchFood } from "../../api/publicApi";


const FoodDetail = () => {
    const { id } = useParams();
    const [food,setFood] = useState(null);


    useEffect(() => {
     fetchFood(id,setFood);
    }, []);

    return (
        <section className="w-[30vw] py-5 px-7 mx-auto max-w-[30vw] bg-white min-h-screen overflow-y-scroll">
                <div className='flex items-center gap-x-7'>
                <Link to="/home">
                 <i className="ri-arrow-left-line text-2xl"></i> 
                </Link>
                <h2 className='flex-1 mr-8 text-xl text-center font-bold mb-2 '>Recipe Details</h2>
            </div>
            <div className="mt-5">
                <img className="w-full h-[250px] rounded-lg" src={food?.display?.images[0]}/>
                <div className="py-5">
                    <h2 className="text-md font-semibold">{food?.display?.displayName}</h2>
                    <p className="mt-2 text-gray-500 text-sm font-medium">Recipe Type : {food?.recipeType[0]}</p>
                    <p className="mt-4  font-bold text-md">Ingredients</p>
                    <ul className="mt-2 space-y-2">
                        {food?.content?.ingredientLines?.map((item,idx) => (
                            <li className="text-sm text-gray-500" key={idx}>{item?.wholeLine}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default FoodDetail;