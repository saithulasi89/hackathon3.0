"use client";

import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Box display="flex">
        <Sidebar />
        <Box sx={{ flexGrow: 1, padding: 3 }}>{children}</Box>
      </Box>
    </>
  );
};

export default Layout;
