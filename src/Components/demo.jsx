import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  Box,
  useTheme,
  CircularProgress,
  Button,
  Divider,
  Grid,
} from "@mui/material";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import axios from "axios";

// Modern MetricCard component
const MetricCard = ({ title, value, bgColor, icon, highlight }) => (
  <Card
    sx={{
      minWidth: 250,
      boxShadow: highlight ? 12 : 6,
      borderRadius: 4,
      background: `linear-gradient(135deg, ${bgColor} 60%, #fff 100%)`,
      color: "#222",
      transition: "transform 0.3s, box-shadow 0.3s",
      position: "relative",
      overflow: "hidden",
      "&:hover": {
        transform: "scale(1.05)",
        boxShadow: 16,
      },
      "&:before": {
        content: '""',
        position: "absolute",
        top: -40,
        right: -40,
        width: 100,
        height: 100,
        bgcolor: bgColor,
        opacity: 0.13,
        borderRadius: "50%",
        zIndex: 0,
      },
    }}
  >
    <CardContent sx={{ position: "relative", zIndex: 1 }}>
      <Box display="flex" alignItems="center" gap={2} mb={1}>
        <Box
          sx={{
            bgcolor: "#fff",
            borderRadius: "50%",
            p: 1.5,
            boxShadow: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {React.cloneElement(icon, { fontSize: "large", sx: { color: bgColor, fontSize: 40 } })}
        </Box>
        <Typography variant="h6" fontWeight="bold" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        {highlight && (
          <Box
            sx={{
              bgcolor: "primary.main",
              color: "#fff",
              px: 1.5,
              py: 0.5,
              borderRadius: 2,
              fontSize: 12,
              fontWeight: "bold",
              ml: 1,
            }}
          >
            Top
          </Box>
        )}
      </Box>
      <Typography
        variant="h2"
        fontWeight="bold"
        sx={{
          letterSpacing: 1,
          color: "#222",
          textShadow: "0 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        {value}
      </Typography>
    </CardContent>
  </Card>
);

const Overview = () => {
  const theme = useTheme();
  const [counts, setCounts] = useState({
    Product: 0,
    Order: 0,
    Distributer: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCounts = async () => {
    setLoading(true);
    setError(null);
    try {
      const [productRes, orderRes, distributerRes] = await Promise.all([
        axios.get("http://localhost:5000/api/fetchproduct"),
        axios.get("http://localhost:5000/api/fetchorder"),
        axios.get("http://localhost:5000/api/fetchdist"),
      ]);
      setCounts({
        Product: Array.isArray(productRes.data) ? productRes.data.length : 0,
        Order: Array.isArray(orderRes.data) ? orderRes.data.length : 0,
        Distributer: Array.isArray(distributerRes.data) ? distributerRes.data.length : 0,
      });
    } catch (err) {
      setError("Failed to load dashboard data. Please try again.",err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  // Highlight the card with the highest value
  const highlightKey = Object.entries(counts).reduce(
    (max, curr) => (curr[1] > max[1] ? curr : max),
    ["Product", 0]
  )[0];

  return (
    <Box sx={{ p: { xs: 1, sm: 3 }, marginTop: "5%" }}>
      <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom align="center">
        Dashboard Overview
      </Typography>
      <Divider sx={{ mb: 2 }} />
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="40vh">
          <CircularProgress size={48} />
        </Box>
      ) : error ? (
        <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
          <Typography color="error" variant="h6" mb={2}>
            {error}
          </Typography>
          <Button variant="contained" color="primary" onClick={fetchCounts}>
            Retry
          </Button>
        </Box>
      ) : (
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={8} // 8*8=64px gap between cards for a modern, airy look
        >
          <Grid item xs={12} sm={6} md={4}>
            <MetricCard
              title="Products"
              value={counts.Product}
              bgColor={theme.palette.info.main}
              icon={<Inventory2Icon />}
              highlight={highlightKey === "Product"}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <MetricCard
              title="Orders"
              value={counts.Order}
              bgColor={theme.palette.warning.main}
              icon={<ShoppingCartIcon />}
              highlight={highlightKey === "Order"}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <MetricCard
              title="Distributers"
              value={counts.Distributer}
              bgColor={theme.palette.secondary.main}
              icon={<LocalShippingIcon />}
              highlight={highlightKey === "Distributer"}
            />
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Overview;
