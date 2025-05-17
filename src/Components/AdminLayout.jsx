import { Box } from '@mui/material'
import React from 'react'
import SideBar from './SideBar'
import MyRouter from './MyRouter'

const AdminLayout = () => {
  return (
    <Box sx={{display:"flex",flexDirection:"column",textAlign:'center'}}>
    <SideBar/>
    <MyRouter/>
    </Box>
  )
}

export default AdminLayout