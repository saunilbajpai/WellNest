import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  Button,
  Stack,
  Avatar,
  Divider,
  useTheme,
  useMediaQuery
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  FitnessCenter,
  LocalDrink,
  Bedtime,
  ShowChart,
  EmojiObjects,
  Spa,
  Summarize,
  TrendingUp,
  HealthAndSafety,
  SelfImprovement
} from "@mui/icons-material";

const features = [
  {
    title: "Comprehensive Health Tracking",
    description: "Monitor all aspects of your wellness journey with our intuitive logging system. Track daily metrics including hydration, sleep quality, physical activity, and body composition.",
    icon: <HealthAndSafety fontSize="large" />,
    link: "/Addupdate",
    stats: "Users report 40% better consistency"
  },
  {
    title: "AI-Powered Wellness Insights",
    description: "Receive personalized recommendations powered by Gemini AI that analyze your patterns and suggest improvements tailored to your lifestyle and goals.",
    icon: <EmojiObjects fontSize="large" />,
    link: "/Logs",
    stats: "85% of users find our tips helpful"
  },
  {
    title: "Smart Exercise Planning",
    description: "Generate customized workout routines based on your fitness level, available equipment, and personal objectives. From beginner to advanced, we've got you covered.",
    icon: <FitnessCenter fontSize="large" />,
    link: "/exercise",
    stats: "200+ exercise variations available"
  },
  {
    title: "Visual Progress Analytics",
    description: "Our interactive dashboards transform your raw data into beautiful, insightful charts that reveal trends and patterns in your health journey.",
    icon: <ShowChart fontSize="large" />,
    link: "/Progress",
    stats: "Track up to 12 different metrics"
  },
  {
    title: "Mindfulness Companion",
    description: "Coming soon: Integrated mood tracking and meditation guides to help you maintain mental and emotional balance alongside physical health.",
    icon: <SelfImprovement fontSize="large" />,
    link: "#",
    stats: "Launching Q3 2024"
  },
  {
    title: "Weekly Wellness Reports",
    description: "Coming soon: Automated summaries that highlight your achievements, suggest areas for improvement, and keep you motivated week after week.",
    icon: <Summarize fontSize="large" />,
    link: "#",
    stats: "Beta testing in progress"
  }
];

const testimonials = [
  {
    name: "Sarah K.",
    role: "Fitness Enthusiast",
    quote: "WellNest helped me finally establish consistent hydration habits after years of struggling. The visual progress charts keep me motivated!",
    avatar: "SK"
  },
  {
    name: "Michael T.",
    role: "Office Worker",
    quote: "The AI-generated workouts fit perfectly into my busy schedule. I've never stuck with an exercise routine this long before.",
    avatar: "MT"
  },
  {
    name: "Priya N.",
    role: "Yoga Instructor",
    quote: "As someone who teaches wellness, I appreciate how WellNest combines physical and mental health tracking in one beautiful interface.",
    avatar: "PN"
  }
];

