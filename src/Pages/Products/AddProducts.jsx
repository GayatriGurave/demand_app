import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const AddProducts = () => {
  const [selectImage, setSelectImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [category, setCategory] = useState(''); // controlled category field
  const navigate = useNavigate(); // Initialize navigate function for routing

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const reqData = Object.fromEntries(formData.entries());
    reqData.category = category; // add category manually

    try {
      const result = await axios.post(
        'http://localhost:5000/api/createproduct',
        {
          ...reqData,
          prodimage: selectImage,
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log(result.data);
      alert(result.data.message);
    } catch (error) {
      alert('Failed to create product.');
      console.error(error);
    }
  };

  const handleViewProductList = () => {
    navigate('/products/prodlist'); // Navigate to the product list page
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
    >
      <Card sx={{ width: 500, p: 3, boxShadow: 6 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom align="center">
            Add New Product
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <TextField label="Title" name="title" required fullWidth />
            <TextField label="Product Type" name="prodType" required fullWidth />

            <TextField
              type="file"
              name="prodimage"
              onChange={handleImageChange}
              fullWidth
            />

            {preview && (
              <Box
                component="img"
                src={preview}
                alt="Preview"
                sx={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: 1 }}
              />
            )}

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
            />

            <TextField label="Weight" name="weight" required fullWidth />

            <Button variant="contained" type="submit" size="large">
              Create Product
            </Button>

            {/* Add a button to navigate to Product List */}
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleViewProductList}
              sx={{ mt: 2 }}
            >
              View Product List
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddProducts;
