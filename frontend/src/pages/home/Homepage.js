import images from "../../utils/images";
import { BottomBar, SkeletonLoading } from "../../components";
import axios from "axios";
import { useEffect,useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { fetchFoods } from "../../api/publicApi";
import { useSelector } from "react-redux";
import { Link  , useNavigate } from "react-router-dom";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Pagination } from "swiper";

const headers = {
   Authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
}

const Homepage = () => {
  const navigate = useNavigate();

  const { auth } = useSelector(state=>state);
  const [calories,setCalories] = useState(null);
  const [macros,setMacros] = useState(null);
  const [foods,setFoods] = useState(null);
  const [loading,setLoading] = useState(false);

  const fetchCalories = async () => {
      const { data } = await axios.get(`http://localhost:8080/api/home/calories`, {
        headers:headers
      });
  
      setCalories(data.results.caloriesAll);
      setMacros(data.results.macrosAll);
  }

  useEffect(() => {

    if(!auth.token) {
       navigate("/auth/login");
    }
      fetchCalories();
      fetchFoods({setFoods,setLoading});
      
  },[auth]);

  const caloriesRange = (calories?.calories_remaining  / Math.floor(calories?.calories_total)) * 100;

    return (
        <section className="relative max-w-[30vw] w-[30vw] py-7 px-7 min-h-screen bg-white mx-auto">
        <Link to="/profile">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-2">
              <img src={images.user} alt="user" className="w-[36px] h-[36px] rounded-full"/>
              <h5 className="text-md font-bold">{auth?.user?.name}</h5>
            </div>
            <button className="text-xl">
            <i class="ri-notification-3-line"></i>
            </button>
          </div>
        </Link>

         {/* calories count */}
         <Swiper
          slidesPerView={1}
          spaceBetween={20}
          pagination={{
            clickable: true,
          }}
          className="mySwiper mt-7"
          modules={[Pagination]}
         >
            <SwiperSlide>
            <div className="w-full rounded-lg bg-blue-50 py-3 px-4">
              <h2 className="font-bold text-[#2250CB] text-lg capitalize">calories</h2>
              <div className="flex flex-col gap-y-2 mt-4">
                <div className="flex flex-col gap-y-2">
                  <div className="flex justify-between items-center">
                    <h5 className="text-gray-500 text-sm font-medium">
                      <span className="font-bold">{calories?.calories_remaining}</span> 
                      {" "} / {" "}
                       {typeof calories?.calories_total == 'number' ?  Math.floor(calories?.calories_total) : 0}</h5>
                    <h5 className="text-gray-500 text-sm">Remaining</h5>
                  </div>
                  <div className="w-full bg-gray-300 rounded-full h-[4px]">
                    <span style={{
                      width:`${caloriesRange + "%"}`
                    }} className="block bg-[#2250CB] h-[4px] rounded-full"></span>
                  </div>
                </div>
                <div className="flex flex-col gap-y-2">
                  <div className="flex justify-between items-center">
                    <h5 className="text-gray-500 font-medium text-sm">Food</h5>
                    <h5 className="text-gray-500 text-sm">0</h5>
                  </div>
                  <div className="w-full bg-gray-300 rounded-full h-[4px]">
                    <span className="block w-full"></span>
                  </div>
                </div>
                <div className="flex flex-col gap-y-2">
                  <div className="flex justify-between items-center">
                    <h5 className="text-gray-500 font-medium text-sm">Exercise</h5>
                    <h5 className="text-gray-500 text-sm">0 {" "} (coming soon)</h5>
                  </div>
                  <div className="w-full bg-gray-300 rounded-full h-[4px]">
                    <span className="block w-full"></span>
                  </div>
                </div>
              </div>
             </div>
            </SwiperSlide>
            <SwiperSlide>
            <div className="w-full rounded-lg bg-blue-50 py-3 px-4">
              <h2 className="font-bold text-[#2250CB] text-lg capitalize">Macros</h2>
              <div className="flex flex-col gap-y-2 mt-4">
                <div className="flex flex-col gap-y-2">
                  <div className="flex justify-between items-center">
                    <h5 className="text-gray-500 text-sm font-medium">Carbohdyrates</h5>
                    <h5 className="text-gray-500 text-sm">{macros?.carbohdyrates_count}</h5>
                  </div>
                
                </div>
                <div className="flex flex-col gap-y-2">
                  <div className="flex justify-between items-center">
                    <h5 className="text-gray-500 text-sm font-medium">Fat</h5>
                    <h5 className="text-gray-500 text-sm">{macros?.fat_count}</h5>
                  </div>
              
                </div>
                <div className="flex flex-col gap-y-2">
                  <div className="flex justify-between items-center">
                    <h5 className="text-gray-500 text-sm font-medium">Protein</h5>
                    <h5 className="text-gray-500 text-sm">{macros?.protein_count}</h5>
                  </div>
              
                </div>
              </div>
             </div>
            </SwiperSlide>
         </Swiper>
         {/* exp banner */}
         <div className="bg-blue-50 mt-7 py-5 px-4 rounded-md flex justify-between items-center">
           <div className="flex flex-col gap-y-2">
            <h2 className="text-2xl text-[#2250CB] font-bold">Level 1</h2>
            <p className="text-gray-500 text-sm font-medium">0 / 100</p>
           </div>
           <i className="ri-award-line text-4xl text-[#2250CB]" ></i>
         </div>
         <div className="mt-7 flex justify-between">
          <h2 className="text-md font-bold text-gray-500">Food Recipes</h2>
          <button className="text-[12px] font-semibold text-gray-500">See More</button>
         </div>
         {loading ? <SkeletonLoading/> : (
          <Swiper
          slidesPerView={2}
          spaceBetween={8}
          pagination={{
            clickable: true,
          }}
          className="mySwiper mt-4"
        >
         {Array.isArray(foods) && foods.map((item,idx) => (
          <SwiperSlide className="w-full" key={idx}>
           <Link to={`/home/food-detail/${item?.content?.details?.id}`}>
           <img src={item?.display?.images[0]} alt="food" className="w-full rounded-md h-[140px]"/>
            <div className="py-2">
              <h5 className="text-gray-500 font-semibold text-[13px]">
                {item?.display?.displayName.length > 25 ? `${item?.display?.displayName.substring(0,15)}...` : item?.display?.displayName}
              </h5>
            </div>
           </Link>
          </SwiperSlide>
         ))}
        </Swiper>
         )}
          <BottomBar page="home" />
        </section>
    )
}

export default Homepage;