// src/components/Header.js
import React from 'react';
import { Box, Typography, IconButton, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchComponent from './Search';

const Header = ({ tableId, searchTerm, handleSearch, selectedItems, onCartClick }) => {
  const totalItems = selectedItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: { xs: 200, sm: 250 }, // Để tránh chồng lấn với sidebar
        right: 0,
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        zIndex: 1000,
        p: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
        Bàn {tableId || 'Không xác định'}
      </Typography>

      <Box sx={{ maxWidth: 400, flexGrow: 1, mx: 2 }}>
        <SearchComponent searchTerm={searchTerm} handleSearch={handleSearch} />
      </Box>

      <IconButton onClick={onCartClick} color="primary">
        <Badge badgeContent={totalItems} color="error">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    </Box>
  );
};

export default Header;