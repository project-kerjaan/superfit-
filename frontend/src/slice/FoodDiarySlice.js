import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const user = JSON.parse(localStorage.getItem("token"));
const API = axios.create({
    baseURL:`http://localhost:8080/api/food-diary`
});

API.interceptors.request.use((req) => {
    if(user) {
        req.headers.Authorization = `bearer ${user}`
    }

    return req;
});

export const GetAllDiaries = createAsyncThunk('food-diary/all' , async () => {
    try {
       const { data } = await API.get("/all");

       if(data){
        return data;
       }
    } catch(err) {
       return null;      
    }
});


export const GetDiaries = createAsyncThunk('food-diary/detail' , async ({ type }) => {
    try {
        
        const { data } = await API.get(`/detail?type=${type}`);
        return data;
        
    } catch(err) {
        return null;
    }
});

export const DeleteFoodDiary = createAsyncThunk('food-diary/delete' , async ({ id }) => {
      try {

      } catch(err) {
        return null;
      }
});

export const CreateFoodDiary = createAsyncThunk('food-diary/create' , async ({ diaryForm,setOpen }) => {
      try {

        const { data } = await API.post('/add',diaryForm);
        if(data) {
            setOpen(false);
            return data;
        }

      } catch(err) {
        return null;
      }
});

const FoodDiarySlice = createSlice({
    name:'food-diary',
    initialState: {
        diaries:[],
        allDiaries:[],
        loading:false,
        message:"",
        variant:"",
        textVariant:""
    },
    extraReducers:(builder) => {
        builder.addCase(GetAllDiaries.fulfilled,(state,{ payload }) => {
            state.allDiaries = payload;

            return state;
        });
         
        builder.addCase(GetDiaries.fulfilled,(state , { payload }) => {
             state.diaries = payload;
             state.loading = false;
             
             return state;
        });

        builder.addCase(CreateFoodDiary.pending, (state, { payload }) => {
            state.loading = true;
            state.message = "Loading...";
            state.variant = 'bg-blue-50';
            state.textVariant = 'text-blue-500';

            return state;
        });

        builder.addCase(CreateFoodDiary.fulfilled,(state, { payload }) => {
             if(payload) {
               state.diaries.push(payload);
               state.loading = false;

               return state;
             }
        });

        builder.addCase(DeleteFoodDiary.fulfilled  , (state, { payload }) => {
              const filtered = state.diaries.filter(diary=>diary.id !== payload ? diary : "");
              state.diaries = filtered;

              return state;
        })
    }
});

export default FoodDiarySlice.reducer;