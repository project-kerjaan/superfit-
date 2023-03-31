import { BottomBar } from "../../components";
import { useState,useEffect } from 'react';
import { Link } from "react-router-dom";
import { settingsData } from "../../utils/data";

const Settings = () => {
    return (
        <section className="w-[30vw] py-5 px-7 max-w-[30vw] mx-auto bg-white min-h-screen">
            <div className='flex items-center gap-x-7'>
                <Link to="/profile">
                 <i className="ri-arrow-left-line text-2xl"></i> 
                </Link>
                <h2 className='flex-1 mr-3 text-xl text-center font-bold mb-2 '>Settings</h2>            
              </div>
            <div className="flex flex-col gap-y-3 mt-7">
              {settingsData?.map((item,idx) => (
                <Link key={idx} to={`${item.path}`}>
                   <button  className="w-full text-left font-medium text-gray-500 border-b-2 border-gray-300 py-2">{item?.title}</button>
                </Link>
              ))}
            </div>
        </section>
    )
}

export default Settings;