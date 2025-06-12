import { createSlice } from "@reduxjs/toolkit";


export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 0
    },
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        dencrement: (state) => {
            state.value -= 1;
        },
        incrementByAmount: (state, action) => {
            state.value = state.value + action.payload;
        },
    }
})



export const { increment, dencrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;