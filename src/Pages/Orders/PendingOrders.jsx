import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Chip,
  Box,
  Paper,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import dayjs from 'dayjs';
const statusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'pending': return 'warning';
    case 'completed': return 'success';
    case 'cancelled': return 'error';
    default: return 'info';
  }
};

const PendingOrders = () => {
  const [allorders, setAllOrders] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        let result = await axios.get("http://localhost:5000/api/fetchorder");
        setAllOrders(result.data);
      } catch (err) {
        setAllOrders([]);
        console.log(err);
      }
    };
    fetchOrders();
  }, []);

  return (
    <Box
      minHeight="100vh"
      sx={{
        background: "linear-gradient(120deg, #f8fafc 0%, #cfd9df 100%)",
        py: 4,
        px: { xs: 1, md: 4 },
      }}
    >
      <Typography variant="h4" fontWeight="bold" color="primary" align="center" mb={4}>
        Pending Orders
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {allorders.length === 0 ? (
          <Grid item xs={12}>
            <Paper
              elevation={3}
              sx={{
                p: 5,
                textAlign: 'center',
                color: 'text.secondary',
                borderRadius: 3,
                background: 'rgba(255,255,255,0.95)',
              }}
            >
              <LocalShippingIcon color="disabled" sx={{ fontSize: 48, mb: 2 }} />
              <Typography variant="h6">No orders found.</Typography>
            </Paper>
          </Grid>
        ) : (
          allorders.map((order) => (
            <Grid item xs={12} sm={6} md={4} key={order._id}>
              <Card
                elevation={6}
                sx={{
                  borderRadius: 4,
                  background: "rgba(255,255,255,0.98)",
                  boxShadow: '0 8px 32px rgba(0,0,0,0.09)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'scale(1.025)',
                    boxShadow: '0 12px 40px rgba(25, 118, 210, 0.13)',
                  },
                }}
              >
                <CardMedia
                  sx={{
                    height: 80,
                    background: 'linear-gradient(90deg, #1976d2 40%, #64b5f6 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <AccessTimeIcon sx={{ color: '#fff', fontSize: 48 }} />
                </CardMedia>
                <CardContent>
                  <Box display="flex" alignItems="center" mb={1}>
                    <Typography variant='h6' fontWeight="bold" sx={{ flexGrow: 1 }}>
                      Order Date:
                    </Typography>

                    <Typography variant='body1'>
                      {order.orderDate
                        ? dayjs(order.orderDate).format('DD/MM/YYYY, hh:mm A')
                        : 'N/A'}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" mb={1}>
                    <Typography variant='h6' fontWeight="bold" sx={{ flexGrow: 0.5 }}>
                      Status:
                    </Typography>
                    <Chip
                      label={order.orderStatus || "Unknown"}
                      color={statusColor(order.orderStatus)}
                      sx={{ fontWeight: 'bold', fontSize: 16 }}
                    />
                  </Box>
                  <Box display="flex" alignItems="center" mb={1}>
                    <CurrencyRupeeIcon color="success" sx={{ mr: 1 }} />
                    <Typography variant='h6' fontWeight="bold" sx={{ flexGrow: 0.5 }}>
                      Total Amount:
                    </Typography>
                    <Typography variant='body1' color="text.secondary">
                      ₹ {Number(order.orderTotalAmount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions sx={{ justifyContent: "center", pb: 2 }}>
                  <Button
                    color='primary'
                    variant='contained'
                    onClick={() => navigator("/order/details", { state: order })}
                    sx={{
                      fontWeight: 'bold',
                      borderRadius: 2,
                      px: 3,
                      background: 'linear-gradient(90deg, #1976d2 40%, #64b5f6 100%)',
                      boxShadow: 2,
                      ':hover': {
                        background: 'linear-gradient(90deg, #1565c0 40%, #1976d2 100%)',
                      },
                    }}
                  >
                    Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default PendingOrders;
