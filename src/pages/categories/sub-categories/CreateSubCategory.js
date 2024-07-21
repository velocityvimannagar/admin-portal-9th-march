import { useFormik } from "formik";
import * as yup from 'yup';
import axios from "axios";
import { API_BASE_URL } from "../../../utils/ApiConstants";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, MenuItem, Paper, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { FileDragDrop } from "../../../components/FileDragDrop";


export function CreateSubCategory() {
    const navigate = useNavigate();
    const mainCategories = useSelector(store => store.mainCategories)
    const [imageUrl, setImageUrl] = useState('');

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
            categoryId: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // API Call
            axios.post(`${API_BASE_URL}/subCategories`, {
                "id": Math.floor(Math.random() * (100 - 10 + 1)) + 1, // Generate random id from 10-100
                "name": values.name,
                "description": values.name,
                "categoryId": values.categoryId,
                imageUrl
            })
                .then(function (response) {
                    // handle success
                    alert('Sub Category created!')
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
                <h3>Add Sub Category</h3>
                <TextField fullWidth
                    name="name" label="Category Name" className="mb-3" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name} />
                <TextField multiline rows={4} fullWidth name="description" label="Description" className="mb-3" value={formik.values.description} onChange={formik.handleChange} onBlur={formik.handleBlur}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description} />

                <TextField
                    select
                    fullWidth
                    name="categoryId"
                    label="Select"
                    defaultValue=""
                    onChange={formik.handleChange} onBlur={formik.handleBlur}
                    error={formik.touched.categoryId && Boolean(formik.errors.categoryId)}
                    helperText={formik.touched.categoryId && formik.errors.categoryId}
                >
                    <MenuItem value="" disabled>Select Cateogry</MenuItem>
                    {mainCategories.map(cat => {
                        return <MenuItem value={cat.id}>
                            {cat.name}
                        </MenuItem>
                    })}
                </TextField>
                <br></br>
                Category Image
                <FileDragDrop onFileDrop={(file)=>{
                    // API Call
                    const url = "https://m.media-amazon.com/images/I/51NNA+k9S0L._AC_UF894,1000_QL80_.jpg";
                    setImageUrl(url)
                }}></FileDragDrop>
                <Button variant="contained" type="submit" className="mt-5">Create Sub Category</Button>
                <Button onClick={() => {
                    navigate(-1)
                }}>Cancel</Button>
            </form>
        </Paper>
    </div>
}