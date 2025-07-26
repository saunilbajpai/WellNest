import React from "react";
import { Box, Typography, Link as MuiLink, Stack, Divider } from "@mui/material";
import { Link } from "react-router-dom";

const Footer = () => {
  const quickLinks = [
    { label: "Home", to: "/" },
    { label: "Add Log", to: "/Addupdate" },
    { label: "View Logs", to: "/Logs" },
    { label: "Progress", to: "/Progress" },
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#2e2e40",
        color: "#e0f7fa",
        py: 3,
        px: 2,
        borderTop: "1px solid rgba(77, 208, 225, 0.2)",
      }}
    >
      <Box sx={{ maxWidth: "lg", mx: "auto" }}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={4} mb={3}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ color: "#4dd0e1", mb: 1 }}>
              WellNest
            </Typography>
            <Typography variant="body2" sx={{ color: "#aaaaaa" }}>
              Your personal health companion
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ color: "#4dd0e1", mb: 1 }}>
              Quick Links
            </Typography>
            <Stack spacing={1}>
              {quickLinks.map((link) => (
                <MuiLink
                  key={link.to}
                  component={Link}
                  to={link.to}
                  sx={{
                    color: "#cccccc",
                    '&:hover': { color: "#4dd0e1" },
                  }}
                >
                  {link.label}
                </MuiLink>
              ))}
            </Stack>
          </Box>
        </Stack>

        <Divider sx={{ borderColor: "rgba(77, 208, 225, 0.2)", my: 2 }} />

        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems="center"
          spacing={1}
        >
          <Typography variant="body2" sx={{ color: "#aaaaaa" }}>
            © {new Date().getFullYear()} WellNest
          </Typography>
          <Stack direction="row" spacing={2}>
            <MuiLink component={Link} to="/privacy" sx={{ color: "#81d4fa" }}>
              Privacy
            </MuiLink>
            <MuiLink component={Link} to="/terms" sx={{ color: "#81d4fa" }}>
              Terms
            </MuiLink>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default Footer;