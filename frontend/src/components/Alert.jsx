import { useSelector,useDispatch } from "react-redux";
import { closeAlert } from "../slice/AlertSlice";

const Alert = () => {
    const dispatch = useDispatch();
    const { textVariant,variant ,message } = useSelector(state=>state.alert);

    return (
        <div className={`w-full flex mb-5 justify-between items-center py-2 px-3 ${variant} rounded-md`}>
            <h5 className={`font-semibold text-md ${textVariant}`}>{message}</h5>
            <button onClick={()=>dispatch(closeAlert())} className={`${textVariant} font-bold text-sm`}>x</button>
        </div>
    )
}

export default Alert;