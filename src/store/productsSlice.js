import { createSlice } from "@reduxjs/toolkit";
export const productsSlice = createSlice({
    name: "Products",
    initialState: [],
    reducers: {
        setProducts: (state, action) => {
            state = action.payload;
            return state;
        }
    }
})

export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer

