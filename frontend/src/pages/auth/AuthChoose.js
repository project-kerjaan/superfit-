import React from 'react';
import images from '../../utils/images';
import { Link } from 'react-router-dom';

const AuthChoose = () => {
  return (
    <section className='w-[27vw] mx-auto bg-[#2250CB] px-7 h-screen flex flex-col justify-center'>
       <div className='flex flex-col items-center text-center'>
       <img src={images.logo_white} alt="logo_white" className='w-[100px]'/>
       <h2 className='text-2xl uppercase text-white font-extrabold mt-3'>superfit</h2>
       </div>
       <div className='flex flex-col gap-y-3 mt-14'>
       <Link to='/auth/login'> <button className='bg-white text-[#2250CB] py-2 w-full text-lg font-semibold rounded-full'>Login</button></Link>
       <Link to='/auth/register'> <button className='bg-white text-[#2250CB] py-2 w-full text-lg font-semibold rounded-full'>Register</button></Link>
       </div>
    </section>
  )
}

export default AuthChoose