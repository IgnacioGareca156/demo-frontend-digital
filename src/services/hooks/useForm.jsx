import React, { useContext, useEffect, useState } from 'react'
import { directus } from '../directus'
import { readItems } from '@directus/sdk'
import { GlobalContext } from '../global.context'
import { useNavigate } from 'react-router-dom'

const useForm = (validate, initialForm, callback) => {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [loadingForm, setLoadingForm] = useState(false)

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: name === 'profesor_admin' ? checked : value,
    }));
  };


  const handleBlur = (e) => {
    handleChange(e)
    // setErrors(validate(form))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate(form)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      setLoadingForm(true)
      try {
        await callback(form) //aqui hace la peticion
      } catch (error) {
        console.error('Error en la consulta', error)
      } finally {
        setLoadingForm(false)
      }
    }
  }

  useEffect(() => {
    setForm(initialForm)
  }, [])
  return {
    setForm,
    form,
    errors,
    loadingForm,
    handleBlur,
    handleChange,
    handleSubmit,
  }
}

export default useForm
