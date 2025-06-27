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

const CartView = ({ selectedItems, onItemUpdate, onShowDetails, orderId, onCloseCart }) => {
  const styles = useAppleStyles();
  const { createOrder, updateItemQuantity, removeItem } = CartViewModel(
    selectedItems,
    onItemUpdate,
    orderId,
    onCloseCart,
  );
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [itemToRemoveIndex, setItemToRemoveIndex] = useState(null);
  const [openGuestInfoDialog, setOpenGuestInfoDialog] = useState(false);
  const [guestInfo, setGuestInfo] = useState({
    name: "",
    phone: "",
    email: "",
  });

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

  const handleOpenGuestInfoDialog = () => {
    setOpenGuestInfoDialog(true);
  };

  const handleCloseGuestInfoDialog = () => {
    setOpenGuestInfoDialog(false);
    setGuestInfo({ name: "", phone: "", email: "" });
  };

  const handleGuestInfoChange = (field) => (e) => {
    setGuestInfo({ ...guestInfo, [field]: e.target.value });
  };

  const handleConfirmGuestInfo = async () => {
    await createOrder(guestInfo);
    setOpenGuestInfoDialog(false);
    setGuestInfo({ name: "", phone: "", email: "" });
  };

  const handleCreateOrder = () => {
    if (!orderId) {
      handleOpenGuestInfoDialog(); // Mở modal nếu là đơn hàng mới
    } else {
      createOrder(); // Gọi trực tiếp nếu thêm vào đơn hàng hiện tại
    }
  };

  return (
    <Box
      sx={{
        p: styles.spacing(2),
        ...styles.card("main"),
        marginTop:"2px",
        paddingLeft:"2px"
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: styles.typography.fontWeight.bold,
          mb: styles.spacing(2),
          color: styles.colors.text.primary,
         
          padding: "1px",
          fontSize: {
            xs: styles.typography.fontSize.base,
            sm: styles.typography.fontSize.lg,
          },
        }}
      >
        Giỏ hàng
      </Typography>
      {selectedItems.length > 0 ? (
        <>
          <List sx={{ mb: styles.spacing(2) }}>
            {selectedItems.map((item, index) => (
              <ListItem
                key={item._id || index}
                sx={{
                  borderRadius: styles.rounded("sm"),
                  mb: styles.spacing(1),
                  paddingTop: "1px",
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
                            xs: styles.typography.fontSize.sm,
                            sm: styles.typography.fontSize.base,
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
                          mt: styles.spacing(0.5),
                          fontSize: {
                            xs: styles.typography.fontSize.xs,
                            sm: styles.typography.fontSize.sm,
                          },
                        }}
                      >
                        Note: {item.note || ""} | Giá:{" "}
                        {(item.price * item.quantity).toLocaleString()} VNĐ
                      </Typography>
                    }
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: styles.spacing(0),
                    padding: "1px",
                  }}
                >
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleQuantityChange(index, item.quantity - 1, true);
                    }}
                    disabled={item.quantity <= 0}
                    sx={{
                      color: styles.colors.primary.main,
                      fontSize: {
                        xs: "1.0rem",
                        sm: "1.2rem",
                        padding: "1px",
                      },
                    }}
                  >
                    <Remove fontSize="inherit" />
                  </IconButton>
                  <TextField
                    type="number"
                    value={item.quantity}
                    onClick={(e) => e.stopPropagation()}
                    onFocus={(e) => e.target.select()}
                    onChange={(e) =>
                      handleQuantityChange(index, parseInt(e.target.value) || 0)
                    }
                    inputProps={{
                      min: 0,
                      style: {
                        textAlign: "center",
                        fontSize: styles.typography.fontSize.base,
                        // padding: "1px", // Giảm padding bên trong ô số lượng
                      },
                    }}
                    sx={{
                      width: {
                        xs: 60,
                        sm: 80,
                      },
                      "& .MuiOutlinedInput-root": {
                        height: 32,
                        borderRadius: styles.borderRadius.input,
                        backgroundColor: styles.colors.neutral["50"],
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
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleQuantityChange(index, item.quantity + 1, true);
                    }}
                    sx={{
                      color: styles.colors.primary.main,
                      fontSize: {
                        xs: "1.0rem",
                        sm: "1.2rem",
                      },
                    }}
                  >
                    <Add fontSize="inherit" />
                  </IconButton>
                </Box>
              </ListItem>
            ))}
          </List>
          <Divider sx={{ my: styles.spacing(2) }} />
          <Typography
            variant="body1"
            sx={{
              fontWeight: styles.typography.fontWeight.bold,
              color: styles.colors.text.primary,
              mb: styles.spacing(2),
              fontSize: {
                xs: styles.typography.fontSize.sm,
                sm: styles.typography.fontSize.base,
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
              gap: styles.spacing(1),
            }}
          >
            <Button
              sx={{
                ...styles.button("primary"),
                fontSize: {
                  xs: styles.typography.fontSize.sm,
                  sm: styles.typography.fontSize.base,
                },
                px: styles.spacing(2),
                py: styles.spacing(0.5),
              }}
              onClick={handleCreateOrder}
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
            mt: styles.spacing(2),
            fontSize: {
              xs: styles.typography.fontSize.sm,
              sm: styles.typography.fontSize.base,
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
              xs: styles.typography.fontSize.base,
              sm: styles.typography.fontSize.lg,
            },
          }}
        >
          Xác nhận xóa món ăn
        </DialogTitle>
        <DialogContent sx={{ mt: styles.spacing(1), px: styles.spacing(2) }}>
          <Typography
            variant="body1"
            sx={{
              fontSize: {
                xs: styles.typography.fontSize.sm,
                sm: styles.typography.fontSize.base,
              },
              color: styles.colors.text.primary,
            }}
          >
            Bạn có chắc chắn muốn xóa món ăn này khỏi giỏ hàng?
          </Typography>
        </DialogContent>
        <DialogActions
          sx={{ p: styles.spacing(2), justifyContent: "flex-end" }}
        >
          <Button
            sx={{
              ...styles.button("outline"),
              fontSize: {
                xs: styles.typography.fontSize.sm,
                sm: styles.typography.fontSize.base,
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
                xs: styles.typography.fontSize.sm,
                sm: styles.typography.fontSize.base,
              },
            }}
            onClick={handleConfirmRemove}
          >
            Xóa
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog nhập thông tin khách */}
      <Dialog
        open={openGuestInfoDialog}
        onClose={handleCloseGuestInfoDialog}
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
              xs: styles.typography.fontSize.base,
              sm: styles.typography.fontSize.lg,
            },
          }}
        >
          Nhập thông tin khách (không bắt buộc)
        </DialogTitle>
        <DialogContent sx={{ mt: styles.spacing(2), px: styles.spacing(2) }}>
          <TextField
            label="Họ và tên"
            value={guestInfo.name}
            onChange={handleGuestInfoChange("name")}
            fullWidth
            margin="normal"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: styles.borderRadius.input,
                backgroundColor: styles.colors.neutral[50],
              },
            }}
          />
          <TextField
            label="Số điện thoại"
            value={guestInfo.phone}
            onChange={handleGuestInfoChange("phone")}
            fullWidth
            margin="normal"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: styles.borderRadius.input,
                backgroundColor: styles.colors.neutral[50],
              },
            }}
          />
          <TextField
            label="Email"
            value={guestInfo.email}
            onChange={handleGuestInfoChange("email")}
            fullWidth
            margin="normal"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: styles.borderRadius.input,
                backgroundColor: styles.colors.neutral[50],
              },
            }}
          />
        </DialogContent>
        <DialogActions
          sx={{ p: styles.spacing(2), justifyContent: "flex-end" }}
        >
          <Button
            sx={{
              ...styles.button("outline"),
              fontSize: {
                xs: styles.typography.fontSize.sm,
                sm: styles.typography.fontSize.base,
              },
            }}
            onClick={handleCloseGuestInfoDialog}
          >
            Hủy
          </Button>
          <Button
            sx={{
              ...styles.button("primary"),
              fontSize: {
                xs: styles.typography.fontSize.sm,
                sm: styles.typography.fontSize.base,
              },
            }}
            onClick={handleConfirmGuestInfo}
          >
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CartView;