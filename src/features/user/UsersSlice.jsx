import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const USERS_URL = "https://jsonplaceholder.typicode.com/users";

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get(USERS_URL);

  const filteredUsers = response.data.map(user => ({
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    username: user.username,
    street: user.address?.street,
    city: user.address?.city,
    password: user.address?.street
  }));

  return filteredUsers;
});



const usersSlice = createSlice({
    name: 'users',
    initialState: {
        items: [], 
        status: 'idle',
        error: null
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchUsers.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.items = action.payload;
        })
        .addCase(fetchUsers.rejected, (state) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
    }
})


export const selectAllUsers = (state) => state.users.items;
export const selectAllUsersStatus = (state) => state.users.status;
export const selectAllUsersError = (state) => state.users.error;
export const selectUserById = (state, userId) =>
  state.users.items.find(user => user.id === parseInt(userId));


export default usersSlice.reducer;