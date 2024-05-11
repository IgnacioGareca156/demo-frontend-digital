import { Box } from "@mui/system";
import { useContext, useState } from "react";
import { GlobalContext } from "../services/global.context";
import MenuList from "./MenuList";


export default function NavListDrawerResponsive({ onClick }) {
  const {state} = useContext(GlobalContext)
  const [user,setUser] = useState(state?.alumno ? 'alumno' : null)
  return (
    <Box
      sx={{ width: 250, pt: 8 }}
      onClick={onClick}
    >
      
      {user === 'alumno' && <MenuList/>}
    </Box>
  );
}
