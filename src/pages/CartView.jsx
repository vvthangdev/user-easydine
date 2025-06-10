"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { useAppleStyles } from "../theme/theme-hooks.js";
import CartViewModel from "./CartViewModel";

const CartView = ({ selectedItems, onItemUpdate, onShowDetails, orderId }) => {
  const styles = useAppleStyles();
  const { handleClearCart, createOrder, updateItemQuantity, removeItem } =
    CartViewModel(selectedItems, onItemUpdate, orderId);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [itemToRemoveIndex, setItemToRemoveIndex] = useState(null);

  const handleQuantityChange = (index, newQuantity) => {
    if (newQuantity === 0) {
      setItemToRemoveIndex(index);
      setOpenConfirmDialog(true);
    } else {
      updateItemQuantity(index, newQuantity);
    }
  };

  const handleConfirmRemove = () => {
    if (itemToRemoveIndex !== null) {
      removeItem(itemToRemoveIndex);
    }
    setOpenConfirmDialog(false);
    setItemToRemoveIndex(null);
  };

  const handleCancelRemove = () => {
    setOpenConfirmDialog(false);
    setItemToRemoveIndex(null);
  };

  return (
    <Box
      sx={{
        p: styles.spacing(4),
        ...styles.card("main"),
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: styles.typography.fontWeight.bold,
          mb: styles.spacing(4),
          color: styles.colors.text.primary,
        }}
      >
        Giỏ hàng
      </Typography>
      {selectedItems.length > 0 ? (
        <>
          <List sx={{ mb: styles.spacing(4) }}>
            {selectedItems.map((item, index) => (
              <ListItem
                key={item._id || index}
                sx={{
                  borderRadius: styles.rounded("sm"),
                  mb: styles.spacing(2),
                  "&:hover": {
                    backgroundColor: styles.colors.background.light,
                  },
                }}
                onClick={() => onShowDetails(item, index)}
              >
                <Box sx={{ flex: 1, display: "flex", alignItems: "center" }}>
                  <ListItemText
                    primary={
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: styles.typography.fontWeight.semibold,
                          fontSize: styles.typography.fontSize.lg,
                        }}
                      >
                        {item.name} {item.size ? `(${item.size})` : ""}
                      </Typography>
                    }
                    secondary={
                      <Typography
                        variant="body2"
                        sx={{
                          color: styles.colors.text.secondary,
                          mt: styles.spacing(1),
                        }}
                      >
                        Ghi chú: {item.note || "Không có"} | Giá:{" "}
                        {(item.price * item.quantity).toLocaleString()} VNĐ
                      </Typography>
                    }
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: styles.spacing(2),
                  }}
                >
                  <IconButton
                    size="small"
                    onClick={() => handleQuantityChange(index, item.quantity - 1)}
                    disabled={item.quantity <= 0}
                    sx={{ color: styles.colors.primary.main }}
                  >
                    <Remove fontSize="inherit" />
                  </IconButton>
                  <TextField
                    size="small"
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(index, parseInt(e.target.value) || 0)
                    }
                    inputProps={{
                      min: 0,
                      style: { textAlign: "center" },
                    }}
                    sx={{
                      width: 60,
                      ...styles.input("default"),
                    }}
                  />
                  <IconButton
                    size="small"
                    onClick={() => handleQuantityChange(index, item.quantity + 1)}
                    sx={{ color: styles.colors.primary.main }}
                  >
                    <Add fontSize="inherit" />
                  </IconButton>
                </Box>
              </ListItem>
            ))}
          </List>
          <Divider sx={{ my: styles.spacing(4) }} />
          <Typography
            variant="body1"
            sx={{
              fontWeight: styles.typography.fontWeight.bold,
              color: styles.colors.text.primary,
              mb: styles.spacing(4),
            }}
          >
            Tổng cộng:{" "}
            {selectedItems
              .reduce((total, item) => total + item.price * item.quantity, 0)
              .toLocaleString()}{" "}
            VNĐ
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: styles.spacing(2),
            }}
          >
            <Button
              sx={styles.button("outline")}
              onClick={handleClearCart}
              disabled={selectedItems.length === 0}
            >
              Xóa giỏ hàng
            </Button>
            <Button
              sx={styles.button("primary")}
              onClick={createOrder}
              disabled={selectedItems.length === 0}
            >
              Đặt hàng
            </Button>
          </Box>
        </>
      ) : (
        <Typography
          variant="body2"
          sx={{
            color: styles.colors.text.secondary,
            textAlign: "center",
            mt: styles.spacing(4),
          }}
        >
          Giỏ hàng trống
        </Typography>
      )}

      {/* Dialog xác nhận xóa món ăn */}
      <Dialog
        open={openConfirmDialog}
        onClose={handleCancelRemove}
        PaperProps={{
          sx: {
            borderRadius: styles.rounded("modal"),
            boxShadow: styles.shadow("2xl"),
            background: styles.colors.background.paper,
          },
        }}
      >
        <DialogTitle
          sx={{
            background: styles.gradients.primary,
            color: styles.colors.white,
            fontWeight: styles.typography.fontWeight.semibold,
          }}
        >
          Xác nhận xóa món ăn
        </DialogTitle>
        <DialogContent sx={{ mt: styles.spacing(2) }}>
          <Typography
            variant="body1"
            sx={{
              fontSize: styles.typography.fontSize.base,
              color: styles.colors.text.primary,
            }}
          >
            Bạn có chắc chắn muốn xóa món ăn này khỏi giỏ hàng?
          </Typography>
        </DialogContent>
        <DialogActions
          sx={{ p: styles.spacing(4), justifyContent: "flex-end" }}
        >
          <Button sx={styles.button("outline")} onClick={handleCancelRemove}>
            Hủy
          </Button>
          <Button sx={styles.button("primary")} onClick={handleConfirmRemove}>
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CartView;