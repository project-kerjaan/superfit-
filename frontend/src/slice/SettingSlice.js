import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { openAlert } from "./AlertSlice";

const API = axios.create({
    baseURL:`http://localhost:8080/api/setting`
});

const user = JSON.parse(localStorage.getItem('token'));

API.interceptors.request.use((req) => {
    if(user){
        req.headers.Authorization = `bearer ${user}`;
    }

    return req;
})

export const ChangePassword = createAsyncThunk('setting/update-password'  , async ({ password,  dispatch }) => {
     try {

        const { data } = await API.post("/change-password" , { password });

        if(data) {
            dispatch(openAlert({
                message:data.message,
                variant:"bg-green-50",
                textVariant:'text-green-500'
            }));
        }

     } catch(err) {

        const { response:{ data } } = err;

        dispatch(openAlert({
            message:data.message,
            variant:"bg-red-50",
            textVariant:'text-red-500'
        }));
     }
});

export const DeleteAccount = createAsyncThunk('setting/delete-account' , async ({ password, dispatch , navigate }) => {
    try {

        const { data } = await API.post("/delete-account" , { password });

        dispatch(openAlert({
             message:"Your request is being proceeded",
             variant:"bg-blue-50",
             textVariant:"text-blue-500"
        }));

        if(data) {
            localStorage.setItem('token' , JSON.stringify(null));
            navigate("/auth/login");
        }

    } catch(err) {
        return false;
    }
});