import React from 'react';
import {
  Typography,
  Box,
  Paper,
  Grid,
  Divider,
  useTheme,
  Chip,
  Stack,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useLocation } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import CategoryIcon from '@mui/icons-material/Category';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const OrderDetails = () => {
  const orderData = useLocation().state;
  const theme = useTheme();

  const columns = [
    { field: 'name', headerName: 'Product Name', flex: 1 },
    { field: 'price', headerName: 'Price', type: 'number', width: 120 },
    { field: 'demandedQty', headerName: 'Demanded Qty', type: 'number', width: 150 },
    { field: 'exceptedQty', headerName: 'Expected Qty', type: 'number', width: 150 }
  ];

  const rows = orderData?.orderItems?.map((ord, index) => ({
    id: ord.prodId?._id || index,
    name: ord.prodId?.title || 'N/A',
    price: ord.prodId?.price || 0,
    demandedQty: ord.demandedQty || 0,
    exceptedQty: ord.exceptedQty || 0
  })) || [];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: "linear-gradient(120deg, #f8fafc 0%, #cfd9df 100%)",
        py: 4,
        px: { xs: 1, md: 4 }
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{ fontWeight: 'bold', color: theme.palette.primary.main, mb: 4 }}
      >
        Order Details
      </Typography>

      <Paper
        elevation={8}
        sx={{
          p: { xs: 2, sm: 4 },
          mb: 4,
          borderRadius: 4,
          boxShadow: '0 8px 32px rgba(0,0,0,0.09)',
          background: "rgba(255,255,255,0.97)",
        }}
      >
        <Typography variant="h6" gutterBottom fontWeight="bold" color="primary">
          Distributor Information
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={3}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <PersonIcon color="primary" />
              <Typography>
                <strong>Name:</strong> {orderData.distributerId.name}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <LocationCityIcon color="secondary" />
              <Typography>
                <strong>City:</strong> {orderData.distributerId.city}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <CategoryIcon color="info" />
              <Typography>
                <strong>Type:</strong> {orderData.distributerId.distType}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <LocalPhoneIcon color="success" />
              <Typography>
                <strong>Mobile:</strong> {orderData.distributerId.mobile}
              </Typography>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <AccessTimeIcon color="action" />
              <Typography>
                <strong>Order Date:</strong> {orderData.orderDate ? new Date(orderData.orderDate).toLocaleString() : 'N/A'}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Chip
                label={orderData.orderStatus || "Unknown"}
                color={
                  orderData.orderStatus?.toLowerCase() === "pending"
                    ? "warning"
                    : orderData.orderStatus?.toLowerCase() === "completed"
                    ? "success"
                    : orderData.orderStatus?.toLowerCase() === "cancelled"
                    ? "error"
                    : "info"
                }
                sx={{ fontWeight: 'bold', fontSize: 16 }}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <MonetizationOnIcon color="success" />
              <Chip
                label={`₹ ${Number(orderData.orderTotalAmount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`}
                color="success"
                sx={{ fontWeight: 'bold', fontSize: 16 }}
              />
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      <Paper
        elevation={8}
        sx={{
          p: { xs: 2, sm: 4 },
          borderRadius: 4,
          boxShadow: '0 8px 32px rgba(0,0,0,0.09)',
          background: "rgba(255,255,255,0.97)",
        }}
      >
        <Typography variant="h6" gutterBottom fontWeight="bold" color="primary">
          Products in Order
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            sx={{
              borderRadius: 2,
              fontSize: 16,
              background: "#fafbfc",
              boxShadow: 2,
              '& .MuiDataGrid-row:nth-of-type(even)': {
                backgroundColor: '#f4f8fb',
              },
              '& .MuiDataGrid-row:hover': {
                backgroundColor: '#e3f2fd',
              },
              '& .MuiDataGrid-columnHeaders': {
                background: '#e3f2fd',
                fontWeight: 'bold',
                fontSize: 17,
                letterSpacing: 1,
              },
              '& .MuiDataGrid-cell': {
                py: 1,
              },
              '& .MuiDataGrid-footerContainer': {
                background: '#f5f5f5',
              },
            }}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default OrderDetails;
