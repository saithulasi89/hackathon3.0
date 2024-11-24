"use client";

import { List, ListItem, ListItemText, ListItemIcon, Box } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import ReceiptIcon from "@mui/icons-material/Receipt";
import StoreIcon from "@mui/icons-material/Store"; // Replace WarehouseIcon
import PersonIcon from "@mui/icons-material/Person";

const Sidebar = () => {
  return (
    <Box sx={{ width: 250, bgcolor: "#f9f9f9", height: "100vh", padding: 2 }}>
      <List>
        <ListItem button component="a" href="/">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component="a" href="/alltickets">
          <ListItemIcon>
            <InventoryIcon />
          </ListItemIcon>
          <ListItemText primary="All Tickets" />
        </ListItem>
        <ListItem button component="a" href="/support">
          <ListItemIcon>
            <ReceiptIcon />
          </ListItemIcon>
          <ListItemText primary="Support" />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
