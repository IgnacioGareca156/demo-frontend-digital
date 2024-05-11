import React, { useContext, useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { GlobalContext } from '../services/global.context';
import useFetch from '../services/hooks/useFetch';
import NotificacionDashboard from '../components/Inicio/NotificacionDashboard';

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const defaultTheme = createTheme();

export default function Album() {
  const { state } = useContext(GlobalContext)
  const  {get} = useFetch()
  useEffect(() => {
    get('Aula','GET_AULAS',{limit: -1})
  },[])

  return (
    <Box>
      {/* Hero unit */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 3,
          pb: 5,
        }}
      >

        <Container maxWidth="xl">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
            sx={{fontSize: {xs:'2.5rem', md:'3.2rem'}}}
          >
            Bienvenido {`${state.alumno?.alumno_nombre} ${state.alumno?.alumno_apellido}`}, {`${state.alumno?.alumno_aula.aula_nombre}`}

          </Typography>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
          </Stack>
        </Container>
      </Box>
      <NotificacionDashboard/>
    </Box>
  );
}