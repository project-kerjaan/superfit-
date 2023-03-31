import React, { useEffect, useState } from 'react';
import images from "../utils/images";
import ArrowNext from './ArrowNext';
import { useDispatch,useSelector } from 'react-redux';
import { userSetting } from '../slice/AuthSlice';
import { useNavigate } from 'react-router-dom';

const Boarding = ({ page,setPage }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [active,setActive] = useState(null);
  const [goal,setGoal] = useState(null);

  const [boardingForm,setBoardingForm] = useState(JSON.parse(localStorage.getItem('boarding_form')) || {
    goal:'',
    active_title:'',
    active_count:'',
    gender:'',
    address:'',
    age:'',
  });

  useEffect(() => {
    localStorage.setItem('boarding_form' , JSON.stringify(boardingForm));
  }, [page]);



  switch(Number(page)) {
     case 1:
     return (
      <div className='w-full mt-12'>
      <h2 className='text-3xl font-bold text-center'>What is your goal</h2>
      <p className='text-gray-400 text-[14px] px-7 text-center mt-3 leading-5'>
      we will use this data to provide you with a better type of diet
      </p>
      <div className="mt-7 flex flex-col gap-y-2">
        <button onClick={() => {
          setGoal(1);
          setBoardingForm({
            ...boardingForm,
            goal:"Lose Weight",
          
          });
        }} className={`${goal == 1 ? "bg-gray-200" : "bg-gray-100"} flex justify-between  py-5 px-3 rounded-md items-center`}>
          <h5 className='font-bold text-[16px]'>Lose Weight</h5>
          <img src={images.lose_weight} alt="lose" className='w-[35px]'/>
        </button>
        <button onClick={() => {
          setGoal(2);
          setBoardingForm({
            ...boardingForm,
            goal:"Gain Weight",
          
          });
        }} className={`${goal == 2 ? "bg-gray-200" : "bg-gray-100"} flex justify-between  py-5 px-3 rounded-md items-center`}>
          <h5 className='font-bold text-[16px]'>Gain Weight</h5>
          <img src={images.gain_weight} alt="lose" className='w-[35px]'/>
        </button>
        <button onClick={() => {
          setGoal(3);
          setBoardingForm({
            ...boardingForm,
            goal:"Stay Healthy",
          
          });
        }} className={`${goal == 3 ? "bg-gray-200" : "bg-gray-100"} flex justify-between  py-5 px-3 rounded-md items-center`}>
          <h5 className='font-bold text-[16px]'>Stay Healthy</h5>
          <img src={images.healthy} alt="lose" className='w-[35px]'/>
        </button>
      </div>
      <div className='flex justify-center mt-14'>
      <ArrowNext onPage={1} setPage={setPage}/>
      </div>
    </div>
     )

     case 2:
     return (
      <div className='w-full mt-12 flex flex-col items-center'>
         <div>
         <h2 className='text-3xl font-bold text-center'>Target Weight</h2>
          <p className='text-gray-400 text-[14px] px-7 text-center mt-3 leading-5'>
      we will use this data to provide you with a better type of diet
      </p>
         </div>
      <img src={images.target_weight} alt='target' className='h-[250px] mt-5'/>
      <div className='mt-7 flex items-center gap-x-2'>
        <div className='bg-gray-100 rounded-md flex items-end gap-x-3 justify-center py-3 px-2'>
         <input onChange={(e)=>setBoardingForm({...boardingForm,height:e.target.value})} type="number" name="height" className='w-[60%] bg-transparent outline-none border-b-2' />
         <h5 className='font-semibold'>CM</h5>
        </div>
        <div className='bg-gray-100 rounded-md flex items-end gap-x-3 justify-center py-3 px-2'>
         <input onChange={(e)=>setBoardingForm({...boardingForm,weight:e.target.value})} type="number" name="weight" className='w-[60%] bg-transparent outline-none border-b-2' />
         <h5 className='font-semibold'>KG</h5>
        </div>
      </div>
      <div className='flex justify-center mt-14'>
      <ArrowNext onPage={2} setPage={setPage}/>
      </div>
      </div>
     )


     case 3:
     return (
      <div className='w-full mt-12 flex flex-col items-center'>
      <div>
          <h2 className='text-3xl font-bold text-center'>What is your goal?</h2>
          <p className='text-gray-400 text-[14px] px-7 text-center mt-3 leading-5'>
      we will use this data to provide you with a better type of diet
      </p>
         </div>
         <div className='w-full mt-7 flex flex-col gap-y-3'>
          <button onClick={()=>{
            setBoardingForm({
              ...boardingForm,
              active_title:'Not Active',
              active_count:1
            });

            setActive(1);
          }} className={`w-full ${active == 1 ? "bg-gray-200" : "bg-gray-100"} py-5 px-3 rounded-md`}>
            <h5 className='text-[16px] font-bold'>Not Active</h5>
            <p className='text-[13px] mt-1 text-gray-400'>Spend most of the day sititing</p>
          </button>
          <button 
          onClick={()=>{
            setBoardingForm({
              ...boardingForm,
              active_title:'Not Active',
              active_count:1.5
            });

            setActive(2);
          }}  className={`w-full ${active == 2 ? "bg-gray-200" : "bg-gray-100"} py-5 px-3 rounded-md`}>
            <h5 className='text-[16px] font-bold'> Active</h5>
            <p className='text-[13px] mt-1 text-gray-400'>Spend most of the day sititing</p>

          </button>
          <button
          onClick={()=>{
            setBoardingForm({
              ...boardingForm,
              active_title:'Very Active',
              active_count:1.9
            });

            setActive(3);
          }} 
           className={`w-full ${active == 3 ? "bg-gray-200" : "bg-gray-100"} py-5 px-3 rounded-md`}>
            <h5 className='text-[16px] font-bold'>Very Active</h5>
            <p className='text-[13px] mt-1 text-gray-400'>Spend most of the day sititing</p>

          </button>
         </div>
         <div className='flex justify-center mt-14'>
      <ArrowNext onPage={3} setPage={setPage}/>
      </div>
      </div>
     )

     case 4:
     return (
      <div className='w-full mt-12'>
         <div>
         <h2 className='text-3xl font-bold text-center'>Your Data</h2>
         <p className='text-gray-400 text-[14px] px-7 text-center mt-3 leading-5'>
      we will use this data to provide you with a better type of diet
      </p>
         </div>
         <div className='mt-8'>
           <div>
            <h5 className="text-md font-semibold text-center">Please select your gender identity</h5>
            <div className="flex flex-row gap-x-2 mt-5">
              <button
               onClick={()=>setBoardingForm({...boardingForm , gender:"male"})}
               className={`flex-1  py-2 px-3 rounded-md ${boardingForm.gender === "male" ? "bg-gray-200" : "bg-gray-100"}`}
               >Male</button>
              <button 
               onClick={()=>setBoardingForm({...boardingForm , gender:"female"})}
              className={`flex-1  py-2 px-3 rounded-md ${boardingForm.gender === "female" ? "bg-gray-200" : "bg-gray-100"}`}
              >Female</button>

            </div>
           </div>
           <div className='mt-7 text-center'>
           <h5 className="text-md font-semibold text-center">How old are you?</h5>
           <input onChange={(e)=>setBoardingForm({...boardingForm,[e.target.name]:e.target.value})} type="number" className='bg-gray-100 text-center outline-none py-2 px-3 rounded-md mt-3' name="age"/>
           </div>
           <div className='mt-7'>
           <h5 className="text-md font-semibold text-center">Where you live?</h5>
           <input onChange={(e)=>setBoardingForm({...boardingForm,[e.target.name]:e.target.value})} type="text" className='w-full text-center bg-gray-100 outline-none py-2 px-3 rounded-md mt-3' name="address"/>
           </div>
         </div>
         <div className='flex justify-center mt-14'>
         <button onClick={() => dispatch(userSetting({ boardingForm,navigate,dispatch }))} className="w-[80px] h-[80px] rounded-full bg-[#2250CB] flex justify-center items-center">
      <i class="ri-arrow-right-s-line text-white text-5xl"></i>
    </button>
      </div>
      </div>
     )

  }
}

export default Boarding