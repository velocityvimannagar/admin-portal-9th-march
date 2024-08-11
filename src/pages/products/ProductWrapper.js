import { Navigate, Route, Routes } from "react-router-dom";
import { ProductList } from "./ProductList";
import { CreateProduct } from "./CreateProduct";
import { useDispatch } from "react-redux";
import axios from 'axios';
import { setProducts } from "../../store/productsSlice";
import { API_BASE_URL } from "../../utils/ApiConstants";
import { useEffect } from "react";



export function ProductsWrapper() {
    const dispatch = useDispatch();

    const getProducts = () =>{
        axios.get(`${API_BASE_URL}/products`)
        .then(function (response) {
            // handle success
            const data = response.data;
            dispatch(setProducts(data))
        })
        .catch(function (error) {
            // handle error
            console.log("There is an error", error);
        })
    }

    useEffect(() => {
        // API Call
        getProducts();
    }, [])

    return <Routes>
        <Route path='/' element={<Navigate to={"list"} replace={true} />}></Route>
        <Route path="list" element={<ProductList></ProductList>}> </Route>
        <Route path="create" element={<CreateProduct></CreateProduct>}> </Route>
    </Routes>
}