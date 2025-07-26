import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import {
  Box,
  Button,
  Container,
  Typography,
  Alert,
  Paper,
  Stepper,
  Step,
  StepLabel,
  IconButton,
  Tooltip,
  Divider,
  Avatar,
  Slide,
  Fade
} from "@mui/material";
import {
  LocalDrink,
  Bedtime,
  DirectionsWalk,
  MonitorWeight,
  CheckCircle,
  ArrowForward,
  ArrowBack,
  AddCircle
} from "@mui/icons-material";

const steps = [
  { label: "Water Intake", icon: <LocalDrink />, field: "waterIntake", unit: "liters" },
  { label: "Sleep Hours", icon: <Bedtime />, field: "sleepHours", unit: "hours" },
  { label: "Steps", icon: <DirectionsWalk />, field: "steps", unit: "steps" },
  { label: "Weight", icon: <MonitorWeight />, field: "weight", unit: "kg" }
];

const AddUpdate = () => {
  const { user } = useAuth();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    waterIntake: "",
    sleepHours: "",
    steps: "",
    weight: "",
  });
  const [message, setMessage] = useState({ type: "", text: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setMessage({ type: "error", text: "You must be logged in to submit." });
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:8080/api/logs/${user.id}`,
        formData
      );
      console.log("Health log saved:", res.data);
      setMessage({ type: "success", text: "Log submitted successfully!" });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      console.error("Error submitting log:", err);
      setMessage({ type: "error", text: "Failed to submit log." });
    }
  };

  const resetForm = () => {
    setFormData({
      waterIntake: "",
      sleepHours: "",
      steps: "",
      weight: "",
    });
    setActiveStep(0);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Slide direction="down" in={true} mountOnEnter unmountOnExit>
        <Paper
          elevation={10}
          sx={{
            p: 4,
            borderRadius: 4,
            backgroundColor: "#2e2e40",
            border: "1px solid #4dd0e1",
            boxShadow: "0 0 30px rgba(77, 208, 225, 0.3)",
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
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Avatar
              sx={{
                bgcolor: "#1e1e2f",
                color: "#4dd0e1",
                width: 60,
                height: 60,
                mb: 2,
                mx: "auto",
                border: "2px solid #4dd0e1"
              }}
            >
              <AddCircle sx={{ fontSize: 32 }} />
            </Avatar>
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
              Health Update
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "#aaa" }}>
              Track your daily health metrics
            </Typography>
          </Box>

          {message.text && (
            <Fade in={message.text !== ""}>
              <Alert
                severity={message.type}
                sx={{ mb: 3 }}
                onClose={() => setMessage({ type: "", text: "" })}
              >
                {message.text}
              </Alert>
            </Fade>
          )}

          {!submitted ? (
            <Box component="form" onSubmit={handleSubmit}>
              <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
                {steps.map((step, index) => (
                  <Step key={step.label}>
                    <StepLabel
                      StepIconComponent={() => (
                        <Avatar
                          sx={{
                            bgcolor: activeStep === index ? "#4dd0e1" : "#42425a",
                            color: activeStep === index ? "#1e1e2f" : "#ccc",
                            width: 32,
                            height: 32
                          }}
                        >
                          {React.cloneElement(step.icon, {
                            fontSize: activeStep === index ? "medium" : "small"
                          })}
                        </Avatar>
                      )}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          color: activeStep === index ? "#4dd0e1" : "#aaa",
                          fontWeight: activeStep === index ? "bold" : "normal"
                        }}
                      >
                        {step.label}
                      </Typography>
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>

              <Box sx={{ mb: 4 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2
                  }}
                >
                  {steps[activeStep].icon}
                  <Typography
                    variant="h6"
                    sx={{ ml: 1, color: "#4dd0e1", fontWeight: "bold" }}
                  >
                    {steps[activeStep].label}
                  </Typography>
                </Box>

                <Box
                  component="input"
                  name={steps[activeStep].field}
                  type="number"
                  value={formData[steps[activeStep].field]}
                  onChange={handleChange}
                  step={steps[activeStep].field === "weight" || steps[activeStep].field === "waterIntake" ? "0.1" : "1"}
                  placeholder={`Enter ${steps[activeStep].label.toLowerCase()} in ${steps[activeStep].unit}`}
                  required
                  sx={{
                    width: "100%",
                    p: 2,
                    fontSize: "1.2rem",
                    borderRadius: 2,
                    border: "2px solid #4dd0e1",
                    backgroundColor: "#42425a",
                    color: "#fff",
                    textAlign: "center",
                    "&:focus": {
                      outline: "none",
                      borderColor: "#00e5ff",
                      boxShadow: "0 0 10px rgba(0, 229, 255, 0.3)"
                    }
                  }}
                />
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                  variant="outlined"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                  startIcon={<ArrowBack />}
                  sx={{
                    color: "#4dd0e1",
                    borderColor: "#4dd0e1",
                    "&:hover": {
                      borderColor: "#00e5ff"
                    }
                  }}
                >
                  Back
                </Button>

                {activeStep === steps.length - 1 ? (
                  <Button
                    variant="contained"
                    type="submit"
                    endIcon={<CheckCircle />}
                    sx={{
                      backgroundColor: "#00e5ff",
                      color: "#1e1e2f",
                      fontWeight: "bold",
                      "&:hover": {
                        backgroundColor: "#1de9b6"
                      }
                    }}
                  >
                    Submit
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    endIcon={<ArrowForward />}
                    sx={{
                      backgroundColor: "#4dd0e1",
                      color: "#1e1e2f",
                      fontWeight: "bold",
                      "&:hover": {
                        backgroundColor: "#00e5ff"
                      }
                    }}
                  >
                    Next
                  </Button>
                )}
              </Box>
            </Box>
          ) : (
            <Fade in={submitted}>
              <Box sx={{ textAlign: "center", p: 4 }}>
                <CheckCircle
                  sx={{
                    fontSize: 80,
                    color: "#1de9b6",
                    mb: 2
                  }}
                />
                <Typography variant="h5" sx={{ color: "#4dd0e1", mb: 2 }}>
                  Update Submitted!
                </Typography>
                <Typography variant="body1" sx={{ color: "#aaa", mb: 3 }}>
                  Your health metrics have been successfully recorded.
                </Typography>
                <Button
                  variant="outlined"
                  onClick={resetForm}
                  startIcon={<AddCircle />}
                  sx={{
                    color: "#4dd0e1",
                    borderColor: "#4dd0e1",
                    "&:hover": {
                      borderColor: "#00e5ff"
                    }
                  }}
                >
                  Add Another
                </Button>
              </Box>
            </Fade>
          )}
        </Paper>
      </Slide>
    </Container>
  );
};

export default AddUpdate;