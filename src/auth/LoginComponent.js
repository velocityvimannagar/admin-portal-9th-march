import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/UseAuth";
import { useEffect } from "react";
import { Button, Paper, TextField } from "@mui/material";
import "./LoginComponent.scss"
import { useFormik } from "formik";
import * as yup from 'yup';


export function LoginComponent() {
    const navigate = useNavigate();
    const isAuthenticated = useAuth();
    useEffect(() => {
        // if (isAuthenticated) {
        //     navigate('/pages')
        // }
    }, [])
    const validationSchema = yup.object({
        email: yup
            .string('Enter your email')
            .email('Enter a valid email')
            .required('Email is required'),
        password: yup
            .string('Enter your password')
            .min(8, 'Password should be of minimum 8 characters length')
            .required('Password is required'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // Login API call
            localStorage.setItem("token", "some-token")
            navigate("/pages")
        },
    });
    return <div className="login-component">
        <Paper elevation={3} className="form-container" >
            <form className="d-flex align-items-center flex-column" onSubmit={formik.handleSubmit}>
                <h3>Login</h3>
                <TextField fullWidth
                    name="email" label="Email" className="mb-3" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email} />
                <TextField fullWidth type="password" name="password" label="Password" className="mb-3" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password} />
                <Button variant="contained" type="submit">Login</Button>
            </form>
        </Paper>
    </div>
}