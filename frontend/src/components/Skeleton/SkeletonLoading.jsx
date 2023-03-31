
const SkeletonLoading = () => {
    return (
        <div className="grid mt-5 grid-cols-3 gap-3">
            <div className="skeleton-item w-full h-[150px] rounded-lg"></div>
            <div className="skeleton-item w-full h-[150px] rounded-lg"></div>
            <div className="skeleton-item w-full h-[150px] rounded-lg"></div>
        </div>
    )
}

export default SkeletonLoading;