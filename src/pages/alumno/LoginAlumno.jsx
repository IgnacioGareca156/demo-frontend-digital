import React from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import logo from './../../assets/logo.png'
import useFormAlumno from '../../services/hooks/useFormAlumno';
import { CircularProgress } from '@mui/material';


const LoginAlumno = () => {
  const regex = /^[0-9]+$/;
  const initialForm = {
    alumno_dni: ''
  }

  const validate = (form) => {
    let errors= {}

    if (!form.alumno_dni.trim()) {
      errors.alumno_dni = "El campo 'DNI' es requerido"
    }else if(!regex.test(form.alumno_dni)){
      errors.alumno_dni = "El campo Dni solo admite números"
    }
    
    return errors
  }

  const {
    form,
    errors,
    loading,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormAlumno(validate,initialForm)

  return (
    <div>
      <>
       <Container component="main" maxWidth="xs" >
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box
            component="img"
            sx={{ m:1}}
            src={logo}
          >

          </Box>
          <Typography component="h1" variant="h5">
            Iniciar Sesión
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
            <TextField
              error={errors?.alumno_dni ? true : false}
              helperText={errors?.alumno_dni}
              margin="normal"
              fullWidth
              id="alumno_dni"
              label="DNI"
              name="alumno_dni"
              autoComplete="dni"
              autoFocus
              type="number"
              max={'8'}
              onBlur={handleBlur}
              onChange={handleChange}
              value={form.alumno_dni}
            />
            {errors?.alumno && 
                <Typography
                  sx={{
                    textAlign: 'center',
                    color: 'red',
                    fontSize: '0.9rem'
                  }}
                > 
                  {errors?.alumno}
                </Typography>
              }
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading ? true : false}
              sx={{ mt: 3, mb: 2 }}
            >
             {loading ?  <CircularProgress sx={{color: 'white'}} /> : 'Ingresar' }
            </Button>
          </Box>
        </Box>
      </Container>
    </>
    </div>
  )
}

export default LoginAlumno
