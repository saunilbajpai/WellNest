import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Paper,
  Typography,
  Button,
  CircularProgress,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Divider,
  Chip,
  Avatar
} from "@mui/material";
import {
  FitnessCenter,
  Schedule,
  Whatshot,
  MonitorWeight,
  Lightbulb
} from "@mui/icons-material";

const Exercise = () => {
  const [goal, setGoal] = useState("exercises");
  const [focus, setFocus] = useState("full-body");
  const [weight, setWeight] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!weight) {
      setError("Please enter your weight");
      return;
    }

    setLoading(true);
    setResponse("");
    setError("");

    try {
      const res = await axios.post("http://localhost:8080/api/exercise", {
        goal,
        focus,
        weight
      });
      setResponse(res.data);
    } catch (err) {
      console.error(err);
      setResponse("");
      setError("Failed to get suggestion. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const focusOptions = [
    { value: "full-body", label: "Full Body", icon: <Whatshot /> },
    { value: "chest", label: "Chest", icon: <FitnessCenter /> },
    { value: "legs", label: "Legs", icon: <FitnessCenter /> },
    { value: "back", label: "Back", icon: <FitnessCenter /> },
    { value: "arms", label: "Arms", icon: <FitnessCenter /> },
    { value: "cardio", label: "Cardio Only", icon: <FitnessCenter /> },
    { value: "weekly-plan", label: "Weekly Plan", icon: <Schedule /> }
  ];

  return (
    <Box sx={{
      p: { xs: 2, md: 4 },
      minHeight: "100vh",
      bgcolor: "#1e1e2f",
      color: "#fff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <Paper sx={{
        p: 4,
        bgcolor: "#2e2e40",
        maxWidth: "600px",
        width: "100%",
        borderRadius: 2
      }} elevation={4}>
        <Box sx={{
          display: "flex",
          alignItems: "center",
          mb: 3,
          justifyContent: "center"
        }}>
          <Avatar sx={{
            bgcolor: "#4dd0e1",
            color: "#1e1e2f",
            mr: 2,
            width: 40,
            height: 40
          }}>
            <FitnessCenter />
          </Avatar>
          <Typography variant="h4" sx={{ color: "#81d4fa", fontWeight: 600 }}>
            AI-Powered Exercise Generator
          </Typography>
        </Box>

        <Divider sx={{ bgcolor: "#4dd0e1", mb: 3 }} />

        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel id="goal-label" sx={{ color: "#81d4fa" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Lightbulb sx={{ mr: 1, fontSize: "1rem" }} />
              What do you want?
            </Box>
          </InputLabel>
          <Select
            labelId="goal-label"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            sx={{
              color: "#fff",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#4dd0e1"
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#81d4fa"
              }
            }}
          >
            <MenuItem value="exercises">
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <FitnessCenter sx={{ mr: 1, fontSize: "1rem" }} />
                Exercise Ideas
              </Box>
            </MenuItem>
            <MenuItem value="schedule">
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Schedule sx={{ mr: 1, fontSize: "1rem" }} />
                Full Workout Schedule
              </Box>
            </MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel id="focus-label" sx={{ color: "#81d4fa" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Whatshot sx={{ mr: 1, fontSize: "1rem" }} />
              Workout Focus
            </Box>
          </InputLabel>
          <Select
            labelId="focus-label"
            value={focus}
            onChange={(e) => setFocus(e.target.value)}
            sx={{
              color: "#fff",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#4dd0e1"
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#81d4fa"
              }
            }}
          >
            {focusOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {option.icon}
                  <Typography sx={{ ml: 1 }}>{option.label}</Typography>
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label={
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <MonitorWeight sx={{ mr: 1, fontSize: "1rem" }} />
              Your current weight (kg)
            </Box>
          }
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              color: "#fff",
              "& fieldset": {
                borderColor: "#4dd0e1"
              },
              "&:hover fieldset": {
                borderColor: "#81d4fa"
              }
            },
            "& .MuiInputLabel-root": {
              color: "#81d4fa"
            }
          }}
        />

        {error && (
          <Chip
            label={error}
            color="error"
            sx={{ mb: 2, width: "100%" }}
          />
        )}

        <Button
          fullWidth
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
          sx={{
            py: 1.5,
            mb: 3,
            bgcolor: "#4dd0e1",
            color: "#1e1e2f",
            fontWeight: 600,
            "&:hover": {
              bgcolor: "#81d4fa"
            }
          }}
          startIcon={loading ? null : <Lightbulb />}
        >
          {loading ? (
            <>
              <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
              Generating...
            </>
          ) : (
            "Get AI Suggestion"
          )}
        </Button>

        {response && (
          <Paper sx={{
            p: 3,
            bgcolor: "#34344a",
            border: "1px solid #4dd0e1",
            borderRadius: 2,
            whiteSpace: "pre-wrap"
          }}>
            <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
              {response}
            </Typography>
          </Paper>
        )}
      </Paper>
    </Box>
  );
};

export default Exercise;