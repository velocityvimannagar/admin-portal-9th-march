import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, FormControl, FormControlLabel, FormLabel, MenuItem, Paper, Radio, RadioGroup, Switch, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from 'yup';
import axios from "axios";
import { API_BASE_URL } from "../../utils/ApiConstants";
import { useDispatch, useSelector } from "react-redux";
import { setSubCategories } from "../../store/subCategorySlice";
import { FileDragDrop } from "../../components/FileDragDrop";
export const CreateProduct = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [imageUrl, setImageUrl] = useState('');

    const subCategoriesData = useSelector(store => store.subCategories)
    useEffect(() => {
        // API Call
        axios.get(`${API_BASE_URL}/subCategories`)
            .then(function (response) {
                // handle success
                const data = response.data;
                dispatch(setSubCategories(data))
            })
            .catch(function (error) {
                // handle error
                console.log("There is an error", error);
            })
    }, [])

    const validationSchema = yup.object({
        productName: yup
            .string('Enter product name')
            .required('Product Name is required'),
        subCategoryId: yup.number('Should be a number').required('Sub category is required'),
        description: yup
            .string('Enter description')
            .min(3, 'Description should be of minimum 3 characters length')
            .required('Description is required'),
        brand: yup
            .string('Enter brand name')
            .required('Brand name is required'),
        status: yup
            .string()
            .required('Status is required'),
        sizes: yup
            .string('Enter Sizes')
            .required('Sizes required'),
    });

    const formik = useFormik({
        initialValues: {
            productName: '',
            description: '',
            subCategoryId: '',
            brand: '',
            status: '',
            sizes: '',
            availableQuantity: 0,
            productCode: '',
            productSku: '',
            gender: 'female',
            isFeatured: false
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values)
            // API Call
            // axios.post(`${API_BASE_URL}/categories`, {
            //     "id": Math.floor(Math.random() * (100 - 10 + 1)) + 1, // Generate random id from 10-100
            //     "name": values.name,
            //     "description": values.name
            // })
            // .then(function (response) {
            //     // handle success
            //     // const data = response.data;
            //     alert('Category created!')
            //     // getCategories();
            //     navigate(-1)
            // })
            // .catch(function (error) {
            //     // handle error
            //     alert('Failed to create category');
            //     console.log("There is an error", error);
            // })
        },
    });
    return <div className="create-main-category-component">
        <Paper elevation={3} className="form-container p-3" >
            <form className="d-flex align-items-center flex-column" onSubmit={formik.handleSubmit}>
                <h3>Add Product</h3>
                <TextField fullWidth
                    name="productName" label="Product Name" className="mb-3" value={formik.values.productName} onChange={formik.handleChange} onBlur={formik.handleBlur}
                    error={formik.touched.productName && Boolean(formik.errors.productName)}
                    helperText={formik.touched.productName && formik.errors.productName} />
                <TextField multiline maxRows={4} fullWidth name="description" label="Description" className="mb-3" value={formik.values.description} onChange={formik.handleChange} onBlur={formik.handleBlur}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description} />

                <div className="row w-100">
                    <div className="col">
                        <TextField fullWidth select name="subCategoryId" label="Category" className="mb-3" value={formik.values.subCategoryId} onChange={formik.handleChange} onBlur={formik.handleBlur}
                            error={formik.touched.subCategoryId && Boolean(formik.errors.subCategoryId)}
                            helperText={formik.touched.subCategoryId && formik.errors.subCategoryId}>
                            <MenuItem value={''} disabled>Select Category</MenuItem>
                            {subCategoriesData?.map(item => <MenuItem value={item.id}>{item.name}</MenuItem>)}
                        </TextField>
                    </div>
                    <div className="col">

                        <TextField fullWidth
                            name="brand" label="Brand" className="mb-3" value={formik.values.brand} onChange={formik.handleChange} onBlur={formik.handleBlur}
                            error={formik.touched.brand && Boolean(formik.errors.brand)}
                            helperText={formik.touched.brand && formik.errors.brand} />
                    </div>
                </div>

                <div className="row w-100">
                    <div className="col">
                        <TextField fullWidth select name="status" label="Status" className="mb-3" value={formik.values.status} onChange={formik.handleChange} onBlur={formik.handleBlur}
                            error={formik.touched.status && Boolean(formik.errors.status)}
                            helperText={formik.touched.status && formik.errors.status}>
                            <MenuItem value={''} disabled>Select Status</MenuItem>
                            {["In Stock", 'Low Stock']?.map(item => <MenuItem value={item}>{item}</MenuItem>)}
                        </TextField>
                    </div>
                    <div className="col">
                        <TextField fullWidth
                            name="sizes" label="Sizes" className="mb-3" value={formik.values.sizes} onChange={formik.handleChange} onBlur={formik.handleBlur}
                            error={formik.touched.sizes && Boolean(formik.errors.sizes)}
                            helperText={formik.touched.sizes && formik.errors.sizes} />
                    </div>
                </div>

                Product Image
                <FileDragDrop onFileDrop={(file) => {
                    // API Call
                    const url = "https://m.media-amazon.com/images/I/51NNA+k9S0L._AC_UF894,1000_QL80_.jpg";
                    setImageUrl(url)
                }}></FileDragDrop>
                <TextField fullWidth
                    name="productCode" label="Product Code" className="mb-3" value={formik.values.productCode} onChange={formik.handleChange} onBlur={formik.handleBlur}
                    error={formik.touched.productCode && Boolean(formik.errors.productCode)}
                    helperText={formik.touched.productCode && formik.errors.productCode} />
                <TextField fullWidth
                    name="productSku" label="Product SKU" className="mb-3" value={formik.values.productSku} onChange={formik.handleChange} onBlur={formik.handleBlur}
                    error={formik.touched.productSku && Boolean(formik.errors.productSku)}
                    helperText={formik.touched.productSku && formik.errors.productSku} />

                Gender
                <RadioGroup className="d-flex" name="gender" value={formik.values.gender} onChange={formik.handleChange} onBlur={formik.handleBlur}
                    error={formik.touched.gender && Boolean(formik.errors.gender)}
                    helperText={formik.touched.gender && formik.errors.gender}>
                    <div className="d-flex align-items-center">
                        <Radio value="male" /> Male
                        <Radio value="female" /> Female
                        <Radio value="kids" /> Kids
                        <Radio value="others" /> Others
                    </div>
                </RadioGroup>
                <TextField fullWidth
                    type="number"
                    name="availableQuantity" label="Quantity" className="mb-3" value={formik.values.availableQuantity} onChange={formik.handleChange} onBlur={formik.handleBlur}
                    error={formik.touched.availableQuantity && Boolean(formik.errors.availableQuantity)}
                    helperText={formik.touched.availableQuantity && formik.errors.availableQuantity} />


                <TextField fullWidth
                    name="regularPrice" label="Regular Price" className="mb-3" value={formik.values.regularPrice} onChange={formik.handleChange} onBlur={formik.handleBlur}
                    error={formik.touched.regularPrice && Boolean(formik.errors.regularPrice)}
                    helperText={formik.touched.regularPrice && formik.errors.regularPrice} />
                <TextField fullWidth
                    name="salePrice" label="Sale Price" className="mb-3" value={formik.values.salePrice} onChange={formik.handleChange} onBlur={formik.handleBlur}
                    error={formik.touched.salePrice && Boolean(formik.errors.salePrice)}
                    helperText={formik.touched.salePrice && formik.errors.salePrice} />
                <div>
                    <Switch name="isFeatured" value={formik.touched.isFeatured} onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.isFeatured && Boolean(formik.errors.isFeatured)}
                        helperText={formik.touched.isFeatured && formik.errors.isFeatured} /> Featured Product
                </div>
                <Button variant="contained" type="submit">Create Product</Button>
                <Button onClick={() => {
                    navigate(-1)
                }}>Cancel</Button>
            </form>
        </Paper>
    </div>
}