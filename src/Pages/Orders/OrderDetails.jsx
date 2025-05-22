import React, { useState } from 'react';
import {
  Typography,
  Box,
  Paper,
  Grid,
  Divider,
  Chip,
  useTheme,
  Button,
  TextField,
  Snackbar,
  Alert,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useLocation } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import CategoryIcon from '@mui/icons-material/Category';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import axios from 'axios';

const OrderDetails = () => {
  const orderData = useLocation().state;
  const theme = useTheme();

  const initialRows = orderData?.orderItems?.map((ord, index) => ({
    _id: ord.prodId?._id || index,
    prodId: ord.prodId?._id || index,
    title: ord.prodId?.title || 'N/A',
    price: ord.prodId?.price || 0,
    demandedQty: ord.demandedQty || 0,
    exceptedQty: ord.exceptedQty || 0,
  })) || [];

  const [rows, setRows] = useState(initialRows);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleExceptedQtyChange = (id, value) => {
    setRows(prevRows =>
      prevRows.map(row =>
        row._id === id ? { ...row, exceptedQty: value } : row
      )
    );
  };

  const handleSave = async () => {
    try {
      const result = await axios.post("http://localhost:5000/api/updateorderacceptedqty", {
        orderItems: rows,
        orderId: orderData._id,
      });
      console.log("DATA", result.data);
      setSnackbarOpen(true); // Show snackbar
    } catch (error) {
      console.error("Save failed:", error);
    }
  };

  const handleSnackbarClose = (_, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  const columns = [
    {
      field: 'title',
      headerName: 'Product Name',
      flex: 1,
      renderCell: (params) => (
        <Typography color="primary" fontWeight={600}>
          {params.value}
        </Typography>
      )
    },
    {
      field: 'price',
      headerName: 'Price',
      type: 'number',
      width: 120,
      renderCell: (params) => (
        <Typography fontWeight={600}>
          ₹{params.value}
        </Typography>
      )
    },
    {
      field: 'demandedQty',
      headerName: 'Demanded Qty',
      type: 'number',
      width: 150,
      renderCell: (params) => (
        <Chip label={params.value} color="info" variant="outlined" />
      )
    },
    {
      field: 'exceptedQty',
      headerName: 'Expected Qty',
      type: 'number',
      width: 180,
      renderCell: (params) => (
        <TextField
          type="number"
          size="small"
          value={params.value}
          onChange={e => handleExceptedQtyChange(params.row._id, Number(e.target.value))}
          inputProps={{ min: 0 }}
        />
      )
    }
  ];

  const distributer = orderData?.distributerId || {};

  return (
    <Box sx={{ padding: 4 }}>
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: 4,
          boxShadow: '0 4px 24px 0 rgba(33,150,243,0.15)',
          background: '#fff',
          mb: 4,
        }}
      >
        <Box display="flex" alignItems="center" mb={2}>
          <Inventory2OutlinedIcon color="primary" sx={{ fontSize: 36, mr: 1 }} />
          <Typography variant="h4" fontWeight={700} color="primary.dark">
            Order Details
          </Typography>
        </Box>

        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium', mb: 1 }}>
          Distributor Information
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Box display="flex" alignItems="center">
              <PersonIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
              <Typography><strong>Name:</strong> {distributer.name || 'N/A'}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box display="flex" alignItems="center">
              <LocationCityIcon sx={{ mr: 1, color: theme.palette.secondary.main }} />
              <Typography><strong>City:</strong> {distributer.city || 'N/A'}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box display="flex" alignItems="center">
              <CategoryIcon sx={{ mr: 1, color: theme.palette.info.main }} />
              <Typography><strong>Type:</strong> {distributer.distType || 'N/A'}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box display="flex" alignItems="center">
              <PhoneAndroidIcon sx={{ mr: 1, color: theme.palette.success.main }} />
              <Typography><strong>Mobile:</strong> {distributer.mobile || 'N/A'}</Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium', mb: 1 }}>
          Products in Order
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            getRowId={(row) => row._id}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
          />
        </Box>
        <Box display="flex" justifyContent="flex-end" mt={3}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSave}
          >
            Save
          </Button>
        </Box>
      </Paper>

      {/* Snackbar for Save Success */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Demand updated successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default OrderDetails;
