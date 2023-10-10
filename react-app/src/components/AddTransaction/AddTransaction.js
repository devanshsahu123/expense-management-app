
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { Input } from '@mui/joy';
import CategoryIcon from '@mui/icons-material/Category';
import { Alert, Button } from '@mui/material';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom'



export default function BasicSelect() {
    const navigate = useNavigate()
    const [category, setCategory] = React.useState('');
    const [wallet, setWallet] = React.useState()
    const [alert, setAlert] = React.useState({status:false,msg:""})
    const [categoryData, setCategoryData] = React.useState([])
    const handleChange = (event) => {
        setCategory(event.target.value);
    };
    const token = localStorage.getItem("token")
    React.useEffect(() => {
        return async () => {
            const getCategoryData = await axios.get('http://localhost:3245/api/getCategory', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setCategoryData(getCategoryData.data.getCategory)
        }
    }, [token])
    const submitHandler = async () => {
        if(wallet == 0 && wallet == undefined){ return setAlert({status:false,msg:"wallet amount must be greater then 0"})}
        if(category == ""){ return setAlert({status:true,msg:"category is not selected"})}

        const createTransaction = await axios.post(`http://localhost:3245/api/transaction-history/${category}`,{
            amount:wallet
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        navigate('/transaction')
    }

    return (
        <div style={{ width: "100%", height: "100%" }}>
            <div style={{ display: "flex", alignItems: 'center', flexDirection: "column", backgroundColor: 'whitesmoke' }}>
            {alert.status ? <Alert severity="warning">{alert.msg}</Alert>:""}
                <Box sx={{ width: 360, backgroundColor: 'whitesmoke' }}>
                    <Input
                        style={{ marginBottom: "15px", marginTop: "15px", padding: " 16.5px 14px" }}
                        type="number"
                        onChange={(e) => { setWallet(e.target.value) }}
                        startDecorator={<AccountBalanceWalletIcon />}
                        slotProps={{
                            input: {
                                min: 0
                            }
                        }}
                        defaultValue={0}
                    />

                    <FormControl fullWidth >

                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select
                            startAdornment={<CategoryIcon style={{ marginRight: "6px",display:"flex" }} />}
                            labelId="demo-simple-select-label"
                            id="category"
                            value={category}
                            label="Category"
                            onChange={handleChange}
                        >
                            {categoryData.map((item) => (

                                <MenuItem
                                    key={item.id}
                                    value={item.id}
                                    style={{display:"flex", justifyContent:"space-between",height:"40px"}}
                                >
                                        {item.name}
       <h6 style={{color:item.action =="debit" ? "red": "green"}}>{item.action}</h6>
                                </MenuItem>
                            ))}

                        </Select>
                        <Box style={{ marginTop: "10px", marginBottom: "10px", display: "flex", justifyContent: "center" }}>
                            <Button variant="contained" color="success" onClick={submitHandler}>
                                Success
                            </Button>
                        </Box>
                    </FormControl>
                </Box>
            </div>
        </div>
    );
}