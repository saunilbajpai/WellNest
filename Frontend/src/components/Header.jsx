import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  Stack,
  useMediaQuery,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Badge,
  Chip
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useTheme } from "@mui/material/styles";
import {
  Menu as MenuIcon,
  FitnessCenter,
  ShowChart,
  LocalDrink,
  Bedtime,
  ExitToApp,
  AccountCircle,
  Home,
  AddCircle
} from "@mui/icons-material";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
    localStorage.removeItem("user");
    navigate("/login");
  };

  const navItems = [
    { label: "Home", to: "/", icon: <Home fontSize="small" /> },
    { label: "Add Log", to: "/Addupdate", icon: <AddCircle fontSize="small" /> },
    { label: "View Logs", to: "/Logs", icon: <LocalDrink fontSize="small" /> },
    { label: "Exercises", to: "/exercise", icon: <FitnessCenter fontSize="small" /> },
    { label: "Progress", to: "/Progress", icon: <ShowChart fontSize="small" /> },
  ];

  return (
    <AppBar
      position="sticky"
      sx={{
        background: "rgba(30, 30, 47, 0.98)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(77, 208, 225, 0.3)",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
        py: 0.5,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: { xs: 1, md: 3 },
        }}
      >
        {/* Logo / Brand */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {isMobile && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenu}
              sx={{ mr: 1 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          <Typography
            variant="h5"
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              fontWeight: "bold",
              background: "linear-gradient(90deg, #00e5ff, #4dd0e1)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "flex",
              alignItems: "center",
              gap: 1,
              '&:hover': {
                opacity: 0.9,
              },
            }}
          >
            <Bedtime fontSize="large" sx={{ color: "#4dd0e1" }} />
            WellNest
          </Typography>
        </Box>

        {/* Navigation Links - Desktop */}
        {!isMobile && (
          <Box sx={{ display: "flex", gap: 1 }}>
            {navItems.map((item) => (
              <Button
                key={item.to}
                component={Link}
                to={item.to}
                startIcon={item.icon}
                sx={{
                  color: "#e0f7fa",
                  fontWeight: 500,
                  textTransform: "none",
                  fontSize: "0.95rem",
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  '&:hover': {
                    backgroundColor: "rgba(77, 208, 225, 0.1)",
                    color: "#4dd0e1",
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        )}

        {/* User/Auth Section */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {!user ? (
            <>
              <Button
                component={Link}
                to="/login"
                variant="outlined"
                size="small"
                sx={{
                  color: "#e0f7fa",
                  borderColor: "#4dd0e1",
                  fontWeight: 500,
                  '&:hover': {
                    backgroundColor: "rgba(77, 208, 225, 0.1)",
                    borderColor: "#00e5ff",
                  },
                }}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/register"
                variant="contained"
                size="small"
                sx={{
                  background: "linear-gradient(90deg, #00e5ff, #4dd0e1)",
                  color: "#1e1e2f",
                  fontWeight: 600,
                  '&:hover': {
                    background: "linear-gradient(90deg, #4dd0e1, #00e5ff)",
                  },
                }}
              >
                Register
              </Button>
            </>
          ) : (
            <Stack direction="row" spacing={1} alignItems="center">
              <Chip
                avatar={
                  <Avatar
                    alt={user.username}
                    src={user.photoURL}
                    sx={{ width: 24, height: 24 }}
                  />
                }
                label={isMobile ? "" : user.username}
                variant="outlined"
                sx={{
                  color: "#e0f7fa",
                  borderColor: "rgba(77, 208, 225, 0.5)",
                  backgroundColor: "rgba(77, 208, 225, 0.1)",
                  '&:hover': {
                    backgroundColor: "rgba(77, 208, 225, 0.2)",
                  },
                }}
                onClick={handleMenu}
              />
              {!isMobile && (
                <IconButton
                  onClick={handleLogout}
                  sx={{
                    color: "#ff6b6b",
                    '&:hover': {
                      backgroundColor: "rgba(255, 107, 107, 0.1)",
                    },
                  }}
                >
                  <ExitToApp />
                </IconButton>
              )}
            </Stack>
          )}
        </Box>

        {/* Mobile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              minWidth: 200,
              backgroundColor: "#2e2e40",
              border: "1px solid #4dd0e1",
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "#2e2e40",
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
                borderLeft: "1px solid #4dd0e1",
                borderTop: "1px solid #4dd0e1",
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          {user && (
            <MenuItem 
              onClick={handleClose}
              sx={{
                '&:hover': {
                  backgroundColor: "rgba(77, 208, 225, 0.1)",
                },
              }}
            >
              <Avatar 
                alt={user.username} 
                src={user.photoURL} 
                sx={{ mr: 2 }} 
              />
              <Typography variant="body2" sx={{ color: "#e0f7fa" }}>
                {user.username}
              </Typography>
            </MenuItem>
          )}
          {navItems.map((item) => (
            <MenuItem
              key={item.to}
              component={Link}
              to={item.to}
              onClick={handleClose}
              sx={{
                '&:hover': {
                  backgroundColor: "rgba(77, 208, 225, 0.1)",
                },
              }}
            >
              <Box sx={{ mr: 2, color: "#4dd0e1" }}>{item.icon}</Box>
              <Typography variant="body2" sx={{ color: "#e0f7fa" }}>
                {item.label}
              </Typography>
            </MenuItem>
          ))}
          {user && (
            <>
              <Divider sx={{ borderColor: "rgba(77, 208, 225, 0.2)", my: 0.5 }} />
              <MenuItem
                onClick={handleLogout}
                sx={{
                  color: "#ff6b6b",
                  '&:hover': {
                    backgroundColor: "rgba(255, 107, 107, 0.1)",
                  },
                }}
              >
                <Box sx={{ mr: 2, color: "inherit" }}>
                  <ExitToApp fontSize="small" />
                </Box>
                <Typography variant="body2">Logout</Typography>
              </MenuItem>
            </>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;