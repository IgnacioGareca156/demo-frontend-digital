import { Box, Divider, Paper, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import useFetch from '../../services/hooks/useFetch'
import { GlobalContext } from '../../services/global.context'
import Notificacion from './Notificacion'

const NotificacionDashboard = () => {
    const { get } = useFetch()
    const { state } = useContext(GlobalContext)
    const [loading, setLoading] = useState(true) // Estado para rastrear si se están cargando las notificaciones
    const [notificacionesCargadas, setNotificacionesCargadas] = useState(false) // Estado para rastrear si las notificaciones ya se cargaron

    // Obtener la fecha actual
    const fechaHasta = new Date()
    // Clonar la fecha actual para no modificarla directamente
    const fechaDesde = new Date(fechaHasta)
    // Restar 7 días
    fechaDesde.setDate(fechaDesde.getDate() - 7)

    // Formatear las fechas porque el filtro de directus acepta el formato YYYY-MM-DD
    const formatoFechaHasta = fechaHasta.toISOString()
    const formatoFechaDesde = fechaDesde.toISOString()

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true) // Establece el loading en true antes de la solicitud
            try {
                await get('Notificacion', 'GET_NOTIS', {
                    filter: {
                        date_created: {
                            _between: [formatoFechaDesde, formatoFechaHasta],
                        },
                        noti_aula: {
                            _eq: state.alumno?.alumno_aula.aula_id
                        }
                    },
                    sort: ['sort','-date_created']
                })
                setNotificacionesCargadas(true) // Las notificaciones se han cargado
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false) // Establecer loading en false después de la solicitud
            }
        }

        fetchData()
    }, []) 

    return (
        <Paper
            sx={{
                backgroundColor: 'white',
                padding: 2,
                borderRadius: 1,
                boxShadow: '0px 3px 15px rgba(0, 0, 0, 0.2)', // Esto define la sombra
                marginBottom: 5,
            }}
            elevation={1}
        >
            <Typography variant='h2' component={'h2'} sx={{ fontSize: {xs:'1.4rem',md:'2rem'}, paddingBottom: 2, px: 2 }}>
                Últimas Notificaciones
            </Typography>
            <Divider orientation="horizontal" variant="middle" />
            {/* Mostrar "Cargando..." solo si aún no se han cargado las notificaciones */}
            {loading && !notificacionesCargadas ? (
                <Box sx={{ paddingY: 2, px: 2, minHeight: 120, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant='paragraph' sx={{ color: '#9b9b9b', fontSize:  {xs:'1.3rem',md:'1.5rem'} }}>
                        Cargando...
                    </Typography>
                </Box>
            ) : (
                // Si las notificaciones se han cargado, mostrar las notificaciones si existen, de lo contrario, mostrar el mensaje de "No hay notificaciones nuevas"
                state.notis?.length > 0 ? (
                    state.notis.map((notificacion) => (
                        <div key={notificacion.noti_id}>
                            <Notificacion notificacion={notificacion} />
                            <Divider orientation="horizontal" variant="middle" />
                        </div>
                    ))
                ) : (
                    <Box sx={{ paddingY: 2, px: 2, minHeight: 120, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography variant='paragraph' sx={{ color: '#9b9b9b', fontSize: {xs:'1.3rem',md:'1.5rem'}, textAlign:'center' }}>
                            No hay notificaciones nuevas
                        </Typography>
                    </Box>
                )
            )}
        </Paper>
    )
}

export default NotificacionDashboard
