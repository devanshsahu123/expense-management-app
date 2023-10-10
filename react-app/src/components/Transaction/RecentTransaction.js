import { useState, React, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import { Divider, ListSubheader, Typography } from '@mui/material';
import axios from 'axios';

const RecentTransaction = () => {

    const [EXPFlowCredit, setExpFlowCredit] = useState({ amount: "" })
    const [EXPFlowDebit, setExpFlowDebit] = useState({ amount: "" })
    const [EXPTotalColor, setEXPTotalColor] = useState("")
    const [TranHistory, setTranHistory] = useState([])
    const token = localStorage.getItem("token")
    useEffect(() => {
        return async () => {
            const Data = await axios.get('http://localhost:3245/api/flow-transaction', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (Data.data.flow[0].action == "credit") { setExpFlowCredit({ amount: Data.data.flow[0].amount }) }
            if (Data.data.flow[0].action == "debit") { setExpFlowDebit({ amount: Data.data.flow[0].amount }) }
            if (Data.data.flow.length > 1) { if (Data.data.flow[1].action == "debit") setExpFlowDebit({ amount: Data.data.flow[1].amount }) }

            const transactionHistory = await axios.get('http://localhost:3245/api/transaction-history', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setTranHistory(transactionHistory.data.getExpTransactionHistory)
        }
    }, [token])

    return (<>
        {/* {console.log(TranHistory)} */}
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', backgroundColor: "whitesmoke", justifyContent: "center"}} subheader={
            <ListSubheader component="div" id="nested-list-subheader">
                Cash Flow
            </ListSubheader>
        }>

            <ListItem style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Typography variant="p" color="initial">InFlow -</Typography>
                    <Typography mb={1} variant="p" color="initial">OutFlow -</Typography>
                    <Divider />
                    <Typography mt={1} variant="p" color="initial">TotalFlow -</Typography>
                </div>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
                    <Typography variant="p" color="green">+ {EXPFlowCredit.amount}</Typography>
                    <Typography mb={1} variant="p" color="red">- {EXPFlowDebit.amount}</Typography>
                    <Divider />
                    <Typography variant="p" mt={1} ml={1} color={EXPTotalColor}>{EXPFlowCredit.amount - EXPFlowDebit.amount}</Typography>
                </div>
            </ListItem>
        </List>

        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', backgroundColor: "whitesmoke", justifyContent: "center"}} subheader={
            <ListSubheader component="div" id="nested-list-subheader">
                Transaction History
            </ListSubheader>
        }>
{/* 
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <ImageIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Photos" secondary="Jan 9, 2014" />
                <Typography variant="h6" color="green">50</Typography>
            </ListItem> */}
            {TranHistory.map((item) => (
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <ImageIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={item.name} secondary={item.date} />
                    <Typography variant="" color={(item.action =="credit")? "green":"red"}>{item.amount}</Typography>
                </ListItem>
            ))}





        </List>
    </>)
}

export default RecentTransaction



