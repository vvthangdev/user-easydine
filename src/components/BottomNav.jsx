// src/components/BottomNav.js
import React from 'react';
import { Box, Typography } from '@mui/material';

const BottomNav = ({ selectedItems, onCartClick }) => {
  const totalItems = selectedItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = selectedItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <Box
      onClick={onCartClick}
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        boxShadow: '0 -2px 4px rgba(0,0,0,0.1)',
        zIndex: 1000,
        p: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: '#f5f5f5',
        },
      }}
    >
      <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#333' }}>
        Giỏ hàng: {totalItems} món
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#d32f2f' }}>
        Tổng: {totalPrice.toLocaleString()} VNĐ
      </Typography>
    </Box>
  );
};

export default BottomNav;