import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { openAlert } from './AlertSlice';

const API = axios.create({
    baseURL:`http://localhost:8080/api/auth`
});

const user = JSON.parse(localStorage.getItem('token'));

export const loginHandler = createAsyncThunk('auth/login' , async ({ loginForm, dispatch }) => {
      try {
        const { data } = await API.post('/login' , loginForm);

        if(data) {
            return data;
        }
      } catch(err) {
        const { response:{data} } = err;
        dispatch(openAlert({
            variant:"bg-red-50",
            textVariant:'text-red-500',
            open:true,
            message:data.message
        }));
         return null;
      }
});

export const registerHandler = createAsyncThunk('auth/register', async ({ registerForm ,dispatch, navigate }) => {
     try {
  
        const { data } = await API.post('/register' , registerForm);

        if(data) {
            localStorage.setItem('register_id' , JSON.stringify(data.id));
            localStorage.setItem('page' , JSON.stringify(1));
            navigate("/auth/userSetting");
        }

     } catch(err) {
        const { response:{data} } = err;
        dispatch(openAlert({
            variant:"bg-red-50",
            textVariant:'text-red-500',
            open:true,
            message:data.message
        }));
         return null;
     }
});

export const userSetting = createAsyncThunk('auth/userSetting' , async ({ boardingForm,navigate,dispatch }) => {
   try {
    const user_id = JSON.parse(localStorage.getItem('register_id'));
    const { data } = await API.post('/userSetting' , {...boardingForm , user_id });

    dispatch(openAlert({
         message:"Loading..",
         variant:"bg-blue-50",
         textVariant:"text-blue-500",
         open:true
    }));

    if(data) {
        localStorage.setItem('register_id' , JSON.stringify(null));
        localStorage.setItem('page' , JSON.stringify(null));
        navigate("/auth/login");
    }

   } catch(err) {
    const { response:{data} } = err;

    dispatch(openAlert({
        message:data.message,
        variant:"bg-red-50",
        textVariant:"text-red-500",
        open:true
   }));
   }
});

const AuthSlice = createSlice({
    name:'auth',
    initialState: {
        user:user ? jwtDecode(user) : null,
        token:user,
        loading:false  
    },
    reducers:{
        logoutHandler(state) {
            state.token = null;
            state.user = null;
            localStorage.setItem('token', JSON.stringify(state.token));

            return state;
        }
    },
    extraReducers:(builder) => {
        builder.addCase(loginHandler.fulfilled , (state , { payload }) => {
            if(!payload) return state;

            state.token = payload;
            state.user = jwtDecode(payload);
            localStorage.setItem('token', JSON.stringify(state.token));

            return state;
        });
    }
});

export const { logoutHandler } = AuthSlice.actions;

export default AuthSlice.reducer;