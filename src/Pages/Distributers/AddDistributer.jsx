import React, { useState } from 'react';
import {
  Box,
  Button,
  CardContent,
  CardHeader,
  TextField,
  Typography,
  Paper,
  Snackbar,
  Alert,
  Stack,
} from '@mui/material';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddDistributer = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    password: '',
    distType: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/createdist', formData);
      setSnackbar({ open: true, message: res.data.message || 'Distributer created successfully!', severity: 'success' });
      setFormData({
        name: '',
        mobile: '',
        email: '',
        password: '',
        distType: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
      });
    } catch (err) {
      setSnackbar({ open: true, message: 'Failed to create distributer.', severity: 'error' });
      console.error(err);
    }
  };

  return (
    <Box
      minHeight="100vh"
      sx={{
        background: "linear-gradient(120deg, #f8fafc 0%, #cfd9df 100%)",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
      }}
    >
      <Paper
        elevation={8}
        sx={{
          maxWidth: 700,
          width: '100%',
          borderRadius: 4,
          p: { xs: 2, sm: 4 },
          boxShadow: '0 8px 32px rgba(0,0,0,0.09)',
          background: "rgba(255,255,255,0.95)",
        }}
      >
        <CardHeader
          avatar={<GroupAddIcon color="primary" sx={{ fontSize: 40 }} />}
          title={<Typography variant="h5" fontWeight="bold">Add New Distributer</Typography>}
          sx={{ textAlign: 'center', pb: 0 }}
        />
        <CardContent>
  <Box
    component="form"
    onSubmit={handleSubmit}
    sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}
  >
    <Stack direction="row" spacing={2}>
      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        fullWidth
        helperText="Full name"
        
      />
      <TextField
        label="Mobile"
        name="mobile"
        value={formData.mobile}
        onChange={handleChange}
        required
        fullWidth
        inputProps={{ maxLength: 10 }}
        helperText="10-digit number"
      />
    </Stack>

    <Stack direction="row" spacing={2}>
      <TextField
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
        fullWidth
        type="email"
        helperText="Email address"
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        required
        fullWidth
        helperText="Secure password"
      />
    </Stack>

    <TextField
      label="Distributer Type"
      name="distType"
      value={formData.distType}
      onChange={handleChange}
      fullWidth
      helperText="E.g. Retail, Wholesale"
    />

    <TextField
      label="Address"
      name="address"
      value={formData.address}
      onChange={handleChange}
      fullWidth
      helperText="Street address"
    />

    <Stack direction="row" spacing={2}>
      <TextField
        label="City"
        name="city"
        value={formData.city}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        label="State"
        name="state"
        value={formData.state}
        onChange={handleChange}
        fullWidth
      />
    </Stack>

    <TextField
      label="Pincode"
      name="pincode"
      value={formData.pincode}
      onChange={handleChange}
      type="number"
      fullWidth
      helperText="Area pincode"
    />

    <Button
      variant="contained"
      type="submit"
      size="large"
      sx={{
        mt: 2,
        fontWeight: 'bold',
        letterSpacing: 1,
        boxShadow: 2,
        py: 1.2,
        background: 'linear-gradient(90deg, #1976d2 40%, #64b5f6 100%)',
      }}
    >
      Create Distributer
    </Button>

    <Button
      variant="outlined"
      color="secondary"
      onClick={() => navigate('/dist/distlist')}
      sx={{ mt: 1 }}
    >
      View Distributer List
    </Button>
  </Box>
</CardContent>

      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddDistributer;
