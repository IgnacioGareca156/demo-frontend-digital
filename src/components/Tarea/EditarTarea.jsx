import React, { useContext, useEffect, useRef, useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { InputLabel, MenuItem, Select, Box, IconButton } from '@mui/material'
import useFetch from '../../services/hooks/useFetch'
import useForm from '../../services/hooks/useForm'
import { directus } from '../../services/directus'
import { updateFile } from '@directus/sdk'
import EditSharpIcon from '@mui/icons-material/EditSharp';
import { GlobalContext } from '../../services/global.context'

export default function EditarTarea({ tarea_id, aulas, materias }) {
    const [open, setOpen] = useState(false)
    // const { fetchData: updateTarea } = useFetch('Tarea', 'UPDATE_TAREA')
    // const { state: state, fetchData: getTarea } = useFetch('Tarea', 'GET_TAREA')
    const sortedAulas = aulas?.sort((a, b) => a.aula_nombre.localeCompare(b.aula_nombre))
    const [selectedFile, setSelectedFile] = useState(null)
    const { state } = useContext(GlobalContext)
    const {getById,update} = useFetch()

    const validate = (form) => {
        let errors = {}
        // Puedes agregar validaciones si es necesario
        return errors
    }

    // Para manejar el cambio en la selección del archivo
    const handleFileChange = (event) => {
        const file = event.target.files[0]
        setSelectedFile(file)
    }
    
    const enviarArchivo = async () => {
        try {
            // Crea un objeto FormData y agrega el archivo a él
            const formData = new FormData()
            formData.append('folder', '9d99ab1e-8cb7-4eb1-bcfd-035e3ab8ae29')
            formData.append('storage', 'local')
            formData.append('filename_download', selectedFile.name)
            formData.append('title', form.tarea_titulo)
            formData.append('type', selectedFile.type)
            formData.append('file', selectedFile)

            // Sube el archivo a Directus
            const response = await directus.request(updateFile(form.tarea_file, formData))

            // Obtiene el ID del archivo desde la respuesta y lo asigna al formulario para la cartilla
            form.tarea_file = response.id
        } catch (error) {
            console.log(error)
        } finally {
            setSelectedFile(null)
        }
    }

    const enviarDatos = async () => {
        try {
            await enviarArchivo()

            // Realiza la solicitud UPDATE con el formulario actualizado
            await update(tarea_id,form,'Tarea','UPDATE_TAREA',{})
        } catch (error) {
            console.log('Error en la consulta', error)
        } finally {
            handleClose()
            setForm(form)
        }
    }

    const {
        form,
        setForm,
        errors,
        loadingForm,
        handleBlur,
        handleChange,
        handleSubmit,
    } = useForm(validate, {
        tarea_titulo: '',
        tarea_descripcion: '',
        tarea_file: '',
        tarea_aula: '',
        tarea_materia: '',
    }, enviarDatos)

    const handleClickOpen = () => {
        setOpen(true)

        // solicitud para obtener los datos de la tarea con el ID tarea_id
        getById(tarea_id,'Tarea','GET_TAREA',{})

    }

    const handleClose = () => {
        setOpen(false)
    }


    useEffect(() => {
        setForm({
            tarea_titulo: state.getTarea?.tarea_titulo || '',
            tarea_descripcion: state.getTarea?.tarea_descripcion || '',
            tarea_file: state.getTarea?.tarea_file || '',
            tarea_aula: state.getTarea?.tarea_aula || '',
            tarea_materia: state.getTarea?.tarea_materia || '',
        })
    }, [state.getTarea])

    return (
        <React.Fragment>
            <IconButton color='' aria-label='editar' size='large' onClick={handleClickOpen}>
                <EditSharpIcon />
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: handleSubmit
                }}
            >
                
                <DialogTitle>Editar Tarea</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Edite la información de la Tarea
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="tarea_titulo"
                        name="tarea_titulo"
                        label="Titulo"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={form.tarea_titulo}
                        onChange={handleChange}
                    />

                    <TextField
                        id="tarea_descripcion"
                        name="tarea_descripcion"
                        label="Descripción *"
                        multiline
                        rows={5}
                        variant="standard"
                        fullWidth
                        value={form.tarea_descripcion}
                        onChange={handleChange}
                    />

                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="tarea_file"
                        name="tarea_file"
                        label="Archivo"
                        type="file"
                        fullWidth
                        variant="standard"
                        onChange={handleFileChange}
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
                        <Box sx={{ width: '50%' }}>
                            <InputLabel id="materia-label" sx={{ mt: 2 }}>
                                Aula
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name="tarea_aula"
                                value={form?.tarea_aula}
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
                                Materia
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name="tarea_materia"
                                value={form?.tarea_materia}
                                label="Materia"
                                onChange={handleChange}
                                sx={{ width: '100%' }}
                            >

                                {materias?.map((materia) => (
                                    <MenuItem value={materia.materia_id} key={materia.materia_id}>{materia.materia_nombre}</MenuItem>
                                ))}
                            </Select>
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button type="submit" onSubmit={handleSubmit}>Guardar cambios</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}
