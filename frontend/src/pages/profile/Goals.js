import React from 'react';
import { BottomBar } from "../../components";
import { Link } from 'react-router-dom';

const Goals = () => {
    return (
        <section className='w-[30vw] max-w-[30vw] py-5 px-7 mx-auto bg-white min-h-screen relative'>
            <div className='flex items-center gap-x-7'>
                <Link to="/profile">
                 <i className="ri-arrow-left-line text-2xl"></i> 
                </Link>
                <h2 className='flex-1 mr-7 text-xl text-center font-bold mb-2 '>Your Goals</h2>
            </div>
        </section>
    )
}

export default Goals;