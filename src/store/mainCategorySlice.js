import { createSlice } from "@reduxjs/toolkit";

export const mainCategorySlice = createSlice({
    name: "Main Categories",
    initialState: [
        {
            "id": "1",
            "name": "Electronics",
            "createdAt": "2024-03-14T09:30:00Z",
            "description": "Explore a wide range of electronic items"
        },
        {
            "id": "2",
            "name": "Clothing",
            "createdAt": "2024-03-14T09:30:00Z",
            "description": "Discover trendy clothing for all ages"
        },
        {
            "id": "3",
            "name": "Home & Garden",
            "createdAt": "2024-03-14T09:30:00Z",
            "description": "Find everything you need for your home and garden"
        },
        {
            "id": "4",
            "name": "Books",
            "createdAt": "2024-03-14T09:30:00Z",
            "description": "Dive into a world of literature"
        },
    ],
    reducers: {
        setMainCategories: (state, action) => {
            state = action.payload;
        }
    }
})

export const { setMainCategories } = mainCategorySlice.actions;
export default mainCategorySlice.reducer

