import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

const Loader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      
        color: "#ffffff",
      }}
    >
      <CircularProgress size={80} thickness={5} sx={{ color: "#ff9800", mb: 2 }} />
      <Typography
        variant="h5"
        fontWeight="bold"
        sx={{ textTransform: "uppercase", letterSpacing: 1 }}
      >
        Loading...
      </Typography>
    </Box>
  );
};

export default Loader;
