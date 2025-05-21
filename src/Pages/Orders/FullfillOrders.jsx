import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  CircularProgress,
  Chip,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const statusColor = (status) => {
  switch ((status || '').toLowerCase()) {
    case 'pending': return 'warning';
    case 'completed': return 'success';
    case 'cancelled': return 'error';
    default: return 'info';
  }
};

const FullfillOrders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/fetchorder');
        setAllOrders(response.data);
      } catch (error) {
        setAllOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const columns = [
    {
      field: 'orderDate',
      headerName: 'Order Date',
      flex: 1,
      minWidth: 160,
      renderCell: (params) => {
        const date = params.row?.orderDate;
        return <span>{date ? new Date(date).toLocaleString() : 'N/A'}</span>;
      }
    },
    {
      field: 'orderStatus',
      headerName: 'Status',
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <Chip
          label={params.value || "Unknown"}
          color={statusColor(params.value)}
          sx={{ fontWeight: 'bold', fontSize: 15 }}
        />
      )
    },
    {
      field: 'orderTotalAmount',
      headerName: 'Total Amount',
      flex: 1,
      minWidth: 140,
      type: 'number',
      renderCell: (params) => (
        <Typography color="success.main" fontWeight="bold">
          ₹ {Number(params.value).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
        </Typography>
      )
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      minWidth: 120,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/order/details", { state: params.row })}
          sx={{
            fontWeight: 'bold',
            borderRadius: 2,
            px: 2,
            background: 'linear-gradient(90deg, #1976d2 40%, #64b5f6 100%)',
            boxShadow: 2,
            ':hover': {
              background: 'linear-gradient(90deg, #1565c0 40%, #1976d2 100%)',
            },
          }}
        >
          Details
        </Button>
      )
    }
  ];

  const rows = allOrders.map((order, index) => ({
    id: order._id || index,
    ...order
  }));

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'linear-gradient(120deg, #f8fafc 0%, #cfd9df 100%)',
        py: 6,
        px: { xs: 1, md: 4 },
      }}
    >
      <Paper
        elevation={8}
        sx={{
          maxWidth: 1100,
          mx: 'auto',
          p: { xs: 2, sm: 4 },
          borderRadius: 4,
          boxShadow: '0 8px 32px rgba(0,0,0,0.09)',
          background: "rgba(255,255,255,0.97)",
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          color="primary"
          align="center"
          mb={4}
        >
          Orders List
        </Typography>
        <Box sx={{ height: 500, width: '100%' }}>
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
              <CircularProgress size={48} color="primary" />
            </Box>
          ) : (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5, 10]}
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
              components={{
                NoRowsOverlay: () => (
                  <Box sx={{ p: 3, textAlign: 'center', color: 'text.secondary' }}>
                    No orders found.
                  </Box>
                ),
              }}
            />
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default FullfillOrders;
