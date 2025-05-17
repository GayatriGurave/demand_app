import { AppBar, Box, Button, Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import React, { useState } from 'react'
import ListIcon from '@mui/icons-material/List';

const AppDrawer = () => {
    const [isDrawerOpen , setisDrawerOpen] = useState(false)

  

    let handleDrawerOpen = () =>{
        setisDrawerOpen(true)
    }

    let handleDrawerClose = () =>{
        setisDrawerOpen(false)
    }
  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              onClick={() => { handleDrawerOpen() }}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <ListIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1,  textAlign:'center',color:'yellow'}}>
              My Dairy Shop
            </Typography>
            
          </Toolbar>
        </AppBar>
      </Box>
    </>
  )
}

export default AppDrawer