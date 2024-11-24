'use client';

import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

const Header = () => {
  const { logout } = useAuth(); // Access logout function from AuthContext
  const router = useRouter(); // For navigation

  const handleLogout = () => {
    logout(); // Update the global login state
    router.push('/login'); // Redirect to the login page
  };

  return (
    <AppBar position="static" sx={{ mb: 3,backgroundColor: '#15599e', }}>
      <Toolbar>
      <Box
          component="img"
          src="/intellishield-logo.png" // Path to your logo
          alt="IntelliShield Logo"
          sx={{
            height: 40, // Adjust the logo height
            mr: 2, // Add margin to the right of the logo
          }}
        />
        {/* App Title */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          IntelliShield Dashboard
        </Typography>

        {/* Logout Button */}
        <Box>
          <IconButton
            color="inherit"
            onClick={handleLogout}
            aria-label="Logout"
            title="Logout"
          >
            <LogoutIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
