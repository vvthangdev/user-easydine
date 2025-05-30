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

const CartView = ({ selectedItems, handleClearCart, showItemDetails, createOrder }) => {
  return (
    <Box sx={{ p: 2, backgroundColor: '#fff', borderRadius: 2, boxShadow: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
        Giỏ hàng
      </Typography>
      {selectedItems.length > 0 ? (
        <>
          <List>
            {selectedItems.map((item, index) => (
              <ListItem
                key={index}
                button
                onClick={() => showItemDetails(item)}
                sx={{ cursor: 'pointer' }}
              >
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
          <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              color="error"
              onClick={handleClearCart}
            >
              Xóa giỏ hàng
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={createOrder}
              disabled={selectedItems.length === 0}
            >
              Đặt hàng
            </Button>
          </Box>
        </>
      ) : (
        <Typography variant="body2">Giỏ hàng trống</Typography>
      )}
    </Box>
  );
};

export default CartView;