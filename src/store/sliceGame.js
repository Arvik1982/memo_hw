import { createSlice } from "@reduxjs/toolkit";
const sliceGame =createSlice({
    name: "game",

    initialState:{
        gameRegime:false,
        openCardItem:null,
        gameNumber:null,
        superPowerA:false,
        superPowerB:false
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
        setSuperpowerA(state, action) {
            state.superPowerA?state.superPowerA=false:state.superPowerA=action.payload
            
            console.log(state.superPowerA)
                    
        },
        setSuperpowerB(state, action) {
            state.superPowerB?state.superPowerB=false:state.superPowerB=action.payload
            
            console.log(state.superPowerB)
                    
        },
    },
})

export const{gameRegimeReducer,setOpenCardItem,setGameNumber,setSuperpowerA,setSuperpowerB}=sliceGame.actions;
export default sliceGame.reducer