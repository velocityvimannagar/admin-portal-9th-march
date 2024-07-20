import { Navigate, Route, Routes } from "react-router-dom";
import { SubCategoriesList } from "./sub-categories/SubCategoriesList";
import { MainCategoriesList } from "./main-categories/MainCategoriesList";
import { CreateMainCategory } from "./main-categories/CreateMainCategory";
import { CreateSubCategory } from "./sub-categories/CreateSubCategory";
import { useEffect } from "react";
import { setMainCategories } from "../../store/mainCategorySlice";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { API_BASE_URL } from "../../utils/ApiConstants";

export function CategoriesComponent(){
    const dispatch = useDispatch();

    const getCategories = () =>{
        axios.get(`${API_BASE_URL}/categories`)
        .then(function (response) {
            // handle success
            const data = response.data;
            dispatch(setMainCategories(data))
        })
        .catch(function (error) {
            // handle error
            console.log("There is an error", error);
        })
    }

    useEffect(() => {
        // API Call
        getCategories();
    }, [])
    return <Routes>
        <Route path='/' element={<Navigate to={"main-categories"} replace={true} />}></Route>
        <Route path="main-categories" element={<MainCategoriesList/>}> </Route>
        <Route path="main-categories/create" element={<CreateMainCategory getCategories={getCategories}/>}> </Route>
        <Route path="sub-categories" element={<SubCategoriesList />}></Route>
        <Route path="sub-categories/create" element={<CreateSubCategory />}></Route>
    </Routes>
}