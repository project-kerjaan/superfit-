import { BottomBar } from '../../components';
import images from '../../utils/images';
import { useSelector,useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect,useState } from 'react';
import { logoutHandler, updateAvatar } from '../../slice/AuthSlice';

const Profile = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { auth } = useSelector(state=>state);

   useEffect(() => {
    if(!auth.token) {
       navigate("/auth/login");
    }
   }, [auth]);

   const imageHandler = (element) => {
    let file = element.target.files[0];
    let reader = new FileReader();
    reader.onloadend = function() {
       dispatch(updateAvatar({ file:reader.result,username:auth?.user?.name }));
    }
    reader.readAsDataURL(file);
   }


    return (
        <section className='relative py-5 px-7 w-[29vw] min-w-[30vw] min-h-screen bg-white mx-auto'>
           <h2 className='text-xl font-bold capitalize'>my profile</h2>
           <div className='flex items-center mt-5 gap-x-4'>
            <input onChange={imageHandler} type="file" className='hidden' name="profile" id="profile"/>
           <label for="profile" className='cursor-pointer'>
           {auth?.user?.profile ? <img className='w-[70px] h-[70px] rounded-full' src={`${auth?.user?.profile}`} alt="profile"/> : <img src={images.user} alt="user" className='w-[60px] h-[60px] rounded-full'/>}
           </label>
            <div>
                <h4 className='text-xl font-bold'>{auth?.user?.name}</h4>
                <p className='text-gray-500 text-sm  font-medium'>100 XP</p>
            </div>
           </div>
           <div className='mt-7'>
           <h2 className='text-xl font-bold capitalize'>account</h2>
            <div className='flex flex-col gap-y-3 mt-5'>
               <Link to="/profile/goals">
               <div className='flex justify-between items-center'>
                    <span className='flex items-center gap-x-5'>
                    <i class="ri-record-circle-line text-[25px] text-[#2250CB]"></i>
                    <p className='text-md font-semibold text-[#2250CB]'>Goals</p>
                    </span>
                <i class="ri-arrow-right-s-line text-2xl text-gray-500"></i>
                </div>
               </Link>
                <div className='flex justify-between items-center'>
                    <span className='flex items-center gap-x-5'>
                    <i class="ri-checkbox-circle-line text-[25px] text-[#2250CB]"></i>
                    <p className='text-md font-semibold text-[#2250CB]'>Badges</p>
                    </span>
                <i class="ri-arrow-right-s-line text-2xl text-gray-500"></i>
                </div>
              <Link to="/profile/friends">
              <div className='flex justify-between items-center'>
                    <span className='flex items-center gap-x-5'>
                    <i class="ri-user-search-line text-[25px] text-[#2250CB]"></i>
                    <p className='text-md font-semibold text-[#2250CB]'>Friends</p>
                    </span>
                <i class="ri-arrow-right-s-line text-2xl text-gray-500"></i>
                </div>
              </Link>
                <Link to="/settings">
                <div className='flex justify-between items-center'>
                    <span className='flex items-center gap-x-5'>
                    <i class="ri-settings-3-line text-[25px] text-[#2250CB]"></i>
                    <p className='text-md font-semibold text-[#2250CB]'>Settings</p>
                    </span>
                <i class="ri-arrow-right-s-line text-2xl text-gray-500"></i>
                </div>
                </Link>
                <div className='flex justify-between items-center'>
                    <span className='flex items-center gap-x-5'>
                    <i class="ri-question-line text-[25px] text-[#2250CB]"></i>
                    <p className='text-md font-semibold text-[#2250CB]'>Questions</p>
                    </span>
                <i class="ri-arrow-right-s-line text-2xl text-gray-500"></i>
                </div>
            </div>
            <div className='flex justify-center absolute bottom-28 left-0 px-5 w-full'>
                <button onClick={()=>dispatch(logoutHandler())} className='text-md text-white capitalize bg-[#2250CB] font-semibold py-2 w-full rounded-full'>log out</button>
            </div>
           </div>
           <BottomBar page="profile"/>
        </section>

    )
}

export default Profile;