import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import useMediaQuery from '@mui/material/useMediaQuery'
import React, { useState } from 'react'
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp'
import useFetch from '../../services/hooks/useFetch'
import { IconButton } from '@mui/material'

const EliminarMeet = ({ meet_id }) => {
    const {eliminar} = useFetch()
    const [open, setOpen] = useState(false)

    const eliminarMeet = async () => {
        try {
            // Elimina El alumno por su id
            await eliminar(meet_id,'Meet','DELETE_MEET',{})

        } catch (error) {
            console.error('Error en la consulta', error)
        }
    }

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleCloseElimnar = async () => {
        await eliminarMeet()
        setOpen(false)
    }
    const handleClose = () => {
        setOpen(false)
    }

    return (
        <>
            <IconButton color="" size="large" onClick={handleClickOpen}>
                <DeleteSharpIcon />
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Eliminar Meet"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ¿Realmente desea eliminar este Meet?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        Cancelar
                    </Button>
                    <Button autoFocus onClick={handleCloseElimnar}>
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default EliminarMeet
