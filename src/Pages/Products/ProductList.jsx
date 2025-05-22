import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  CircularProgress,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';

const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProd, setSelectedProd] = useState(null);
  const [newprice, setNewprice] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/fetchproduct");
        const data = response.data?.data || response.data;
        if (!Array.isArray(data)) {
          console.error("Expected an array from API but got:", data);
          setProducts([]);
          return;
        }
        const dataWithSerial = data.map((item, index) => ({
          ...item,
          id: item._id,
          serial: index + 1,
        }));
        setProducts(dataWithSerial);
      } catch (error) {
        setProducts([]);
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const openUpdateDialog = (product) => {
    setSelectedProd(product);
    setNewprice(product.price);
    setOpenDialog(true);
  };

  const closeUpdateDialog = () => {
    setOpenDialog(false);
    setSelectedProd(null);
    setNewprice('');
  };

  const updateProdPrice = async () => {
    try {
      const result = await axios.put("http://localhost:5000/api/updateprice", {
        price: newprice,
        prodId: selectedProd._id,
      });

      console.log(result.data);

      // Update product in state
      setProducts((prev) =>
        prev.map((p) =>
          p._id === selectedProd._id ? { ...p, price: newprice } : p
        )
      );

      closeUpdateDialog();
      setSnackbarOpen(true); // show success message
    } catch (error) {
      console.log("Error updating price:", error);
    }
  };

  const handleSnackbarClose = (_, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  const columns = [
    { field: 'serial', headerName: 'S.No.', width: 90, headerAlign: 'center', align: 'center' },
    { field: 'title', headerName: 'Title', flex: 1, minWidth: 120 },
    { field: 'prodType', headerName: 'Product Type', flex: 1, minWidth: 120 },
    { field: 'category', headerName: 'Category', flex: 1, minWidth: 120 },
    { field: 'price', headerName: 'Price (₹)', flex: 1, minWidth: 100 },
    { field: 'weight', headerName: 'Weight', flex: 1, minWidth: 100 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 130,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Button
          variant="contained"
          size="small"
          color="secondary"
          startIcon={<EditIcon />}
          onClick={() => openUpdateDialog(params.row)}
        >
          Update
        </Button>
      ),
    },
  ];

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
          position: 'relative',
          background: "rgba(255,255,255,0.97)",
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4" fontWeight="bold" color="primary">
            Product List
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddCircleIcon />}
            size="large"
            onClick={() => navigate('/products/addprod')}
            sx={{
              fontWeight: 'bold',
              letterSpacing: 1,
              borderRadius: 3,
              boxShadow: 3,
              background: 'linear-gradient(90deg, #1976d2 40%, #64b5f6 100%)',
              ':hover': {
                background: 'linear-gradient(90deg, #1565c0 40%, #1976d2 100%)',
              },
            }}
          >
            Add New Product
          </Button>
        </Stack>

        <Box sx={{ height: '70vh', width: '100%' }}>
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
              <CircularProgress size={48} color="primary" />
            </Box>
          ) : (
            <DataGrid
              rows={products}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[5, 10, 20]}
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
                    No products found. Click "Add New Product" to get started!
                  </Box>
                ),
              }}
            />
          )}
        </Box>

        {/* Dialog for Updating Price */}
        <Dialog
          open={openDialog}
          onClose={closeUpdateDialog}
          PaperProps={{
            sx: {
              width: '500px',
              maxWidth: '90vw',
            },
          }}
        >
          <DialogTitle>Update Price</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="New Price (₹)"
              type="number"
              fullWidth
              value={newprice}
              onChange={(e) => setNewprice(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={closeUpdateDialog}>Cancel</Button>
            <Button variant="contained" onClick={updateProdPrice}>
              Update
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar Notification */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
            Price updated successfully!
          </Alert>
        </Snackbar>
      </Paper>
    </Box>
  );
};

export default ProductList;
