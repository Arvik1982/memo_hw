import { createSlice } from "@reduxjs/toolkit";
const sliceGame =createSlice({
    name: "game",

    initialState:{
        gameRegime:false,
    },
    reducers:{

       gameRegimeReducer(state, action) {
        !state.gameRegime?state.gameRegime=true:state.gameRegime=false
        },
    },
})

export const{gameRegimeReducer}=sliceGame.actions;
export default sliceGame.reducer