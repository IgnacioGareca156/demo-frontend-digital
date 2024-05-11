import React, { useContext,useEffect, useRef, useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { InputLabel, MenuItem, Select, Box } from '@mui/material'
import useFetch from './../../services/hooks/useFetch'
import useForm from './../../services/hooks/useForm'
import { directus } from './../../services/directus'
import { uploadFiles } from '@directus/sdk'
import { GlobalContext } from '../../services/global.context'

export default function NuevoTp() {
    const [open, setOpen] = useState(false)
    // const { state } = useFetch('Aula', 'GET_AULAS')
    // const { state: stateMaterias, fetchData } = useFetch('Materia', 'GET_MATERIAS')
    // const { fetchData: postTp } = useFetch('Tp', 'POST_TP')
    const {state} = useContext(GlobalContext)
    const {post,get,loading} = useFetch()
    const sortedAulas = state.aulas?.sort((a, b) => a.aula_nombre.localeCompare(b.aula_nombre))
    const [selectedFile, setSelectedFile] = useState(null)

    // useEffect(() => {
    //     fetchData()
    // }, [])
    useEffect(() => {
        get('Aula','GET_AULAS',{})
        get('Materia','GET_MATERIAS',{})
    },[])

    const initialForm = {
        tp_titulo: '',
        tp_descripcion: '',
        tp_file: null,
        tp_aula: '',
        tp_materia: ''
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
    //para manejar el cambio en la selección del archivo
    const handleFileChange = (event) => {
        const file = event.target.files[0]
        setSelectedFile(file)
    }

    const enviarArchivo = async () => {
        try {
            // Crea un objeto FormData y agrega el archivo a él
            const formData = new FormData()
            formData.append('folder', '0fcf39b0-e4cb-40b4-9b61-e38975c870c0')
            formData.append('storage', 'local')
            formData.append('filename_download', selectedFile.name)
            formData.append('title', form.tp_titulo) //el titulo debe ser el titulo del formulario o el titulo del archivo??
            formData.append('type', selectedFile.type)
            formData.append('file', selectedFile)

            // Sube el archivo a Directus
            const response = await directus.request(uploadFiles(formData))

            // Obtiene el ID del archivo desde la respuesta y lo asigna al formulario para la Tarea
            form.tp_file = response.id

        } catch (error) {
            console.log(error)
        } finally {
            setSelectedFile(null)
        }
    }

    const enviarDatos = async () => {

        try {
            await enviarArchivo() //invoca a la funcion que carga el archivo

            // Realiza la solicitud POST con el formulario actualizado
            await post(form,'Tp','POST_TP',{})

        } catch (error) {
            console.log('Error en la consulta', error)
        } finally {
            handleClose()
            setForm(initialForm)
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
    } = useForm(validate, initialForm, enviarDatos)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }


    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                Nuevo Trabajo Práctico
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: handleSubmit
                }}
            >
                <DialogTitle>Nueva Trabajo Práctico</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Registre un nuevo Trabajo Práctico
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="tp_titulo"
                        name="tp_titulo"
                        label="Titulo"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={form.tp_titulo}
                        onChange={handleChange}
                    />

                    <TextField
                        id="tp_descripcion"
                        name="tp_descripcion"
                        label="Descripción *"
                        multiline
                        rows={5}
                        variant="standard"
                        fullWidth
                        value={form.tp_descripcion}
                        onChange={handleChange}
                    />

                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="tp_file"
                        name="tp_file"
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
                                name="tp_aula"
                                value={form.tp_aula}
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
                                name="tp_materia"
                                value={form.tp_materia}
                                label="Materia"
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
    )
}