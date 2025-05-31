// src/components/Header.js
import React, { useState, useEffect } from 'react';
import { Box, Typography, InputBase, IconButton, Badge } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { styled, alpha } from '@mui/material/styles';
import { toast } from 'react-toastify';
import { tableAPI } from '../services/apis/Table'; // Import tableAPI

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Header = ({ tableId, searchTerm, handleSearch, selectedItems, onCartClick }) => {
  const [tableInfo, setTableInfo] = useState(null);

  useEffect(() => {
    const fetchTableInfo = async () => {
      if (!tableId) {
        toast.error('Không tìm thấy ID bàn');
        setTableInfo(null);
        return;
      }

      try {
        const response = await tableAPI.getTableById({ table_id: tableId });
        console.log('Table info response:', response); // Debugging
        setTableInfo(response); // Lưu thông tin bàn
      } catch (error) {
        console.error('Error fetching table info:', error);
        setTableInfo(null);
        toast.error(error.message || 'Không thể lấy thông tin bàn');
      }
    };

    fetchTableInfo();
  }, [tableId]);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: { xs: '200px', sm: '250px' },
        right: 0,
        zIndex: 1000,
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        p: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {tableInfo ? (
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Bàn {tableInfo.table_number} ({tableInfo.area}, Sức chứa: {tableInfo.capacity})
          </Typography>
        ) : (
          <Typography variant="h6" color="error">
            Không tìm thấy thông tin bàn
          </Typography>
        )}
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Tìm món ăn..."
            inputProps={{ 'aria-label': 'search' }}
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </Search>

        <IconButton color="inherit" onClick={onCartClick}>
          <Badge badgeContent={selectedItems.length} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Box>
    </Box>
  );
};

export default Header;