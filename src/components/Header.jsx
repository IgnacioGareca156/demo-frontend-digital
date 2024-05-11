import {
  AppBar,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

import {  useState } from "react";
import NavListDrawerResponsive from "./NavListDrawerResponsive";

export default function Navbar() {
  const [open, setOpen] = useState(false)


  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            size="large"
            edge="start"
            aria-label="menu"
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1 }}
          >
            Pascalito Digital
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
      >
        <NavListDrawerResponsive 
          onClick={() => setOpen(false)}
        />
      </Drawer>
    </>
  );
}
