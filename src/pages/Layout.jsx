import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import { Box } from '@mui/material'

const Layout = () => {
  return (
    <Box>

        <Header></Header>
        <Box component="main" sx={{ flexGrow: 1, pt:5, textAlign: 'justify', px:{xs:1,md:6}}}>
          <Outlet/>
        </Box>
    </Box>
    
  )
}

export default Layout
