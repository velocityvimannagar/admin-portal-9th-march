import { createSlice } from "@reduxjs/toolkit";
const categoryImage = 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQ8aMe7q9zmB5E_hCNlb2T0v7gANVVPmcN4njgV7RGb8AWm0UgLLXdVYkfEeePFQJ0CH1y7fROc_hz3-sFpC-mjP30rZcKSvkxMLkp-DDOvVdDSMbC5ZYKCwv4';
export const subCategorySlice = createSlice({
    name: "Sub Categories",
    initialState: [
        {
            "id": "1",
            "categoryId": "1",
            "name": "Smartphones",
            "totalItems": 2,
            "description": "Browse the latest smartphones",
            "imageUrl":categoryImage
        },
        {
            "id": "2",
            "categoryId": "1",
            "name": "Laptops",
            "totalItems": 2,
            "description": "Choose from a variety of laptops",
            "imageUrl": categoryImage
        },
        {
            "id": "3",
            "categoryId": "1",
            "name": "Accessories",
            "totalItems": 2,
            "description": "Enhance your devices with accessories",
            "imageUrl": categoryImage
        },
        {
            "id": "4",
            "categoryId": "2",
            "name": "Men's Fashion",
            "totalItems": 2,
            "description": "Stay stylish with our men's fashion range",
            "imageUrl":categoryImage
        },
    ],
    reducers: {
        setSubCategories: (state, action) => {
            state = action.payload;
        }
    }
})

export const { setSubCategories } = subCategorySlice.actions;
export default subCategorySlice.reducer

