import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Paper,
  Snackbar,
  Alert,
  IconButton,
} from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProducts = () => {
  const [selectImage, setSelectImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [category, setCategory] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', e.target.title.value);
    formData.append('prodType', e.target.prodType.value);
    formData.append('category', category);
    formData.append('price', e.target.price.value);
    formData.append('weight', e.target.weight.value);
    if (selectImage) formData.append('prodimage', selectImage);

    try {
      const result = await axios.post(
        'http://localhost:5000/api/createproduct',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setSnackbar({ open: true, message: result.data.message || "Product created!", severity: 'success' });
      // Optionally reset form
      setSelectImage(null);
      setPreview(null);
      setCategory('');
      e.target.reset();
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to create product.', severity: 'error' });
      console.error(error);
    }
  };

  const handleViewProductList = () => {
    navigate('/products/prodlist');
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
      <Paper elevation={8} sx={{
        maxWidth: 480,
        width: '100%',
        borderRadius: 4,
        p: { xs: 2, sm: 4 },
        boxShadow: '0 8px 32px rgba(0,0,0,0.09)',
        background: "rgba(255,255,255,0.95)",
      }}>
        <CardHeader
          avatar={<Inventory2Icon color="primary" sx={{ fontSize: 40 }} />}
          title={<Typography variant="h5" fontWeight="bold">Add New Product</Typography>}
          sx={{ textAlign: 'center', pb: 0 }}
        />
        <CardContent>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}
          >
            <TextField
              label="Title"
              name="title"
              required
              fullWidth
              variant="outlined"
              helperText="Enter the product name"
            />
            <TextField
              label="Product Type"
              name="prodType"
              required
              fullWidth
              variant="outlined"
              helperText="E.g. Dairy, Bakery, etc."
            />

            <Box
              sx={{
                border: '2px dashed #90caf9',
                borderRadius: 2,
                p: 2,
                textAlign: 'center',
                position: 'relative',
                background: preview ? "#f0f7ff" : "#fafbfc",
                cursor: 'pointer',
                transition: 'border-color 0.2s',
                '&:hover': { borderColor: '#1976d2' },
              }}
              component="label"
            >
              <input
                type="file"
                name="prodimage"
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />
              {preview ? (
                <Box
                  component="img"
                  src={preview}
                  alt="Preview"
                  sx={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: 2, mb: 1 }}
                />
              ) : (
                <Box>
                  <AddPhotoAlternateIcon color="primary" sx={{ fontSize: 48, mb: 1 }} />
                  <Typography color="text.secondary">Click to upload product image</Typography>
                </Box>
              )}
            </Box>

            <FormControl required fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                label="Category"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <MenuItem value="Cow Milk">Cow Milk</MenuItem>
                <MenuItem value="Buffalo Milk">Buffalo Milk</MenuItem>
                <MenuItem value="Butter Milk">Butter Milk</MenuItem>
                <MenuItem value="ShriKhand">ShriKhand</MenuItem>
                <MenuItem value="Ghee">Ghee</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Price"
              name="price"
              required
              type="number"
              fullWidth
              variant="outlined"
              inputProps={{ min: 0 }}
              helperText="Set the price in INR"
            />

            <TextField
              label="Weight"
              name="weight"
              required
              fullWidth
              variant="outlined"
              helperText="E.g. 500g, 1L, etc."
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
              Create Product
            </Button>

            <Button
              variant="outlined"
              color="secondary"
              onClick={handleViewProductList}
              sx={{ mt: 1 }}
            >
              View Product List
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

export default AddProducts;
