// src/components/CartView.js
import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
} from '@mui/material';

const CartView = ({ selectedItems, handleClearCart }) => {
  return (
    <Box sx={{ p: 2, backgroundColor: '#fff', borderRadius: 2, boxShadow: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
        Giỏ hàng
      </Typography>
      {selectedItems.length > 0 ? (
        <>
          <List>
            {selectedItems.map((item, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`${item.name} ${item.size ? `(${item.size})` : ''}`}
                  secondary={`Số lượng: ${item.quantity} | Ghi chú: ${item.note || 'Không có'} | Giá: ${(item.price * item.quantity).toLocaleString()} VNĐ`}
                />
              </ListItem>
            ))}
          </List>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            Tổng cộng:{' '}
            {selectedItems
              .reduce((total, item) => total + item.price * item.quantity, 0)
              .toLocaleString()}{' '}
            VNĐ
          </Typography>
          <Button
            variant="contained"
            color="error"
            onClick={handleClearCart}
            sx={{ mt: 2 }}
          >
            Xóa giỏ hàng
          </Button>
        </>
      ) : (
        <Typography variant="body2">Giỏ hàng trống</Typography>
      )}
    </Box>
  );
};

export default CartView;