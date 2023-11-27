import { createSlice } from "@reduxjs/toolkit";
const sliceGame =createSlice({
    name: "game",

    initialState:{
        gameRegime:false,
        openCardItem:null,
    },
    reducers:{

       gameRegimeReducer(state, action) {
        !state.gameRegime?state.gameRegime=true:state.gameRegime=false
        },
       setOpenCardItem(state, action) {
            state.openCardItem=action.payload.card
            
            },
    },
})

export const{gameRegimeReducer,setOpenCardItem}=sliceGame.actions;
export default sliceGame.reducer