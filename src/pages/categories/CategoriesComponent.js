import { Navigate, Route, Routes } from "react-router-dom";
import { SubCategoriesList } from "./sub-categories/SubCategoriesList";
import { MainCategoriesList } from "./main-categories/MainCategoriesList";
import { CreateMainCategory } from "./main-categories/CreateMainCategory";
import { CreateSubCategory } from "./sub-categories/CreateSubCategory";

export function CategoriesComponent(){
    return <Routes>
        <Route path='/' element={<Navigate to={"main-categories"} replace={true} />}></Route>
        <Route path="main-categories" element={<MainCategoriesList />}> </Route>
        <Route path="main-categories/create" element={<CreateMainCategory />}> </Route>
        <Route path="sub-categories" element={<SubCategoriesList />}></Route>
        <Route path="sub-categories/create" element={<CreateSubCategory />}></Route>
    </Routes>
}