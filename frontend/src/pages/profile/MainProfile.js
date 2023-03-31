import { useState , useEffect } from "react";
import { Outlet , useNavigate } from "react-router-dom";
import { useSelector }from 'react-redux';

const MainProfile = () => {
    const navigate = useNavigate();
    const { auth } = useSelector(state=>state);

    useEffect(() => {
        if(!auth.token) {
           navigate("/auth/login");
        }
    }, [auth]);

    return (
        <Outlet/>
    )
}

export default MainProfile;