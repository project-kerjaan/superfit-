import { useState } from 'react';
import images from '../../utils/images';
import { Link } from 'react-router-dom';

const Friends = () => {
    return (
        <section className='min-w-[30vw] py-5 px-7 w-[30vw] mx-auto bg-white min-h-screen relative'>
              <div className='flex items-center gap-x-7'>
                <Link to="/profile">
                 <i className="ri-arrow-left-line text-2xl"></i> 
                </Link>
                <h2 className='flex-1 mr-5 text-xl text-center font-bold mb-2'>Invite Friends</h2>
            </div>
            <div className='mt-14'>
               <h2 className='text-3xl font-bold text-[#2250CB]'>Let's invite friends to <br/>try superfit!</h2>
               <p className='text-gray-500 font-medium text-sm mt-5'>
               so they can try to feel that it's great to be helped by superfit
               </p>
               <button className='bg-[#2250CB] text-white rounded-full font-semibold text-sm mt-10  py-3 px-5'>Invite Friends</button>
            </div>
          <img src={images.friends} alt="friend illustration" className='w-full h-[400px] absolute bottom-0 left-0'/>
        </section>
    )
}

export default Friends;