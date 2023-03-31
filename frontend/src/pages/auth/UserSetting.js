import { Brand,Boarding } from "../../components";
import React from 'react';
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Alert } from "../../components";

const UserSetting = () => {
  const navigate = useNavigate();
  const { alert,auth } = useSelector(state=>state);
  const [page,setPage] = useState(JSON.parse(localStorage.getItem('page')) || null);

  useEffect(() => {

    if(!page && !auth.token) {
       navigate("/auth/login");
    }

    localStorage.setItem('page' , JSON.stringify(page));
  },[page]);


  return (
    <section className='w-[27vw] min-h-screen mx-auto bg-white px-7 py-7'>
        <Brand/>
        {alert.open ? <Alert/> : null}
        <Boarding page={page} setPage={setPage}/>
    </section>
  )
}

export default UserSetting