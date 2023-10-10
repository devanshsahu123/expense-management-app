import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, Outlet } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useLocation } from "react-router-dom";
import cashImage from "../img/cash.jpg"
import Menu from "./Menu";
import { Avatar } from "@mui/material";
import axios from "axios";



const drawerWidth = 220;
function NavBar(props) {

  const [EXPFlowCredit, setExpFlowCredit] = useState({ amount: "", color: "" })
  const [EXPFlowDebit, setExpFlowDebit] = useState({ amount: "", color: "" })
  const token = localStorage.getItem("token")
  useEffect(() => {
    return async () => {
      const Data = await axios.get('http://localhost:3245/api/flow-transaction', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if(Data.data.flow[0].action == "credit" ){setExpFlowCredit({ amount: Data.data.flow[0].amount }) }
      if(Data.data.flow[0].action == "debit"){setExpFlowDebit({ amount: Data.data.flow[0].amount })}
      if(Data.data.flow.length > 1){ if( Data.data.flow[1].action == "debit") setExpFlowDebit({ amount: Data.data.flow[1].amount })}
    }
  }, [token])

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [thedrawer, setThedrawer] = useState(<Menu />);



  const drawer = (
    <div>
      <Toolbar />
      {thedrawer}
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }} >
      <AppBar
        position="fixed"
        sx={{
          bgcolor: "#192846",
          width: "100%",
          zIndex: "999998"
        }}
      >
        <Toolbar >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <Typography variant="h6" noWrap component="div">
              ExpManagment
            </Typography>

            <Typography variant="p" color="initial" component='div' style={{ color: "white", display: "flex", alignItems: "center", justifyContent: "flex-end", width: "20%", height: "40px" }}>
              <Avatar alt="Remy Sharp" src={cashImage} />
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", marginLeft: "10px" }}>
                <div>cash</div>
                <div>{EXPFlowCredit.amount - EXPFlowDebit.amount}</div>
              </div>

            </Typography>
          </div>

        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth
            }
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth
            }
          }}
          open
        >
          {drawer}
        </Drawer>

      </Box>
      <Toolbar />
    </Box>
  );
}

NavBar.propTypes = {
  window: PropTypes.func
};

export default NavBar;
