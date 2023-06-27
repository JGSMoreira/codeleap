import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        username: '',
    },
    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload;
        },
        logout: (state) => {
            state.username = '';
        },
    },
});

export const { setUsername, logout } = userSlice.actions;
export default userSlice.reducer;
