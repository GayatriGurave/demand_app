import { Box, Button, Typography, CircularProgress, Alert } from '@mui/material'; // Added CircularProgress and Alert
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DistributerList = () => {
  const navigate = useNavigate();
  const [distributers, setDistributers] = useState([]);
  const [loading, setLoading] = useState(true); // loading state
  const [error, setError] = useState(null); // error state

  useEffect(() => {
    const fetchDistributers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/fetchdist');
        console.log('Fetched Distributers:', response.data);

        const data = response.data?.data || response.data;

        if (!Array.isArray(data)) {
          console.error('Expected an array from API but got:', data);
          return;
        }

        // Add serial number as 'serial' field in the data
        const dataWithSerial = data.map((item, index) => ({
          ...item,
          id: item._id, // required field for DataGrid
          serial: index + 1, // Adding serial number starting from 1
        }));

        setDistributers(dataWithSerial);
      } catch (error) {
        setError('Failed to fetch distributers.');
        console.error('Error fetching distributers:', error);
      } finally {
        setLoading(false); // Set loading to false when done fetching
      }
    };

    fetchDistributers();
  }, []);

  const columns = [
    { field: 'serial', headerName: 'S.No.', width: 90 }, // Serial No.
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'mobile', headerName: 'Mobile', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'distType', headerName: 'Distributer Type', flex: 1 },
    { field: 'city', headerName: 'City', flex: 1 },
    { field: 'state', headerName: 'State', flex: 1 },
    { field: 'pincode', headerName: 'Pincode', flex: 1 },
  ];

  return (
    <div>
      <Button
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: 100,
          right: 150,
        }}
        onClick={() => navigate('/dist/addDist')}
        variant="contained"
        color="primary"
      >
        Add New Distributer
      </Button>

      <Box sx={{ height: '80vh', width: '100%', padding: 4 }}>
        <Typography variant="h5" gutterBottom>
          Distributer List
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <DataGrid
            rows={distributers}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5, 10, 20]}
            disableSelectionOnClick
            sx={{ position: 'relative', top: 50 }}
          />
        )}
      </Box>
    </div>
  );
};

export default DistributerList;
