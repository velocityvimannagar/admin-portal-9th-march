import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import moment from 'moment';
import { useNavigate } from "react-router-dom";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ConfirmationDialog from "../../../components/ConfirmationDialog";
import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../utils/ApiConstants";
// import { createPortal } from "react-dom";


export function MainCategoriesList({getCategories}) {
    const mainCategories = useSelector(store => store.mainCategories)
    const navigate = useNavigate();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);

    const deleteCategory = () => {
        axios.delete(`${API_BASE_URL}/categories/${categoryToDelete}`)
            .then(function (response) {
                // handle success
                alert('Category delted!');
                getCategories();
            })
            .catch(function (error) {
                // handle error
                console.log("There is an error", error);
            }).finally(() => {
                setCategoryToDelete(null)
            })
    }

    return <div>
        <ConfirmationDialog title="Confirm?" description="Do you want to delete?" open={deleteDialogOpen} handleClose={(flag) => {
            setDeleteDialogOpen(false);
            if (flag) {
                deleteCategory();
            } else {
                setCategoryToDelete(null)
            }
        }} ></ConfirmationDialog>
        {/* {createPortal( <div>I am in Main Categories: {deleteDialogOpen+''} </div>, document.body)} */}
        <Button variant="contained" onClick={() => {
            navigate('create')
        }}> Add Category</Button>
        <br></br>
        <br></br>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Category</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell >Created At</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {mainCategories.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell >{row.description}</TableCell>
                            <TableCell>{moment(row.createdAt).format('DD MMM YYYY')}</TableCell>
                            <TableCell><DeleteOutlineOutlinedIcon onClick={() => {
                                setDeleteDialogOpen(true)
                                setCategoryToDelete(row.id)
                            }}></DeleteOutlineOutlinedIcon></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </div>
}