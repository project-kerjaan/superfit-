import { Link } from "react-router-dom";
import { Alert } from "../../components";
import { useSelector } from "react-redux";
import axios from "axios";
import { useState, useEffect } from "react";

const headers = {
    Authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
};

const EditProfile = () => {
   const { alert } = useSelector(state=>state);
   const [profile,setProfile] = useState(null);
   const [open,setOpen] = useState(false);

   const fetchProfile = async () => {
      const { data } = await axios.get(`http://localhost:8080/api/profile/user` , {
        headers:headers 
      });

      setProfile(data);
   }

   useEffect(()  => {
       fetchProfile();
   }, []);

   const submitHandler = async (e) => {
       e.preventDefault();

       const { data } = await axios.put('http://localhost:8080/api/setting/update-profile',profile , {
        headers:headers 
       });

       if(data) {
          setProfile(data);
       }
   }

   const changeHandler = (e) => setProfile({...profile,[e.target.name]:e.target.value});

    return (
        <section className="w-[30vw] py-5 px-7 mx-auto max-w-[30vw] bg-white min-h-screen">
             <div className='flex items-center gap-x-7'>
                <Link to="/settings">
                 <i className="ri-arrow-left-line text-2xl"></i> 
                </Link>
                <h2 className='flex-1 mr-3 text-xl text-center font-bold mb-2 '>Edit Profile</h2>
            </div>
            <div className="flex flex-col gap-y-3 mt-7">
                <div className="flex justify-between items-center border-b py-2 border-gray-300">
                    <h5 className="text-md capitalize text-gray-500 font-semibold">Username</h5>
                    <h5 className="text-md capitalize text-gray-500 font-semibold">{profile?.name}</h5>
                    
                </div>
                <div className="flex justify-between items-center border-b py-2 border-gray-300">
                    <h5 className="text-md capitalize text-gray-500 font-semibold">Height</h5>
                    <h5 className="text-md capitalize text-gray-500 font-semibold">{profile?.height} CM</h5>
                    
                </div>
                <div className="flex justify-between items-center border-b py-2 border-gray-300">
                    <h5 className="text-md capitalize text-gray-500 font-semibold">Weight</h5>
                    <h5 className="text-md capitalize text-gray-500 font-semibold">{profile?.weight} KG</h5>
                    
                </div>
                <div className="flex justify-between items-center border-b py-2 border-gray-300">
                    <h5 className="text-md capitalize text-gray-500 font-semibold">Gender</h5>
                    <h5 className="text-md capitalize text-gray-500 font-semibold">{profile?.gender} </h5>
                    
                </div>
                 <div className="flex justify-between items-center border-b py-2 border-gray-300">
                    <h5 className="text-md capitalize text-gray-500 font-semibold">Birthday</h5>
                    <h5 className="text-md capitalize text-gray-500 font-semibold">{profile?.birthday} </h5>
                    
                </div>
                <div className="flex justify-between items-center border-b py-2 border-gray-300">
                    <h5 className="text-md capitalize text-gray-500 font-semibold">Location</h5>
                    <h5 className="text-md capitalize text-gray-500 font-semibold">{profile?.address} </h5>
                    
                </div>
                <div className="flex justify-between items-center border-b py-2 border-gray-300">
                    <h5 className="text-md capitalize text-gray-500 font-semibold">Email</h5>
                    <h5 className="text-md capitalize text-gray-500 font-semibold">{profile?.email} </h5>
                    
                </div>
                <div className="flex justify-between items-center border-b py-2 border-gray-300">
                    <h5 className="text-md capitalize text-gray-500 font-semibold">Phone</h5>
                    <h5 className="text-md capitalize text-gray-500 font-semibold">{profile?.phone} </h5>
                    
                </div>
            </div>
            {/* modal */}

           {open && (
             <div className="w-[30vw] min-w-[30vw] fixed top-0 left-[50%] px-5 -translate-x-[50%] min-h-screen flex justify-center items-center" style={{backgroundColor:"rgba(10,10,10,0.5)"}}>
             <div className="w-full bg-white py-5 px-5 rounded-lg">
                <h2 className="text-xl font-bold text-center">Update Profile</h2>
                <form onSubmit={submitHandler} className="mt-5 px-4 flex flex-col gap-y-3">
                    <input onChange={changeHandler} value={profile?.name} type="text" name="name" placeholder="Username" className="w-full rounded-md py-2 px-3 border border-gray-400"/>
                    <input onChange={changeHandler} value={profile?.height} type="text" name="height" placeholder="Height" className="w-full rounded-md py-2 px-3 border border-gray-400"/>
                    <input onChange={changeHandler} value={profile?.weight} type="text" name="weight" placeholder="Weight" className="w-full rounded-md py-2 px-3 border border-gray-400"/>
                    <input onChange={changeHandler} value={profile?.gender} type="text" name="gender" placeholder="Gender" className="w-full rounded-md py-2 px-3 border border-gray-400"/>
                    <input onChange={changeHandler} value={profile?.birthday} type="date" name="birthday" placeholder="Birthday" className="w-full rounded-md py-2 px-3 border border-gray-400"/>
                    <input onChange={changeHandler} value={profile?.address} type="text" name="address" placeholder="Location" className="w-full rounded-md py-2 px-3 border border-gray-400"/>
                    <input onChange={changeHandler} value={profile?.email} type="email" name="email" placeholder="Email" className="w-full rounded-md py-2 px-3 border border-gray-400"/>
                    <input onChange={changeHandler} value={profile?.phone} type="text" name="phone" placeholder="Phone" className="w-full rounded-md py-2 px-3 border border-gray-400"/>
                    <button type="submit" className="w-full mt-5 py-2 rounded-full bg-[#2250CB] text-white text-sm font-semibold">Submit</button>
                    <button onClick={()=>setOpen(false)} type="button" className="text-center text-gray-400 ">Close</button>
                </form>
             </div>
        </div>
           )}

            {/* modal */}

            <button onClick={()=>setOpen(true)} className="w-full bg-[#2250CB] text-sm mt-10 text-white py-2 rounded-full font-semibold">Update Profile</button>
        </section>
    )
}

export default EditProfile;