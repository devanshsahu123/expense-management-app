import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
export default function Menu() {
  const location = useLocation();
  const path = location.pathname;
  return (
    <List>
      <ListItem
        component={Link}
        button
        to="/transaction"
        key={"1"}
      >
        <ListItemIcon>
          <AccountBalanceWalletIcon />
        </ListItemIcon>
        <ListItemText primary={"Transactions"} />
      </ListItem>
      

      <ListItem
        component={Link}
        button
        to="/add-transaction"
        key={"2"}
      >
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary={"AddTransaction"} />
      </ListItem>

      <ListItem
        component={Link}
        to="/transaction-filter"
        button
        key={"3"}
      >
        <ListItemIcon>
          <AccountTreeIcon />
        </ListItemIcon>
        <ListItemText primary={"Transaction Filter"}/>
      </ListItem>
    </List>
  );
}
