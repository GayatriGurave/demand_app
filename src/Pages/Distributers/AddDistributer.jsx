import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // ✅ Import useNavigate

const AddDistributer = () => {
  const navigate = useNavigate(); // ✅ Initialize navigate

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/cretedist', formData);
      alert(res.data.message || 'Distributer created successfully!');
      console.log(res.data);
      navigate('/'); // ✅ Optionally navigate to list after success
    } catch (err) {
      alert('Failed to create distributer.');
      console.error(err);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f5f5f5">
      <Card sx={{ width: 500, p: 3, boxShadow: 6 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom align="center">
            Add New Distributer
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField label="Name" name="name" value={formData.name} onChange={handleChange} required fullWidth />
            <TextField label="Mobile" name="mobile" value={formData.mobile} onChange={handleChange} required fullWidth />
            <TextField label="Email" name="email" value={formData.email} onChange={handleChange} required fullWidth />
            <TextField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} required fullWidth />
            <TextField label="Distributer Type" name="distType" value={formData.distType} onChange={handleChange} fullWidth />
            <TextField label="Address" name="address" value={formData.address} onChange={handleChange} fullWidth />
            <TextField label="City" name="city" value={formData.city} onChange={handleChange} fullWidth />
            <TextField label="State" name="state" value={formData.state} onChange={handleChange} fullWidth />
            <TextField label="Pincode" name="pincode" value={formData.pincode} onChange={handleChange} type="number" fullWidth />

            <Button variant="contained" type="submit" size="large">
              Submit
            </Button>

            {/* ✅ Button to navigate to the list page */}
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate('/dist/distlist')} // Adjust path as needed
            >
              View Distributer List
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddDistributer;
