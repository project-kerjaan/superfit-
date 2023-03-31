import { useState } from 'react';
import { Brand,Alert } from "../../components";
import { useParams,Link , useNavigate, useLocation } from 'react-router-dom';
import { ChangePassword,DeleteAccount } from '../../slice/SettingSlice';
import { useSelector,useDispatch } from 'react-redux';

const Password = () => {
    const navigate = useNavigate();
    const { alert } = useSelector(state=>state);
    const { pathname } = useLocation();
    const [password,setPassword] = useState("");
    const dispatch = useDispatch();

    const submitHandler = (e) => {
       e.preventDefault();
       
       if(pathname.includes("change")) {
         dispatch(ChangePassword({ dispatch,password }));
       } else {
          dispatch(DeleteAccount({ dispatch ,password, navigate }));
       }
    }

    return (
        <section className='w-[30vw] min-w-[30vw] mx-auto bg-white min-h-screen py-5 px-7'>
            <Brand/>
            <div className='mt-12'>
            {alert.open ? <Alert/> : null}
                <h2 className='text-center text-3xl font-semibold'>{typeof pathname === "string" && pathname.includes("change") ? "Change Password" : "Delete Account"}</h2>
                <form onSubmit={submitHandler} className='w-full mt-7'>
                   <p className='text-center text-[#2250CB] text-md font-semibold'>Enter your current password</p>

                   <div className='mt-7 flex flex-col'>
                    <label className='text-[#2250CB] text-sm font-semibold'>Enter password</label>
                    <input onChange={(e)=>setPassword(e.target.value)} type="password" name="password" className='w-full border-b-2 pb-2 border-gray-500 outline-none'/>
                   </div>
                   <div className='text-center mt-7'>
                    <button className='bg-[#2250CB] text-white text-md font-semibold py-3 px-7 rounded-full'>Send Password</button>
                   </div>
                 <Link to="/settings">
                 <p className="text-center font-semibold text-gray-500 text-sm mt-3">
                    Back
                   </p>
                 </Link>
                </form>
            </div>
        </section>
    )
}

export default Password;