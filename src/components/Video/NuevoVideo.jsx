import React, { useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { InputLabel, MenuItem, Select, Box } from '@mui/material';
import useFetch from '../../services/hooks/useFetch';
import useForm from '../../services/hooks/useForm';
import { GlobalContext } from '../../services/global.context';

export default function NuevoVideo() {

    const [open, setOpen] = React.useState(false);
    const { get, post } = useFetch()
    const { state } = useContext(GlobalContext)
    const sortedAulas = state.aulas.sort((a, b) => a.aula_nombre.localeCompare(b.aula_nombre))

    
    useEffect(() => {
        get('Aula', 'GET_AULAS', {})
        get('Materia', 'GET_MATERIAS', {})
    }, [])

    const initialForm = {
        video_descripcion: '',
        video_link: '',
        video_aula: '',
        video_materia: '',
    }

    const validate = (form) => {
        let errors = {}

        // if (!form.profesor_usuario.trim()) {
        //   errors.profesor_usuario = "El campo 'Usuario' es requerido"
        // }

        // if (!form.profesor_password.trim()) {
        //   errors.profesor_password = "El campo 'Contraseña' es requerido"
        // }
        return errors
    }

    const enviarDatos = async () => {

        try{
            // Realiza la operacion POST con el formulario actual
            await post(form, 'Video', 'POST_VIDEO', {})
            handleClose();
            setForm(initialForm)
        }catch(error){
            console.error('Error en la consulta',error)
        }
    };

    const {
        form,
        setForm,
        errors,
        loadingForm,
        handleBlur,
        handleChange,
        handleSubmit,
    } = useForm(validate, initialForm, enviarDatos)


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

 

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                Nuevo Video
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: handleSubmit
                }}
            >
                <DialogTitle>Nuevo Video</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Registre un Video
                    </DialogContentText>

                    <TextField
                        id="video_descripcion"
                        name="video_descripcion"
                        label="Descripción *"
                        multiline
                        rows={5}
                        variant="standard"
                        fullWidth
                        value={form.video_descripcion}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!errors.video_descripcion}
                        helperText={errors.video_descripcion}
                    />

                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="video_link"
                        name="video_link"
                        label="Link"
                        type="url"
                        fullWidth
                        variant="standard"
                        value={form.video_link}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={!!errors.video_link}
                        helperText={errors.video_link}
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
                        <Box sx={{ width: '50%' }}>
                            <InputLabel id="materia-label" sx={{ mt: 2 }}>
                                Aula
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name="video_aula"
                                value={form?.video_aula}
                                label="Aula"
                                onChange={handleChange}
                                sx={{ width: '100%' }}
                            >
                                {sortedAulas?.map((aula) => (
                                    <MenuItem value={aula.aula_id} key={aula.aula_id}>{aula.aula_nombre}</MenuItem>
                                ))}
                            </Select>
                        </Box>
                    
                        <Box sx={{ width: '50%' }}>
                            <InputLabel id="materia-label" sx={{ mt: 2 }}>
                                Aula
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name="video_materia"
                                value={form?.video_materia}
                                label="Aula"
                                onChange={handleChange}
                                sx={{ width: '100%' }}
                            >
                                {state.materias?.map((materia) => (
                                    <MenuItem value={materia.materia_id} key={materia.materia_id}>{materia.materia_nombre}</MenuItem>
                                ))}
                            </Select>
                        </Box>
                    </Box>
                    

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button type="submit" onSubmit={handleSubmit}>Registrar</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
