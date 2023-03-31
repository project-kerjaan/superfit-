import { useState } from "react";
import { Link } from 'react-router-dom';

const Settings = () => {
    return (
        <section className="w-[30vw] max-w-[30vw] bg-white min-h-screen py-5 px-7 mx-auto">
               <div className='flex items-center gap-x-7'>
                <Link to="/profile">
                 <i className="ri-arrow-left-line text-2xl"></i> 
                </Link>
                <h2 className='flex-1 mr-3 text-xl text-center font-bold mb-2 '>Recipe Details</h2>
                <div className="mt-7">
                
                </div>
            </div>
        </section>
    )
}

export default Settings;