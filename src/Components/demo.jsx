import { Box, Button, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/fetchproduct"); // Adjust if your API returns differently
        const data = res.data?.data || res.data;

        if (!Array.isArray(data)) {
          console.error("Expected array from API, got:", data);
          return;
        }

        const formatted = data.map((item) => ({
          ...item,
          id: item._id,
        }));

        setProducts(formatted);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const columns = [
    { field: 'title', headerName: 'Title', flex: 1 },
    { field: 'prodType', headerName: 'Product Type', flex: 1 },
    { field: 'category', headerName: 'Category', flex: 1 },
    { field: 'price', headerName: 'Price', flex: 1, type: 'number' },
    { field: 'weight', headerName: 'Weight', flex: 1 },
  ];

  return (
    <div>
      <Button
        sx={{ position: 'absolute', top: 100, right: 150 }}
        onClick={() => navigate('/products/addprod')}
        variant="contained"
        color="primary"
      >
        Add Product
      </Button>

      <Box sx={{ height: '80vh', width: '100%', padding: 4 }}>
        <Typography variant="h5" gutterBottom>
          Product List
        </Typography>

        <DataGrid
          rows={products}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5, 10, 20]}
          disableSelectionOnClick
          sx={{ mt: 4, backgroundColor: '#fff', borderRadius: 2 }}
        />
      </Box>
    </div>
  );
};

export default ProductList;
