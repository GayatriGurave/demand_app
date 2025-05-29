import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  Toolbar,
  Typography
} from '@mui/material';
import React, { useState } from 'react';
import { SimpleTreeView, TreeItem } from '@mui/x-tree-view';
import { Link } from 'react-router-dom';

// Icons
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PeopleIcon from '@mui/icons-material/People';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import EmojiNatureIcon from '@mui/icons-material/EmojiNature'; 
const drawerWidth = 260;

const SideBar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerOpen = () => setIsDrawerOpen(true);
  const handleDrawerClose = () => setIsDrawerOpen(false);


  const renderLabel = (text, IconComp) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <IconComp sx={{ fontSize: 20 }} />
      <Typography sx={{ fontSize: 16, fontWeight: 600 }}>{text}</Typography>
    </Box>
  );

  return (
    <>
    
      <AppBar
        position="sticky"
        sx={{
          background: 'linear-gradient(to right, #f5a623, #f3c745)',
          boxShadow: 4,
          height: '80px',
          padding: '0 20px',
          borderRadius: '0 0 10px 10px',
          zIndex: (theme) => theme.zIndex.drawer - 1, 
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <IconButton
            onClick={handleDrawerOpen}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, justifyContent: 'center' }}>
      <EmojiNatureIcon sx={{ color: 'white', fontSize: 36, mr: 1 }} />
      <Typography
        variant="h4"
        sx={{
          color: 'white',
          fontWeight: 'bold',
          letterSpacing: 2,
          fontFamily: "'Quicksand', sans-serif",
          textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
        }}
      >
        AmulyaDairy
      </Typography>
    </Box>
        </Toolbar>
      </AppBar>

     
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={handleDrawerClose}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
         
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#f0f0f0',
            paddingTop: 2,
            borderRadius: '0 10px 10px 0',
            zIndex: (theme) => theme.zIndex.appBar + 1,
          },
        }}
      >
        <List>
          <SimpleTreeView>
            <TreeItem itemId="1" label={renderLabel('Dashboard', DashboardIcon)}>
              <TreeItem
                itemId="2"
                label={<Link to="/dash/overview">OverView</Link>}
                onClick={handleDrawerClose}
              />
            </TreeItem>

            <TreeItem itemId="3" label={renderLabel('Products', ListAltIcon)}>
              <TreeItem
                itemId="4"
                label={<Link to="/products/addprod">Add Product</Link>}
                onClick={handleDrawerClose}
              />
              <TreeItem
                itemId="5"
                label={<Link to="/products/prodlist">Product List</Link>}
                onClick={handleDrawerClose}
              />
            </TreeItem>

            <TreeItem itemId="6" label={renderLabel('Distributers', PeopleIcon)}>
              <TreeItem
                itemId="7"
                label={<Link to="/dist/addDist">Add Distributer</Link>}
                onClick={handleDrawerClose}
              />
              <TreeItem
                itemId="8"
                label={<Link to="/dist/distlist">Distributer List</Link>}
                onClick={handleDrawerClose}
              />
            </TreeItem>

            <TreeItem itemId="9" label={renderLabel('Orders', LocalMallIcon)}>
              <TreeItem
                itemId="10"
                label={<Link to="/orders/pendord">Pending Orders</Link>}
                onClick={handleDrawerClose}
              />
              <TreeItem
                itemId="11"
                label={<Link to="/orders/fullfillord">FullFill Orders</Link>}
                onClick={handleDrawerClose}
              />
            </TreeItem>
          </SimpleTreeView>
        </List>
      </Drawer>

     
      <Box sx={{ pt: '90px' }} />
    </>
  );
};

export default SideBar;