const stats = [
  { value: "10K+", label: "Active Users" },
  { value: "92%", label: "Satisfaction Rate" },
  { value: "150+", label: "Countries" },
  { value: "4.9★", label: "Average Rating" }
];

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        background: "linear-gradient(to bottom, #1e1e2f, #2a2a3d)",
        color: "#e0f7fa",
        minHeight: "100vh",
        py: 8,
        px: 2,
      }}
    >
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box textAlign="center" mb={10}>
          <Typography
            variant={isMobile ? "h3" : "h2"}
            sx={{
              fontWeight: "bold",
              background: "linear-gradient(90deg, #00e5ff, #4dd0e1)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 3,
              lineHeight: 1.2
            }}
          >
            Transform Your Wellness Journey with WellNest
          </Typography>
          <Typography 
            variant={isMobile ? "body1" : "h6"} 
            sx={{ 
              color: "#cccccc", 
              maxWidth: 800, 
              mx: "auto",
              lineHeight: 1.6,
              mb: 4
            }}
          >
            The all-in-one platform that combines health tracking, AI-powered insights, and personalized 
            recommendations to help you build sustainable habits and achieve your wellness goals.
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
            mt={2}
          >
            <Button
              component={Link}
              to="/Addupdate"
              variant="contained"
              color="info"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                fontWeight: "bold",
                background: "linear-gradient(90deg, #00e5ff, #4dd0e1)",
                '&:hover': {
                  background: "linear-gradient(90deg, #4dd0e1, #00e5ff)"
                }
              }}
            >
              Start Tracking Now
            </Button>
            <Button
              component={Link}
              to="/login"
              variant="outlined"
              color="info"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                fontWeight: "bold",
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2
                }
              }}
            >
              Existing User? Login
            </Button>
          </Stack>
        </Box>

        {/* Stats Section */}
        <Paper
          elevation={6}
          sx={{
            p: 4,
            mb: 8,
            backgroundColor: "rgba(46, 46, 64, 0.7)",
            backdropFilter: "blur(10px)",
            borderRadius: "16px",
            border: "1px solid rgba(77, 208, 225, 0.3)"
          }}
        >
          <Grid container spacing={2}>
            {stats.map((stat, index) => (
              <Grid item xs={6} sm={3} key={index}>
                <Box textAlign="center">
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: "bold",
                      color: "#00e5ff",
                      mb: 1
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#aaaaaa" }}>
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* Feature Cards */}
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "#4dd0e1",
            textShadow: "0 0 8px rgba(77,208,225,0.6)",
            mb: 6,
            position: "relative",
            "&::after": {
              content: '""',
              display: "block",
              width: "80px",
              height: "4px",
              background: "linear-gradient(90deg, #00e5ff, #4dd0e1)",
              margin: "16px auto 0",
              borderRadius: "2px"
            }
          }}
        >
          Why Choose WellNest?
        </Typography>

        <Grid container spacing={4} mb={10}>
          {features.map((feature, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <Paper
                elevation={6}
                sx={{
                  p: 4,
                  height: "100%",
                  backgroundColor: "#2e2e40",
                  borderRadius: "16px",
                  border: "1px solid rgba(77, 208, 225, 0.3)",
                  transition: "all 0.3s ease",
                  display: "flex",
                  flexDirection: "column",
                  '&:hover': {
                    backgroundColor: "#34344a",
                    transform: "translateY(-8px)",
                    boxShadow: "0 12px 24px rgba(0, 229, 255, 0.15)",
                    borderColor: "#4dd0e1"
                  },
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: "transparent",
                    color: "#4dd0e1",
                    width: 60,
                    height: 60,
                    mb: 3,
                    border: "2px solid #4dd0e1"
                  }}
                >
                  {feature.icon}
                </Avatar>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#81d4fa", mb: 2 }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "#dddddd", mb: 3, flexGrow: 1 }}
                >
                  {feature.description}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    display: "block",
                    color: "#4dd0e1",
                    fontStyle: "italic",
                    mb: 2
                  }}
                >
                  {feature.stats}
                </Typography>
                {feature.link !== "#" && (
                  <Button
                    component={Link}
                    to={feature.link}
                    size="medium"
                    variant="outlined"
                    color="info"
                    sx={{
                      alignSelf: "flex-start",
                      mt: "auto",
                      fontWeight: "bold"
                    }}
                  >
                    Explore Feature
                  </Button>
                )}
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Testimonials Section */}
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "#4dd0e1",
            textShadow: "0 0 8px rgba(77,208,225,0.6)",
            mb: 6
          }}
        >
          What Our Users Say
        </Typography>
        
        <Grid container spacing={4} mb={10}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper
                sx={{
                  p: 4,
                  height: "100%",
                  backgroundColor: "#2e2e40",
                  borderRadius: "16px",
                  border: "1px solid rgba(77, 208, 225, 0.3)",
                  position: "relative",
                  "&::before": {
                    content: '"“"',
                    position: "absolute",
                    top: 16,
                    left: 16,
                    fontSize: "4rem",
                    color: "rgba(77, 208, 225, 0.2)",
                    fontFamily: "serif",
                    lineHeight: 1
                  }
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: "#eeeeee",
                    fontStyle: "italic",
                    mb: 3,
                    position: "relative",
                    zIndex: 1
                  }}
                >
                  {testimonial.quote}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    sx={{
                      bgcolor: "#4dd0e1",
                      color: "#1e1e2f",
                      mr: 2,
                      fontWeight: "bold"
                    }}
                  >
                    {testimonial.avatar}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle2" sx={{ color: "#ffffff" }}>
                      {testimonial.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#aaaaaa" }}>
                      {testimonial.role}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Final CTA */}
        <Paper
          sx={{
            p: 6,
            textAlign: "center",
            backgroundColor: "rgba(77, 208, 225, 0.1)",
            borderRadius: "16px",
            border: "1px solid rgba(77, 208, 225, 0.3)",
            backdropFilter: "blur(8px)"
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: "#ffffff",
              mb: 3
            }}
          >
            Ready to Transform Your Health Journey?
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#cccccc",
              maxWidth: 600,
              mx: "auto",
              mb: 4
            }}
          >
            Join thousands of users who are achieving their wellness goals with WellNest.
          </Typography>
          <Button
            component={Link}
            to="/register"
            variant="contained"
            color="info"
            size="large"
            sx={{
              px: 6,
              py: 1.5,
              fontWeight: "bold",
              background: "linear-gradient(90deg, #00e5ff, #4dd0e1)",
              '&:hover': {
                background: "linear-gradient(90deg, #4dd0e1, #00e5ff)"
              }
            }}
          >
            Get Started for Free
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default Home;