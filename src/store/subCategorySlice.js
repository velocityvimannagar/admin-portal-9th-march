import { createSlice } from "@reduxjs/toolkit";
const categoryImage = 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQ8aMe7q9zmB5E_hCNlb2T0v7gANVVPmcN4njgV7RGb8AWm0UgLLXdVYkfEeePFQJ0CH1y7fROc_hz3-sFpC-mjP30rZcKSvkxMLkp-DDOvVdDSMbC5ZYKCwv4';
export const subCategorySlice = createSlice({
    name: "Sub Categories",
    initialState: [],
    reducers: {
        setSubCategories: (state, action) => {
            state = action.payload;
            return state;
        }
    }
})

export const { setSubCategories } = subCategorySlice.actions;
export default subCategorySlice.reducer

