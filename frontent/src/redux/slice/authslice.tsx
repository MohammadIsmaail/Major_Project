import { createSlice } from "@reduxjs/toolkit"

const initialState = {}

const authslice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        login:(state,action)=>{
            return(state=action.payload)
        },
        logout:(state)=>{
            return(state={})
        }

    }
})

export const {login,logout} = authslice.actions;
export default authslice.reducer