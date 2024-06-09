import { Fragment } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
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
      <Container maxWidth="sm">
        <Typography variant="body2">
          My sticky footer can be found here.
        </Typography>
        <Copyright />
      </Container>
    </Fragment>
  );
}
