import { useState } from "react";

const SkeletonLoading = ({ numberOfItems }) => {
    const [items,setItems] = useState([]);

    for(let i = 0; i < numberOfItems; i++) {
        items.push(i);
    }

    return (
        <div className="grid mt-5 grid-cols-3 gap-3">
          {items.map((item, idx)=> (
            <div key={idx} className="w-full h-[130px] rounded-lg skeleton-item"></div>
          ))}
        </div>
    )
}

export default SkeletonLoading;