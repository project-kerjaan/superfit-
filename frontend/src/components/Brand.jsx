import images from "../utils/images";

const Brand = () => {
    return (
        <div className="flex  items-center gap-x-2">
            <img src={images.logo} alt="logo" className="w-[24px] h-[24px]"/>
            <h5 className="font-extrabold uppercase text-sm text-[#2250CB]">Superfit</h5>
        
        </div>
    )
}

export default Brand;