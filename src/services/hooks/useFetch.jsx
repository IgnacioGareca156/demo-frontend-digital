import React, { useCallback, useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../global.context';
import { directus } from './../directus'
import { readItems, createItem, updateItem, deleteItem, readItem } from '@directus/sdk'

const useFetch = () => {
  const { state, dispatch } = useContext(GlobalContext)
  const [loading, setLoading] = useState(false)

  //POST
  async function post(form,coleccion,type,queryparams={}){
    const data = await directus.request(createItem(coleccion,form))
    dispatch({type: type, payload: data}) 
  }
  //GET (todos los items)
  async function get(coleccion,type,queryparams={}){
    const data = await directus.request(readItems(coleccion,queryparams))
    dispatch({type: type, payload: data}) 
  }
  
  //GET_BY_ID
  async function getById(id,coleccion,type,queryparams={}){
    const data = await directus.request(readItem(coleccion,id))
    dispatch({type: type, payload: data}) 
  }

  //UPDATE
  async function update(id,form,coleccion,type,queryparams={}){
    const data = await directus.request(updateItem(coleccion,id,form))
    dispatch({type: type, payload: data}) 
  }
  
  //DELETE
  async function eliminar(id,coleccion,type,queryparams={}){
    const data = await directus.request(deleteItem(coleccion,id))
    dispatch({type: type, payload: id})
  }


  return { loading, state, get,post,getById,update,eliminar }
};

export default useFetch
