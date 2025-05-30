// src/components/Sidebar.js
import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from '@mui/material';

const Sidebar = ({ categories, filterCategory, handleFilterByCategory }) => {
  return (
    <Box
      sx={{
        width: { xs: 200, sm: 250 },
        backgroundColor: '#fff',
        boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        overflowY: 'auto',
        p: 2,
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, pl: 1 }}>
        Danh mục
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            selected={filterCategory === 'all'}
            onClick={() => handleFilterByCategory('all')}
            sx={{
              borderRadius: 1,
              py: 1.5,
              '&.Mui-selected': {
                backgroundColor: '#1976d2',
                color: '#fff',
                '&:hover': { backgroundColor: '#1565c0' },
              },
              '&:hover': { backgroundColor: '#e3f2fd' },
            }}
          >
            <ListItemText primary="Tất cả" />
          </ListItemButton>
        </ListItem>
        {categories.map((category) => (
          <ListItem key={category._id} disablePadding>
            <ListItemButton
              selected={filterCategory === category._id}
              onClick={() => handleFilterByCategory(category._id)}
              sx={{
                borderRadius: 1,
                py: 1.5,
                '&.Mui-selected': {
                  backgroundColor: '#1976d2',
                  color: '#fff',
                  '&:hover': { backgroundColor: '#1565c0' },
                },
                '&:hover': { backgroundColor: '#e3f2fd' },
              }}
            >
              <ListItemText primary={category.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;