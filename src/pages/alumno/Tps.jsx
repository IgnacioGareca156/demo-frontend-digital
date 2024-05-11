import React, { useContext, useEffect, useState } from 'react'
import useFetch from './../../services/hooks/useFetch'
import TablaTps from '../../components/Tp/TablaTps'



const Tps = () => {
    return (
        <>

            <h1>Trabajos Prácticos</h1>
            <TablaTps/>
        </>
    )
}

export default Tps
