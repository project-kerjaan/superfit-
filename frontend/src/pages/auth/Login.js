import { Brand,Alert } from "../../components";
import { Link , useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { loginHandler } from "../../slice/AuthSlice";
import { openAlert } from "../../slice/AlertSlice";

const Login = () => {
  const navigate = useNavigate();
  const { alert, auth } = useSelector(state=>state);
  const dispatch = useDispatch();
  const [loading,setLoading] = useState(false);
  const [loginForm,setLoginForm] = useState({
     email:'',
     password:''
  });

  const changeHandler = (e) => setLoginForm({...loginForm, [e.target.name]:e.target.value});

  const submitHandler = (e) => {
    e.preventDefault();

   dispatch( openAlert({
    message:"Authenticating user...",
    variant:'bg-blue-50',
    textVariant:'text-blue-500',
    open:true 
 }));

    dispatch(loginHandler({ loginForm,dispatch  }));
  }

  useEffect(() => {
    if(auth.token) {
       navigate('/home');
    }
  }, [auth])

  return (
    <section className="min-w-[27vw] mx-auto bg-white h-screen py-7 px-7">
        <Brand/>
        <div className="mt-14">
          {alert.open ? <Alert/> : null}
            <h2 className="text-4xl text-center font-semibold">Login</h2>
            <form onSubmit={submitHandler} className="mt-10 flex flex-col gap-y-4">
                <div className="flex flex-col gap-y-2">
                    <label className="text-[#2250CB] text-md font-semibold">Email</label>
                    <input value={loginForm.email} onChange={changeHandler} type='email' name='email' className="outline-none border-b border-gray-400 rounded-md pb-2 w-full"/>
                </div>
                <div className="flex flex-col gap-y-2">
                    <label className="text-[#2250CB] text-md font-semibold">Password</label>
                    <input value={loginForm.password} onChange={changeHandler} type='password' name='password' className="outline-none border-gray-400 border-b pb-2 rounded-md w-full"/>
                </div> 
            
             <button type='submit' className="bg-[#2250CB] text-white rounded-full font-semibold text-md mt-5 py-2">Login</button>
             <p className="text-center text-sm text-gray-400 mt-1">
                Don't have account? <Link to="/auth/register">
                    <span className="text-[#2250CB] font-semibold">Register</span>
                </Link>
             </p>
            </form>
        </div>
    </section>
  )
}

export default Login