import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({ 
    name: 'auth',
    initialState: {
        id: '',
        username: '',
        name: '',
        email: '',
        phone: '',
        street: '',
        city: '',
        password: '',
        auth: false
    },
    reducers: {
        authorization: (state, action) => {
            state.auth = true;
            state.id = action.payload.id,
            state.username = action.payload.username,
        state.name = action.payload.name,
        state.email = action.payload.email,
        state.phone = action.payload.phone,
        state.street = action.payload.street,
        state.city = action.payload.city,
        state.password = action.payload.password
            },
            Logout: (state, action) => {
                    state.id = '',
        state.username = '',
        state.name = '',
        state.email = '',
        state.phone = '',
        state.street = '',
        state.city = '',
        state.password = '',
        state.auth = false
            }
    }
})



export const { authorization, Logout } = authSlice.actions;
export default authSlice.reducer;