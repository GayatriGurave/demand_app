import { Box, Button, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const navigate = useNavigate();
  const [feeStructures, setFeeStructures] = useState([]);

  useEffect(() => {
    const fetchFeeStructures = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/fetchproduct");
        console.log("Fetched Products:", response.data);

        const data = response.data?.data || response.data;

        if (!Array.isArray(data)) {
          console.error("Expected an array from API but got:", data);
          return;
        }

        // Add serial number as 'serial' field in the data
        const dataWithSerial = data.map((item, index) => ({
          ...item,
          id: item._id, // required field for DataGrid
          serial: index + 1, // Adding serial number starting from 1
        }));

        setFeeStructures(dataWithSerial);
      } catch (error) {
        console.error("Error fetching fee structures:", error);
      }
    };

    fetchFeeStructures();
  }, []);

  const columns = [
    { field: 'serial', headerName: 'S.No.', width: 90 }, // Serial No.
    { field: 'title', headerName: 'Title', flex: 1 },
    { field: 'prodType', headerName: 'Product Type', flex: 1 },
    { field: 'category', headerName: 'Category', flex: 1 },
    { field: 'price', headerName: 'Price (₹)', flex: 1 },
    { field: 'weight', headerName: 'Weight', flex: 1 },
  ];

  return (
    <div>
      <Button
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: 'center',
          position: 'absolute',
          top: 100,
          right: 150
        }}
        onClick={() => navigate('/products/addprod')}
        variant="contained"
        color="primary"
      >
        Add New Product
      </Button>

      <Box sx={{ height: '80vh', width: '100%', padding: 4 }}>
        <Typography variant="h5" gutterBottom>
          Product List
        </Typography>

        <DataGrid
          rows={feeStructures}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5, 10, 20]}
          disableSelectionOnClick
          sx={{ position: 'relative', top: 50 }}
        />
      </Box>
    </div>
  );
};

export default ProductList;
