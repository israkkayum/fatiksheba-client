import { Box, CircularProgress, Paper } from "@mui/material";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const AdminRoute = ({ children, ...rest }) => {
  const { user, admin, isLoading, isLoadingAdmin } = useAuth();

  const location = useLocation();

  if (isLoading && isLoadingAdmin) {
    return (
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          "& > :not(style)": {
            m: 1,
            my: 5,
            width: 128,
            height: 128,
          },
        }}
      >
        <Paper
          elevation={1}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Paper>
      </Box>
    );
  }
  if (user.email && admin) {
    return children;
  }
  return <Navigate to="/" state={{ from: location }} />;
};

export default AdminRoute;
