import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import {
  Grid,
  Paper,
  Typography,
  Button,
  CircularProgress,
  Box,
  IconButton,
  Tooltip,
  Divider,
  Avatar,
  Chip
} from "@mui/material";
import {
  Delete,
  Refresh,
  Info,
  LocalDrink,
  Bedtime,
  DirectionsWalk,
  MonitorWeight,
  EmojiObjects
} from "@mui/icons-material";

const Logs = () => {
  const { user } = useAuth();
  const [logs, setLogs] = useState([]);
  const [message, setMessage] = useState("");
  const [tip, setTip] = useState("");
  const [loadingTip, setLoadingTip] = useState(false);
  const [loadingLogs, setLoadingLogs] = useState(false);

  const fetchLogs = async () => {
    try {
      if (!user) return;
      setLoadingLogs(true);
      const res = await axios.get(`http://localhost:8080/api/logs/${user.id}`);
      setLogs(res.data);
      setMessage("");
    } catch (err) {
      console.error("Error fetching logs:", err);
      setMessage("❌ Failed to fetch logs.");
    } finally {
      setLoadingLogs(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [user]);

  const handleDelete = async (logId) => {
    try {
      await axios.delete(`http://localhost:8080/api/logs/${logId}`);
      setLogs((prev) => prev.filter((log) => log.id !== logId));
      setMessage("✅ Log deleted successfully.");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error("Error deleting log:", err);
      setMessage("❌ Failed to delete log.");
    }
  };

  const handleGetTip = async () => {
    if (!user) return;
    setLoadingTip(true);
    setTip("");

    try {
      const res = await axios.post(`http://localhost:8080/api/tip/${user.id}`);
      setTip(res.data);
    } catch (err) {
      console.error("Error fetching tip:", err);
      setTip("❌ Failed to get health tip. Please try again.");
    } finally {
      setLoadingTip(false);
    }
  };

  const getLogEmoji = (log) => {
    const score = (log.waterIntake >= 2 ? 1 : 0) +
                 (log.sleepHours >= 7 ? 1 : 0) +
                 (log.steps >= 8000 ? 1 : 0);
    return ["😞", "😐", "🙂", "😊"][score];
  };

  return (
    <Box sx={{ 
      p: { xs: 2, md: 4 }, 
      minHeight: "100vh", 
      bgcolor: "#1e1e2f", 
      color: "#fff",
      overflow: "hidden"
    }}>
      <Grid container spacing={3} sx={{ height: "100%" }}>
        {/* Logs - 70% */}
        <Grid item xs={12} lg={8.4}>
          <Paper sx={{ 
            p: 3, 
            bgcolor: "#2e2e40",
            height: "100%",
            display: "flex",
            flexDirection: "column"
          }} elevation={4}>
            <Box sx={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center",
              mb: 2
            }}>
              <Typography variant="h5" sx={{ color: "#81d4fa", fontWeight: 600 }}>
                <LocalDrink sx={{ mr: 1, verticalAlign: "middle" }} />
                Your Health Logs
              </Typography>
              <Tooltip title="Refresh logs">
                <IconButton onClick={fetchLogs} color="primary" disabled={loadingLogs}>
                  <Refresh />
                </IconButton>
              </Tooltip>
            </Box>

            {message && (
              <Chip 
                label={message} 
                sx={{ 
                  mb: 2,
                  color: message.startsWith("✅") ? "#81c784" : "#e57373",
                  alignSelf: "flex-start"
                }}
              />
            )}

            {loadingLogs ? (
              <Box sx={{ display: "flex", justifyContent: "center", flexGrow: 1, alignItems: "center" }}>
                <CircularProgress color="primary" />
              </Box>
            ) : logs.length === 0 ? (
              <Box sx={{ 
                flexGrow: 1, 
                display: "flex", 
                flexDirection: "column", 
                justifyContent: "center", 
                alignItems: "center",
                textAlign: "center",
                p: 4
              }}>
                <Info color="primary" sx={{ fontSize: 60, mb: 2 }} />
                <Typography variant="h6" color="#81d4fa">No logs found</Typography>
                <Typography variant="body1" sx={{ mt: 1, color: "#aaa" }}>
                  Start tracking your health metrics to see them appear here.
                </Typography>
              </Box>
            ) : (
              <Box sx={{ 
                overflowY: "auto", 
                pr: 1,
                flexGrow: 1,
                "&::-webkit-scrollbar": {
                  width: "6px",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#4dd0e1",
                  borderRadius: "3px",
                }
              }}>
                {logs.map((log) => (
                  <Paper
                    key={log.id}
                    sx={{
                      p: 2,
                      my: 2,
                      bgcolor: "#383851",
                      borderLeft: "4px solid #4dd0e1",
                      position: "relative",
                      transition: "transform 0.2s",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.2)"
                      }
                    }}
                  >
                    <Box sx={{ 
                      position: "absolute", 
                      top: 8, 
                      right: 8,
                      fontSize: "1.5rem"
                    }}>
                      {getLogEmoji(log)}
                    </Box>
                    
                    <Typography variant="subtitle1" sx={{ 
                      color: "#4dd0e1", 
                      mb: 1,
                      display: "flex",
                      alignItems: "center"
                    }}>
                      <Avatar sx={{ 
                        bgcolor: "#1e1e2f", 
                        width: 24, 
                        height: 24, 
                        mr: 1,
                        fontSize: "0.8rem"
                      }}>
                        {new Date(log.date).getDate()}
                      </Avatar>
                      {new Date(log.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </Typography>

                    <Grid container spacing={1} sx={{ mb: 1 }}>
                      <Grid item xs={6} sm={3}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <LocalDrink color="primary" sx={{ mr: 1, fontSize: "1rem" }} />
                          <Typography variant="body2">
                            <strong>{log.waterIntake}</strong> L
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Bedtime color="primary" sx={{ mr: 1, fontSize: "1rem" }} />
                          <Typography variant="body2">
                            <strong>{log.sleepHours}</strong> hrs
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <DirectionsWalk color="primary" sx={{ mr: 1, fontSize: "1rem" }} />
                          <Typography variant="body2">
                            <strong>{log.steps.toLocaleString()}</strong>
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6} sm={3}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <MonitorWeight color="primary" sx={{ mr: 1, fontSize: "1rem" }} />
                          <Typography variant="body2">
                            <strong>{log.weight}</strong> kg
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>

                    <Divider sx={{ my: 1, bgcolor: "#4dd0e1" }} />

                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <Tooltip title="Delete log">
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(log.id)}
                          sx={{ color: "#e57373" }}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Paper>
                ))}
              </Box>
            )}
          </Paper>
        </Grid>

        {/* AI Health Tip - 30% */}
        <Grid item xs={12} lg={3.6}>
          <Paper sx={{ 
            p: 3, 
            bgcolor: "#2e2e40",
            height: "100%",
            display: "flex",
            flexDirection: "column"
          }} elevation={4}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <EmojiObjects color="primary" sx={{ mr: 1, fontSize: "1.8rem" }} />
              <Typography variant="h5" sx={{ color: "#4dd0e1", fontWeight: 600 }}>
                AI Health Coach
              </Typography>
            </Box>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleGetTip}
              disabled={loadingTip}
              sx={{ 
                mb: 3,
                py: 1.5,
                borderRadius: 2,
                fontWeight: 600,
                textTransform: "none",
                fontSize: "1rem"
              }}
              startIcon={loadingTip ? null : <EmojiObjects />}
            >
              {loadingTip ? (
                <>
                  <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
                  Analyzing...
                </>
              ) : (
                "Get Personalized Tip"
              )}
            </Button>

            {tip ? (
              <Box
                sx={{
                  flexGrow: 1,
                  p: 3,
                  border: "1px solid #4dd0e1",
                  borderRadius: 2,
                  backgroundColor: "#34344a",
                  color: "#ddd",
                  display: "flex",
                  flexDirection: "column",
                  "&::before": {
                    content: '"💡"',
                    fontSize: "1.5rem",
                    mb: 1
                  }
                }}
              >
                <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                  {tip}
                </Typography>
              </Box>
            ) : (
              <Box sx={{ 
                flexGrow: 1, 
                display: "flex", 
                flexDirection: "column", 
                justifyContent: "center", 
                alignItems: "center",
                textAlign: "center",
                p: 4,
                bgcolor: "#34344a",
                borderRadius: 2,
                border: "1px dashed #4dd0e1"
              }}>
                <EmojiObjects color="primary" sx={{ fontSize: 60, mb: 2 }} />
                <Typography variant="h6" color="#4dd0e1">Get Health Advice</Typography>
                <Typography variant="body2" sx={{ mt: 1, color: "#aaa" }}>
                  Click the button above to receive a personalized health tip based on your logs.
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Logs;