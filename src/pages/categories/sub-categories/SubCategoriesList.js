import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import moment from 'moment';
import { useEffect } from "react";
import axios from 'axios';
import { setSubCategories } from "../../../store/subCategorySlice";
import { API_BASE_URL } from "../../../utils/ApiConstants";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useNavigate } from "react-router-dom";

export function SubCategoriesList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const mainCategories = useSelector(store => store.mainCategories)
    const mapping = mainCategories.reduce((mapp, category)=>{
        mapp[category.id] = category.name
        return mapp;
    }, {})
    const subCategoriesData = useSelector(store => store.subCategories)
    const subCategories = subCategoriesData.map(subCategory=> {
        return { ...subCategory, mainCategory: mapping[subCategory.categoryId]}
    })

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
    return <div>
          <Button variant="contained" onClick={() => {
            navigate('create')
        }}> Add Sub Category</Button>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Category</TableCell>
                        <TableCell>Main Category</TableCell>
                        <TableCell>Total Items</TableCell>
                        <TableCell >Created At</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {subCategories.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                               <img src={row.imageUrl} width={40} height={40}></img> {row.name}
                            </TableCell>
                            <TableCell >{row.mainCategory}</TableCell>
                            <TableCell >{row.totalItems}</TableCell>
                            <TableCell>{moment(row.createdAt).format('DD MMM YYYY')}</TableCell>
                            <TableCell><DeleteOutlineOutlinedIcon></DeleteOutlineOutlinedIcon></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </div>
}