import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

//fuente
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import CssBaseline from '@mui/material/CssBaseline';

import { createTheme, ThemeProvider } from "@mui/material/styles";

import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom"

import Layout from './pages/Layout';
import LayoutLogin from './pages/LayoutLogin';
import LoginAlumno from './pages/alumno/LoginAlumno';
import ContextProvider from './services/global.context';

import Cartilla from './pages/alumno/Cartilla';
import Dashboard from './pages/Dashboard'
import Tareas from './pages/alumno/Tareas';
import Tps from './pages/alumno/Tps';
import Meet from './pages/alumno/Meet';
import Video from './pages/alumno/Video';
import Biblioteca from './pages/alumno/Biblioteca';
import Notificacion from './pages/alumno/Notificacion';
import { AuthProtectedRouteAlumno, ProtectedRouteAlumno } from './components/ProtectedRouteAlumno';
import Reproductor from './pages/alumno/Reproductor';

const router = createHashRouter([
  {

    path: '/',
    element: <LayoutLogin />,
    children: [
      {
        index: true,
        element: (<AuthProtectedRouteAlumno> <LoginAlumno /> </AuthProtectedRouteAlumno>),
      },
    ]
  },
  { //rutas protegidas para el alumno
    path: 'digital',
    element: <Layout />,
    children: [
      {
        path: 'cartilla',
        element: (<ProtectedRouteAlumno> <Cartilla /> </ProtectedRouteAlumno>),
      },
      {
        path: 'tps',
        element: (<ProtectedRouteAlumno> <Tps /> </ProtectedRouteAlumno>),
      },
      {
        path: 'tareas',
        element: (<ProtectedRouteAlumno> <Tareas /> </ProtectedRouteAlumno>),
      },
      {
        path: 'biblioteca',
        element: (<ProtectedRouteAlumno> <Biblioteca /> </ProtectedRouteAlumno>),
      },
      {
        path: 'video_conferencia',
        element: (<ProtectedRouteAlumno> <Meet /> </ProtectedRouteAlumno>),
      },
      {
        path: 'video',
        element: (<ProtectedRouteAlumno> <Video /> </ProtectedRouteAlumno>),
      },
      {
        path: 'video/:video_id',
        element: (<ProtectedRouteAlumno> <Reproductor /> </ProtectedRouteAlumno>),
      },
      {
        path: 'notificaciones',
        element: (<ProtectedRouteAlumno> <Notificacion /> </ProtectedRouteAlumno>),
      },
      {
        index: true,
        element: (<ProtectedRouteAlumno> <Dashboard/> </ProtectedRouteAlumno>)
      },


    ]
  }
])

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#39C7F4',
    },
    secondary: {
      main: '#e60000',
    },
    error: {
      main: '#f30000',
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ContextProvider>
        <RouterProvider router={router} />
      </ContextProvider>
    </ThemeProvider>
  </>
)
