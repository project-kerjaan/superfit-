import { Brand,Alert } from "../../components"
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { registerHandler } from "../../slice/AuthSlice";
import { openAlert } from "../../slice/AlertSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { alert } = useSelector(state=>state);
  const [registerForm,setRegisterForm] = useState({
    name:'',
    email:'',
    password:'',
    confirm:''
 });

 const changeHandler = (e) => setRegisterForm({...registerForm, [e.target.name]:e.target.value});

 const submitHandler = (e) => {
   e.preventDefault();

   dispatch( openAlert({
    message:"Creating user...",
    variant:'bg-blue-50',
    textVariant:'text-blue-500',
    open:true 
 }));
 
  dispatch(registerHandler({ registerForm , dispatch, navigate }));

 }
  


  return (
    <section className="min-w-[30vw]  mx-auto bg-white min-h-screen px-7 py-7">
        <Brand/>
        <div className="mt-14">
            {alert.open ? <Alert/> : null}
            <h2 className="text-4xl text-center font-semibold">Register</h2>
            <form onSubmit={submitHandler} className="mt-10 flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-2">
                    <label className="text-[#2250CB] text-md font-semibold">Username</label>
                    <input value={registerForm.name} onChange={changeHandler} type='text' name='name' className="outline-none border-b-2 pb-2 w-full"/>
                </div>
                <div className="flex flex-col gap-y-2">
                    <label className="text-[#2250CB] text-md font-semibold">Email</label>
                    <input value={registerForm.email} onChange={changeHandler} type='email' name='email' className="outline-none border-b-2 pb-2 w-full"/>
                </div>
                <div className="flex flex-col gap-y-2">
                    <label className="text-[#2250CB] text-md font-semibold">Password</label>
                    <input value={registerForm.password} onChange={changeHandler} type='password' name='password' className="outline-none border-b-2 pb-2 w-full"/>
                </div> 
                <div className="flex flex-col gap-y-2">
                    <label className="text-[#2250CB] text-md font-semibold">Confirm</label>
                    <input value={registerForm.confirm} onChange={changeHandler} type='password' name='confirm' className="outline-none border-b-2 pb-2 w-full"/>
                </div> 
             <button type='submit' className="bg-[#2250CB] text-white rounded-full font-semibold text-md mt-5 py-2">Register</button>
             <p className="text-center text-sm text-gray-400 mt-1">
               Already have account? <Link to="/auth/login">
                    <span className="text-[#2250CB] font-semibold">Login</span>
                </Link>
             </p>
            </form>
        </div>
    </section>
    )
}

export default Register