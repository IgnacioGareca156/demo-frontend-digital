import { Box, Button, Container, Typography } from '@mui/material'
import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp';
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Reproductor = () => {
    const location = useLocation()
    const navigate = useNavigate()
    return (
        <Container maxWidth="lg" sx={{ paddingTop: 4 }}>
            <Button variant="outlined" startIcon={<ArrowBackSharpIcon />} sx={{position: 'relative',bottom:5}} onClick={() => {navigate('/digital/video')}}>
                Videos
            </Button>
            <Typography variant='h1' sx={{ mb: 3, fontSize: { xs: '2rem', md: '3rem' }, textAlign: 'center' }}>
                {location.state?.video_descripcion}
            </Typography>
            <Box sx={{ position: 'relative', paddingTop: '56.25%', width: '100%', height: 450 }}>
                <iframe src={`https://drive.google.com/file/d/${location.state?.video_link}/preview`} width='100%' height='100%' allowFullScreen style={{ position: 'absolute', top: 0, left: 0 }}>
                </iframe>
            </Box>
        </Container>
    )
}

export default Reproductor

