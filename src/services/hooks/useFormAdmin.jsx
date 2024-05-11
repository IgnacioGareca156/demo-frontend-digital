import React, { useContext, useState } from 'react'
import { directus } from '../directus'
import { readItems } from '@directus/sdk'
import { GlobalContext } from '../global.context'
import { useNavigate } from 'react-router-dom'

const useFormAdmin = (validate, initialForm) => {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const { dispatch } = useContext(GlobalContext)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({
      ...form,
      [name]: value,
    })
  }

  const handleBlur = (e) => {
    handleChange(e)
    // setErrors(validate(form))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate(form)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true)

      try {
        const profesores = await directus.request(readItems('Profesor'))
        const admin = profesores.find(
          (profesor) =>
            profesor.profesor_usuario === form.profesor_usuario &&
            profesor.profesor_password === form.profesor_password
        )

        if (admin) {
          dispatch({ type: 'LOGIN_ADMIN', payload: admin })
          navigate('/panel')
        } else {
          // Handle case when admin is not found
          setErrors({
            profesor: 'No existe un profesor con este usuario y contraseña'
          })
        }
      } catch (error) {
        // Handle error in fetching data from directus
        console.error('Error en la consulta', error)
      } finally {
        setLoading(false)
      }
    }
  }

  return {
    form,
    errors,
    loading,
    handleBlur,
    handleChange,
    handleSubmit,
  }
}

export default useFormAdmin
