import { useDispatch } from 'react-redux';

const ArrowNext = ({ onPage,setPage }) => {
  
  return (
    <button onClick={()=>setPage(onPage+1)} className="w-[80px] h-[80px] rounded-full bg-[#2250CB] flex justify-center items-center">
      <i class="ri-arrow-right-s-line text-white text-5xl"></i>
    </button>
  )
}

export default ArrowNext