import React, { useContext, useEffect, useState } from 'react'
import TablaTareas from '../../components/Tarea/TablaTareas'
import NuevaTarea from '../../components/Tarea/NuevaTarea'


const tarea = () => {
    return (
        <>
            <h1>Tareas</h1>
            <TablaTareas/>
        </>
    )
}

export default tarea
