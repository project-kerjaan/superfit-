import { Link } from 'react-router-dom';

const BottomBar = ({ page }) => {

    return (
        <div className="w-full absolute bottom-0 left-0 bg-gray-50 py-2 px-7 flex items-center justify-between">
            <Link to="/">
                <button className={`flex flex-col items-center  gap-y-1 ${page === "home" ? "text-gray-200" : "text-gray-400"}`}>
                <i className="ri-home-line text-xl"></i>
                <p className='text-[13px] font-medium'>Home</p>
                </button>
            </Link>
            <Link to="/food-diary">
                <button className={`flex flex-col items-center  gap-y-1 ${page === "food diary" ? "text-gray-200" : "text-gray-400"}`}>
                <i className="ri-todo-line text-xl"></i>
                <p className='text-[13px] font-medium'>Food Diary</p>
                </button>
            </Link>
            <Link to="/">
                <button className={`flex flex-col items-center  gap-y-1 ${page === "meal plan" ? "text-gray-200" : "text-gray-400"}`}>
                <i className="ri-file-list-3-line text-xl"></i>
                <p className='text-[13px] font-medium'>Meal Plan</p>
                </button>
            </Link>
            <Link to="/profile">
                <button className={`flex flex-col items-center  gap-y-1 ${page === "profile" ? "text-gray-200" : "text-gray-400"}`}>
                <i className="ri-user-3-line text-xl"></i>
                <p className='text-[13px] font-medium'>Profile</p>
                </button>
            </Link>
        </div>
    )
}

export default BottomBar;