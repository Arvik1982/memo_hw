import { createSlice } from "@reduxjs/toolkit";
const sliceGame =createSlice({
    name: "game",

    initialState:{
        gameRegime:false,
        openCardItem:null,
        gameNumber:null,
    },
    reducers:{

       gameRegimeReducer(state, action) {
        !state.gameRegime?state.gameRegime=true:state.gameRegime=false
        },
       setOpenCardItem(state, action) {
            state.openCardItem=action.payload.card
            
            },
       setGameNumber(state, action) {
                state.gameNumber=action.payload
                console.log(state.gameNumber)
                },
    },
})

export const{gameRegimeReducer,setOpenCardItem,setGameNumber}=sliceGame.actions;
export default sliceGame.reducer