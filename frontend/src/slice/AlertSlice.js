import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    message:"",
    variant:"",
    textVariant:"",
    open:false 
}

const AlertSlice = createSlice({
    name:'alert',
    initialState,
    reducers:{
        openAlert(state,  { payload }) {
            state.variant = payload.variant;
            state.message = payload.message;
            state.textVariant = payload.textVariant;
            state.open = true;

            return state;
        },

        closeAlert(state) {
            state.variant = '';
            state.message = '';
            state.textVariant = "";
            state.open = false;

            return state;
        }
    },
    extraReducers:(builder)=>{}
});

export const { openAlert,closeAlert } = AlertSlice.actions;

export default AlertSlice.reducer;