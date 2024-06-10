import { Fragment } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {"Copyright © "}
      <Link color="inherit" href="/">
        No Money
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Footer() {
  return (
    <Fragment>
      <CssBaseline />
      <Paper
        sx={{
          marginTop: "calc(10% + 60px)",
          position: "fixed",
          bottom: 0,
          width: "100%",
        }}
        component="footer"
        square
        variant="outlined"
      >
        <Typography variant="body2">
          My sticky footer can be found here.
        </Typography>
        <Copyright />
      </Paper>
    </Fragment>
  );
}
