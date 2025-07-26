import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, 
  ResponsiveContainer, Legend
} from "recharts";
import { 
  Box, 
  Paper, 
  Typography, 
  CircularProgress,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from "@mui/material";
import { useAuth } from "../Context/AuthContext";
import {
  ShowChart,
  DirectionsWalk,
  LocalDrink,
  MonitorWeight,
  Bedtime
} from "@mui/icons-material";

const Progress = () => {
  const { user } = useAuth();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [timeRange, setTimeRange] = useState("7");
  const [selectedMetric, setSelectedMetric] = useState("weight");

  useEffect(() => {
    const fetchLogs = async () => {
      if (!user) return;
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:8080/api/logs/${user.id}`);
        const sortedLogs = res.data.sort((a, b) => new Date(a.date) - new Date(b.date));
        
        // Filter based on selected time range
        let filteredLogs = sortedLogs;
        if (timeRange !== "all") {
          const days = parseInt(timeRange);
          const cutoffDate = new Date();
          cutoffDate.setDate(cutoffDate.getDate() - days);
          filteredLogs = sortedLogs.filter(log => new Date(log.date) >= cutoffDate);
        }
        
        setLogs(filteredLogs);
      } catch (err) {
        console.error("Error fetching logs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [user, timeRange]);

  const metrics = [
    { key: "weight", label: "Weight (kg)", color: "#00b894", icon: <MonitorWeight /> },
    { key: "steps", label: "Steps", color: "#f39c12", icon: <DirectionsWalk /> },
    { key: "waterIntake", label: "Water Intake (L)", color: "#0984e3", icon: <LocalDrink /> },
    { key: "sleepHours", label: "Sleep (hours)", color: "#6c5ce7", icon: <Bedtime /> }
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <Box sx={{ 
      p: { xs: 2, md: 4 }, 
      minHeight: "100vh", 
      bgcolor: "#1e1e2f", 
      color: "#fff"
    }}>
      <Paper sx={{ 
        p: 3, 
        bgcolor: "#2e2e40",
        mb: 3
      }} elevation={4}>
        <Box sx={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          mb: 3,
          flexWrap: "wrap",
          gap: 2
        }}>
          <Typography variant="h4" sx={{ color: "#81d4fa", fontWeight: 600 }}>
            <ShowChart sx={{ mr: 1, verticalAlign: "bottom" }} />
            Your Progress
          </Typography>
          
          <Box sx={{ display: "flex", gap: 2 }}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel sx={{ color: "#81d4fa" }}>Time Range</InputLabel>
              <Select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                sx={{
                  color: "#fff",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#4dd0e1"
                  }
                }}
              >
                <MenuItem value="7">Last 7 Days</MenuItem>
                <MenuItem value="14">Last 14 Days</MenuItem>
                <MenuItem value="30">Last 30 Days</MenuItem>
                <MenuItem value="all">All Time</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel sx={{ color: "#81d4fa" }}>Metric</InputLabel>
              <Select
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                sx={{
                  color: "#fff",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#4dd0e1"
                  }
                }}
              >
                {metrics.map(metric => (
                  <MenuItem key={metric.key} value={metric.key}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      {metric.icon}
                      {metric.label}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress color="primary" />
          </Box>
        ) : logs.length === 0 ? (
          <Box sx={{ 
            p: 4, 
            textAlign: "center",
            bgcolor: "#34344a",
            borderRadius: 2
          }}>
            <Typography variant="h6" color="#81d4fa">
              No progress data available
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, color: "#aaa" }}>
              {timeRange === "all" 
                ? "You haven't logged any health data yet." 
                : `No data available for the last ${timeRange} days.`}
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {/* Main Chart */}
            <Grid item xs={12}>
              <Paper sx={{ 
                p: 2, 
                bgcolor: "#383851",
                height: "100%"
              }}>
                <Typography variant="h6" sx={{ mb: 2, color: "#81d4fa" }}>
                  {metrics.find(m => m.key === selectedMetric)?.icon}
                  {metrics.find(m => m.key === selectedMetric)?.label}
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={logs}>
                    <Line 
                      type="monotone" 
                      dataKey={selectedMetric} 
                      stroke={metrics.find(m => m.key === selectedMetric)?.color} 
                      strokeWidth={3} 
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <CartesianGrid stroke="#444" strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="date" 
                      stroke="#ccc" 
                      tickFormatter={formatDate}
                      tick={{ fill: '#ccc' }}
                    />
                    <YAxis 
                      stroke="#ccc" 
                      tick={{ fill: '#ccc' }}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: '#2e2e40',
                        borderColor: '#4dd0e1',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                  </LineChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>

            {/* Mini Charts */}
            {metrics.filter(m => m.key !== selectedMetric).map(metric => (
              <Grid item xs={12} sm={6} md={3} key={metric.key}>
                <Paper sx={{ 
                  p: 2, 
                  bgcolor: "#383851",
                  height: "100%",
                  '&:hover': {
                    borderLeft: `3px solid ${metric.color}`,
                    cursor: "pointer"
                  }
                }} onClick={() => setSelectedMetric(metric.key)}>
                  <Typography variant="subtitle2" sx={{ color: "#81d4fa" }}>
                    {metric.icon}
                    {metric.label}
                  </Typography>
                  <ResponsiveContainer width="100%" height={120}>
                    <LineChart data={logs}>
                      <Line 
                        type="monotone" 
                        dataKey={metric.key} 
                        stroke={metric.color} 
                        strokeWidth={2} 
                        dot={false}
                      />
                      <CartesianGrid stroke="#444" strokeDasharray="3 3" horizontal={false} />
                      <XAxis 
                        dataKey="date" 
                        stroke="#ccc" 
                        tickFormatter={formatDate}
                        tick={{ fill: '#ccc', fontSize: 10 }}
                        hide
                      />
                      <YAxis 
                        stroke="#ccc" 
                        tick={{ fill: '#ccc', fontSize: 10 }}
                        width={30}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>
    </Box>
  );
};

export default Progress;