import { Box, Divider, IconButton, Paper, Typography } from '@mui/material'
import React from 'react'
import RemoveRedEyeSharpIcon from '@mui/icons-material/RemoveRedEyeSharp';

const Notificacion = ({ notificacion }) => {
    const fecha = new Date(notificacion?.date_created)
    const fechaFormateada = fecha.toISOString().split('T')[0];

    return (
        <Box sx={{ paddingY: 2, px: 2, display: 'flex', justifyContent:'space-between', alignItems: 'center', flexDirection: 'row', minHeight:120, position: 'relative' }}>
            <Typography variant='h3' component={'h3'} sx={{ fontSize: '1.3rem' }}>
                {notificacion.noti_titulo}
            </Typography>
            <Box sx={{display:'flex', justifyContent: 'center', alignItems: 'center', flexDirection:'row'}}>
                <IconButton component={'a'} color='' aria-label='Ver Cartilla' size='large' target="_blank" href={`https://xer.pascalito.com.ar/assets/${notificacion.noti_file}`}>
                    <RemoveRedEyeSharpIcon />
                </IconButton>
                <Typography variant='paragraph' sx={{position: 'absolute', bottom: 0, right:16,color: '#a5a2a2'}}>
                    {fechaFormateada}
                </Typography>
            </Box>
        </Box>
    )
}

export default Notificacion
