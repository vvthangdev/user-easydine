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
  const { createOrder, updateItemQuantity, removeItem } = CartViewModel(
    selectedItems,
    onItemUpdate,
    orderId
  );
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [itemToRemoveIndex, setItemToRemoveIndex] = useState(null);

  const handleQuantityChange = (index, newQuantity, isButtonClick = false) => {
  if (newQuantity === 0 && isButtonClick) {
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
        p: styles.spacing(2), // Padding 8px cho mobile
        ...styles.card("main"),
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: styles.typography.fontWeight.bold,
          mb: styles.spacing(2), // Margin-bottom 8px
          color: styles.colors.text.primary,
          fontSize: {
            xs: styles.typography.fontSize.base, // 16px trên mobile
            sm: styles.typography.fontSize.lg, // 18px trên sm
          },
        }}
      >
        Giỏ hàng
      </Typography>
      {selectedItems.length > 0 ? (
        <>
          <List sx={{ mb: styles.spacing(2) }}>
            {" "}
            {/* Margin-bottom 8px */}
            {selectedItems.map((item, index) => (
              <ListItem
                key={item._id || index}
                sx={{
                  borderRadius: styles.rounded("sm"),
                  mb: styles.spacing(1), // Margin-bottom 4px
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
                          fontSize: {
                            xs: styles.typography.fontSize.sm, // 14px trên mobile
                            sm: styles.typography.fontSize.base, // 16px trên sm
                          },
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
                          mt: styles.spacing(0.5), // Margin-top 2px
                          fontSize: {
                            xs: styles.typography.fontSize.xs, // 12px trên mobile
                            sm: styles.typography.fontSize.sm, // 14px trên sm
                          },
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
    size="medium"
    onClick={(e) => {
      e.stopPropagation();
      handleQuantityChange(index, item.quantity - 1, true);
    }}
    disabled={item.quantity <= 0}
    sx={{
      color: styles.colors.primary.main,
      fontSize: {
        xs: "1.5rem",
        sm: "1.75rem",
      },
    }}
  >
    <Remove fontSize="inherit" />
  </IconButton>
  <TextField
    type="number"
    value={item.quantity}
    onClick={(e) => e.stopPropagation()}
    onFocus={(e) => e.target.select()} // Bôi đen khi focus
    onChange={(e) =>
      handleQuantityChange(index, parseInt(e.target.value) || 0)
    }
    inputProps={{
      min: 0,
      style: {
        textAlign: "center",
        fontSize: styles.typography.fontSize.base,
      },
    }}
    sx={{
      width: {
        xs: 80,
        sm: 100,
      },
      "& .MuiOutlinedInput-root": {
        height: 40,
        borderRadius: styles.borderRadius.input,
        backgroundColor: styles.colors.neutral[50],
        "&:hover": {
          backgroundColor: styles.colors.white,
        },
        "&.Mui-focused": {
          backgroundColor: styles.colors.white,
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: styles.colors.primary.main,
            borderWidth: "2px",
          },
        },
      },
    }}
  />
  <IconButton
    size="medium"
    onClick={(e) => {
      e.stopPropagation();
      handleQuantityChange(index, item.quantity + 1, true);
    }}
    sx={{
      color: styles.colors.primary.main,
      fontSize: {
        xs: "1.5rem",
        sm: "1.75rem",
      },
    }}
  >
    <Add fontSize="inherit" />
  </IconButton>
</Box>
              </ListItem>
            ))}
          </List>
          <Divider sx={{ my: styles.spacing(2) }} /> {/* Margin-y 8px */}
          <Typography
            variant="body1"
            sx={{
              fontWeight: styles.typography.fontWeight.bold,
              color: styles.colors.text.primary,
              mb: styles.spacing(2), // Margin-bottom 8px
              fontSize: {
                xs: styles.typography.fontSize.sm, // 14px trên mobile
                sm: styles.typography.fontSize.base, // 16px trên sm
              },
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
              gap: styles.spacing(1), // Gap 4px
            }}
          >
            <Button
              sx={{
                ...styles.button("primary"),
                fontSize: {
                  xs: styles.typography.fontSize.sm, // 14px trên mobile
                  sm: styles.typography.fontSize.base, // 16px trên sm
                },
                px: styles.spacing(2), // Padding-x 8px
                py: styles.spacing(0.5), // Padding-y 2px
              }}
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
            mt: styles.spacing(2), // Margin-top 8px
            fontSize: {
              xs: styles.typography.fontSize.sm, // 14px trên mobile
              sm: styles.typography.fontSize.base, // 16px trên sm
            },
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
            maxWidth: "90vw",
            width: { xs: "95%", sm: 400 },
          },
        }}
      >
        <DialogTitle
          sx={{
            background: styles.gradients.primary,
            color: styles.colors.white,
            fontWeight: styles.typography.fontWeight.semibold,
            fontSize: {
              xs: styles.typography.fontSize.base, // 16px trên mobile
              sm: styles.typography.fontSize.lg, // 18px trên sm
            },
          }}
        >
          Xác nhận xóa món ăn
        </DialogTitle>
        <DialogContent sx={{ mt: styles.spacing(1), px: styles.spacing(2) }}>
          {" "}
          {/* Margin-top 4px, padding-x 8px */}
          <Typography
            variant="body1"
            sx={{
              fontSize: {
                xs: styles.typography.fontSize.sm, // 14px trên mobile
                sm: styles.typography.fontSize.base, // 16px trên sm
              },
              color: styles.colors.text.primary,
            }}
          >
            Bạn có chắc chắn muốn xóa món ăn này khỏi giỏ hàng?
          </Typography>
        </DialogContent>
        <DialogActions
          sx={{ p: styles.spacing(2), justifyContent: "flex-end" }} // Padding 8px
        >
          <Button
            sx={{
              ...styles.button("outline"),
              fontSize: {
                xs: styles.typography.fontSize.sm, // 14px trên mobile
                sm: styles.typography.fontSize.base, // 16px trên sm
              },
            }}
            onClick={handleCancelRemove}
          >
            Hủy
          </Button>
          <Button
            sx={{
              ...styles.button("primary"),
              fontSize: {
                xs: styles.typography.fontSize.sm, // 14px trên mobile
                sm: styles.typography.fontSize.base, // 16px trên sm
              },
            }}
            onClick={handleConfirmRemove}
          >
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CartView;
