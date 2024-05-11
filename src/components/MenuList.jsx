import React, { useContext } from 'react'
import OndemandVideoSharpIcon from '@mui/icons-material/OndemandVideoSharp';
import BookSharpIcon from '@mui/icons-material/BookSharp';
import VideoCameraFrontSharpIcon from '@mui/icons-material/VideoCameraFrontSharp';
import BusinessCenterSharpIcon from '@mui/icons-material/BusinessCenterSharp';
import EmailSharpIcon from '@mui/icons-material/EmailSharp';
import MenuBookSharpIcon from '@mui/icons-material/MenuBookSharp';
import LogoutSharpIcon from '@mui/icons-material/LogoutSharp';
import HomeSharpIcon from '@mui/icons-material/HomeSharp';
import PasswordSharpIcon from '@mui/icons-material/PasswordSharp';
import PeopleAltSharpIcon from '@mui/icons-material/PeopleAltSharp';
import SchoolSharpIcon from '@mui/icons-material/SchoolSharp';
import BorderColorSharpIcon from '@mui/icons-material/BorderColorSharp';
import DescriptionSharpIcon from '@mui/icons-material/DescriptionSharp';
import {
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    ListItemIcon,
    Typography
} from "@mui/material";
import { GlobalContext } from '../services/global.context';
import { useNavigate, Navigate } from 'react-router-dom';
const MenuList = () => {
    const navigate = useNavigate()
    const { state, dispatch } = useContext(GlobalContext)

    const handleLogut = () => {
        dispatch({ type: 'LOGOUT', dispatch: null })
        return <Navigate to={"/"} />
    }

    return (
        <>
            <nav aria-label="main mailbox folders">
                <Typography sx={{ position: 'absolute', top: '23px', fontSize: '25px', fontWeight: 'bold', width: '100%', textAlign: 'center' }}>Pascalito Digital</Typography>
                <List>
                    {/* INICIO */}
                    <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { navigate("/digital") }} >
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                <HomeSharpIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Inicio'} sx={{ opacity: open ? 1 : 0 }}></ListItemText>
                        </ListItemButton>
                    </ListItem>
                    {/* NOTIFICACIONES */}
                    <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { navigate("/digital/notificaciones") }}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                <EmailSharpIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Notificaciones'} sx={{ opacity: open ? 1 : 0 }}></ListItemText>
                        </ListItemButton>
                    </ListItem>
                    {/* TRABAJOS PRACTICOS */}
                    <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { navigate("/digital/tps") }}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                <BusinessCenterSharpIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Trabajos Prácticos'} sx={{ opacity: open ? 1 : 0 }}></ListItemText>
                        </ListItemButton>
                    </ListItem>
                    {/* TAREAS */}
                    <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { navigate("/digital/tareas") }}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                <BorderColorSharpIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Tareas'} sx={{ opacity: open ? 1 : 0 }}></ListItemText>
                        </ListItemButton>
                    </ListItem>
                    {/* VIDEO */}
                    <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { navigate("/digital/video") }}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                <OndemandVideoSharpIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Videos'} sx={{ opacity: open ? 1 : 0 }}></ListItemText>
                        </ListItemButton>
                    </ListItem>
                    {/*  CLASES VIRTUALES / VIDEO_CONFERENCIA */}
                    <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { navigate("/digital/video_conferencia") }}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                <VideoCameraFrontSharpIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Clases Virtuales'} sx={{ opacity: open ? 1 : 0 }}></ListItemText>
                        </ListItemButton>
                    </ListItem>
                    {/* CARTILLAS */}
                    <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { navigate("/digital/cartilla") }}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                <DescriptionSharpIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Cartillas'} sx={{ opacity: open ? 1 : 0 }}></ListItemText>
                        </ListItemButton>
                    </ListItem>
                    {/* BIBLIOTECA / LIBRERÍA */}
                    <ListItem disablePadding sx={{ display: 'block' }} onClick={() => { navigate("/digital/biblioteca") }}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                <MenuBookSharpIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Biblioteca'} sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>
                </List>
                <Divider />
                {/* SALIR */}
                <ListItem disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                        }}
                        onClick={handleLogut}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                        >
                            <LogoutSharpIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Salir'} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                </ListItem>

            </nav>
        </>
    )
}

export default MenuList
