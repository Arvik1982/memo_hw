import { createSlice } from "@reduxjs/toolkit";
const sliceGame =createSlice({
    name: "game",

    initialState:{
        gameRegime:false,
    },
    reducers:{

       gameRegimeReducer(state, action) {
       state.gameRegime=true;
        },
    },
})

export const{gameRegimeReducer}=sliceGame.actions;
export default sliceGame.reducer