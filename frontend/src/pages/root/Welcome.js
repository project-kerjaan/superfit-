import images from "../../utils/images";
import { Brand } from "../../components";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Welcome = () => {
   const { auth } = useSelector(state=>state);
   const navigate = useNavigate();

   useEffect(() => {
      if(JSON.parse(localStorage.getItem('page')) && JSON.parse(localStorage.getItem('register_id'))) {
         navigate("/auth/userSetting");
      }

      if(auth.token) {
        navigate("/home");
      }
   }, [auth])
     
    return (
        <section className="flex flex-col w-[27vw] mx-auto bg-white h-screen py-7 px-5">
            <Brand/>
            <div className="flex-1 flex justify-center items-center flex-col mt-14">
                <img src={images.welcome} alt="welcome" className="w-full h-[260px]"/>
                <h4 className="text-center text-3xl text-[#2250CB] mt-9 font-bold capitalize">get your ideal <br/> weight</h4>
                <Link to="/auth">
                <button className=" py-2 px-7 font-semibold mt-7 border-2 border-[#2250CB] text-[#2250CB] rounded-md">Get Started</button>
                </Link>
            </div>
        </section>
    )
}

export default Welcome;