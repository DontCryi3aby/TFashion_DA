import React from "react";

import Dashboard from "./Dashboard";

import { Grid } from "@mui/material";
import { AdminHeader } from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";

export default function Homeadmin() {
  return (
    <>
      <AdminHeader />
      <Grid container spacing={2} columns={24}>
        <Grid item xs={5}>
          <AdminSidebar />
        </Grid>
        <Grid item xs={19}>
          <Dashboard />
        </Grid>
      </Grid>
    </>
  );
}
