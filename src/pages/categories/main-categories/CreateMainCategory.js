import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button, Paper, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from 'yup';
import axios from "axios";
import { API_BASE_URL } from "../../../utils/ApiConstants";

export function CreateMainCategory({getCategories}) {
    const navigate = useNavigate();

    const validationSchema = yup.object({
        name: yup
            .string('Enter your name')
            .required('Name is required'),
        description: yup
            .string('Enter description')
            .min(3, 'Description should be of minimum 3 characters length')
            .required('Description is required'),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // API Call
            axios.post(`${API_BASE_URL}/categories`, {
                "id": Math.floor(Math.random() * (100 - 10 + 1)) + 1, // Generate random id from 10-100
                "name": values.name,
                "description": values.name
            })
            .then(function (response) {
                // handle success
                // const data = response.data;
                alert('Category created!')
                getCategories();
                navigate(-1)
            })
            .catch(function (error) {
                // handle error
                alert('Failed to create category');
                console.log("There is an error", error);
            })
        },
    });
    return <div className="create-main-category-component">
        <Paper elevation={3} className="form-container p-3" >
            <form className="d-flex align-items-center flex-column" onSubmit={formik.handleSubmit}>
                <h3>Add Category</h3>
                <TextField fullWidth
                    name="name" label="Category Name" className="mb-3" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name} />
                <TextField multiline maxRows={4} fullWidth name="description" label="Description" className="mb-3" value={formik.values.description} onChange={formik.handleChange} onBlur={formik.handleBlur}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description} />
                <Button variant="contained" type="submit">Create Category</Button>
                <Button onClick={()=>{
                    navigate(-1)
                }}>Cancel</Button>
            </form>
        </Paper>
    </div>
}