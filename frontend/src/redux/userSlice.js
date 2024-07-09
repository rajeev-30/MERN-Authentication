import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user:null,
    allUsers:[],
    profile:null
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        getAllUsers: (state, action) => {
            state.allUsers = action.payload
        },
        getProfile: (state, action)=>{
            state.profile = action.payload
        }
    }
});

export const {setUser, getAllUsers, getProfile} = userSlice.actions

export default userSlice.reducer
