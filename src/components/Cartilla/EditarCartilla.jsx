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

export default function EditarCartilla({ cartilla_id, aulas, materias }) {
    const [open, setOpen] = useState(false)
    const sortedAulas = aulas.sort((a, b) => a.aula_nombre.localeCompare(b.aula_nombre))
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
            formData.append('folder', '85ba9a18-48e3-4353-81fa-12f00c27b597')
            formData.append('storage', 'local')
            formData.append('filename_download', selectedFile.name)
            formData.append('title', form.cartilla_titulo)
            formData.append('type', selectedFile.type)
            formData.append('file', selectedFile)

            // Sube el archivo a Directus
            const response = await directus.request(updateFile(form.cartilla_file, formData))

            // Obtiene el ID del archivo desde la respuesta y lo asigna al formulario para la cartilla
            form.cartilla_file = response.id
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
            await update(cartilla_id,form,'Cartilla','UPDATE_CARTILLA',{})
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
        cartilla_titulo: state.getCartilla?.cartilla_titulo,
        cartilla_descripcion: state.getCartilla?.cartilla_descripcion,
        cartilla_file: state.getCartilla?.cartilla_file,
        cartilla_aula: state.getCartilla?.cartilla_aula,
        cartilla_materia: state.getCartilla?.cartilla_materia,
    }, enviarDatos)

    const handleClickOpen = () => {
        setOpen(true)

        // Psolicitud para obtener los datos de la cartilla con el ID cartilla_id
        getById(cartilla_id,'Cartilla','GET_CARTILLA',{})

    }

    const handleClose = () => {
        setOpen(false)
    }


    useEffect(() => {
        setForm({
            cartilla_titulo: state.getCartilla?.cartilla_titulo,
            cartilla_descripcion: state.getCartilla?.cartilla_descripcion,
            cartilla_file: state.getCartilla?.cartilla_file,
            cartilla_aula: state.getCartilla?.cartilla_aula,
            cartilla_materia: state.getCartilla?.cartilla_materia,
        })
    }, [state.getCartilla])

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
                <DialogTitle>Editar Cartilla</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Edite la información de la Cartilla
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="cartilla_titulo"
                        name="cartilla_titulo"
                        label="Titulo"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={form.cartilla_titulo}
                        onChange={handleChange}
                    />

                    <TextField
                        id="cartilla_descripcion"
                        name="cartilla_descripcion"
                        label="Descripción *"
                        multiline
                        rows={5}
                        variant="standard"
                        fullWidth
                        value={form.cartilla_descripcion}
                        onChange={handleChange}
                    />

                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="cartilla_file"
                        name="cartilla_file"
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
                                name="cartilla_aula"
                                value={form.cartilla_aula}
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
                                name="cartilla_materia"
                                value={form.cartilla_materia}
                                label="Materia"
                                onChange={handleChange}
                                sx={{ width: '100%' }}
                            >

                                {materias?.map((materia) => (
                                    <MenuItem value={materia?.materia_id} key={materia?.materia_id}>{materia?.materia_nombre}</MenuItem>
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
