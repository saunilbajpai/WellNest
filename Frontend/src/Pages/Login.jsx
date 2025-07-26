import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Divider,
  CircularProgress,
  Alert,
  IconButton,
  InputAdornment,
  Fade,
  Paper
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import axios from "axios";
import { signInWithPopup, auth, provider } from "../utils/firebase";
import {
  Visibility,
  VisibilityOff,
  Google,
  Login as LoginIcon,
  PersonAdd
} from "@mui/icons-material";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ 
    username: "", 
    password: "",
    showPassword: false
  });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClickShowPassword = () => {
    setFormData({ ...formData, showPassword: !formData.showPassword });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", {
        username: formData.username,
        password: formData.password
      });
      login(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
      setMessage({ type: "success", text: "Login successful! Redirecting..." });
      setTimeout(() => navigate("/Addupdate"), 1500);
    } catch (err) {
      console.error("Login error:", err);
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Invalid credentials. Please try again."
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setMessage({ type: "", text: "" });
    
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const idToken = await user.getIdToken();

      const res = await axios.post("http://localhost:8080/api/auth/google-login", {
        token: idToken,
      });

      login(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
      setMessage({ type: "success", text: "Google login successful! Redirecting..." });
      setTimeout(() => navigate("/Addupdate"), 1500);
    } catch (error) {
      console.error("Google login failed:", error);
      setMessage({ 
        type: "error", 
        text: error.response?.data?.message || "Google login failed. Please try again." 
      });
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Fade in={true} timeout={500}>
        <Paper
          elevation={10}
          sx={{
            p: { xs: 3, sm: 4 },
            borderRadius: 3,
            backgroundColor: "#2e2e40",
            border: "1px solid rgba(77, 208, 225, 0.3)",
            boxShadow: "0 8px 32px rgba(0, 229, 255, 0.2)",
            color: "#e0f7fa",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "4px",
              background: "linear-gradient(90deg, #4dd0e1, #00e5ff, #1de9b6)",
            }
          }}
        >
          <Box textAlign="center" mb={4}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                background: "linear-gradient(90deg, #4dd0e1, #00e5ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 1
              }}
            >
              Welcome Back
            </Typography>
            <Typography variant="body1" sx={{ color: "#aaaaaa" }}>
              Sign in to continue your wellness journey
            </Typography>
          </Box>

          {message.text && (
            <Alert 
              severity={message.type} 
              sx={{ mb: 3 }}
              onClose={() => setMessage({ type: "", text: "" })}
            >
              {message.text}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              fullWidth
              required
              margin="normal"
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              variant="filled"
              InputProps={{
                sx: { 
                  backgroundColor: "#42425a", 
                  color: "white",
                  borderRadius: 1
                },
              }}
              InputLabelProps={{ 
                sx: { 
                  color: "#bbb",
                  "&.Mui-focused": {
                    color: "#4dd0e1"
                  }
                } 
              }}
            />
            <TextField
              fullWidth
              required
              margin="normal"
              label="Password"
              type={formData.showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              variant="filled"
              InputProps={{
                sx: { 
                  backgroundColor: "#42425a", 
                  color: "white",
                  borderRadius: 1
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                      sx={{ color: "#aaaaaa" }}
                    >
                      {formData.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{ 
                sx: { 
                  color: "#bbb",
                  "&.Mui-focused": {
                    color: "#4dd0e1"
                  }
                } 
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              startIcon={loading ? null : <LoginIcon />}
              sx={{
                mt: 3,
                py: 1.5,
                fontWeight: "bold",
                background: "linear-gradient(90deg, #00e5ff, #4dd0e1)",
                color: "#1e1e2f",
                "&:hover": {
                  background: "linear-gradient(90deg, #4dd0e1, #00e5ff)",
                },
              }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Login"
              )}
            </Button>
          </Box>

          <Divider sx={{ my: 3, color: "#4dd0e1", "&::before, &::after": { borderColor: "#4dd0e1" } }}>
            OR
          </Divider>

          <Button
            fullWidth
            variant="outlined"
            size="large"
            startIcon={googleLoading ? null : <Google />}
            onClick={handleGoogleLogin}
            disabled={googleLoading}
            sx={{
              py: 1.5,
              borderColor: "#db4437",
              color: "#db4437",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "rgba(219, 68, 55, 0.1)",
                borderColor: "#db4437",
              },
            }}
          >
            {googleLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Continue with Google"
            )}
          </Button>

          <Typography align="center" sx={{ mt: 3, color: "#aaaaaa" }}>
            Don't have an account?{" "}
            <Button
              component={Link}
              to="/register"
              size="small"
              startIcon={<PersonAdd />}
              sx={{
                color: "#4dd0e1",
                textTransform: "none",
                "&:hover": {
                  color: "#00e5ff",
                },
              }}
            >
              Sign up
            </Button>
          </Typography>
        </Paper>
      </Fade>
    </Container>
  );
};

export default Login;