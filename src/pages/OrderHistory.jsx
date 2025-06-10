"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
} from "@mui/material";
import { useAppleStyles } from "../theme/theme-hooks.js";
import { orderAPI } from "../services/apis/Order";

const OrderHistory = ({ tableId, open, onClose }) => {
  const styles = useAppleStyles();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOrderHistory = async () => {
    if (!tableId) {
      setError("Không tìm thấy ID bàn");
      return;
    }

    setLoading(true);
    try {
      const response = await orderAPI.getOrderInfo({ table_id: tableId });
      setOrders(Array.isArray(response) ? response : [response]);
      setError(null);
    } catch (err) {
      console.error("Lỗi khi lấy lịch sử đặt hàng:", err);
      setError("Không thể tải lịch sử đặt hàng. Vui lòng thử lại.");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open && tableId) {
      fetchOrderHistory();
    }
  }, [open, tableId]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: styles.rounded("modal"),
          boxShadow: styles.shadow("2xl"),
          background: styles.colors.background.paper,
          maxWidth: "90vw",
          maxHeight: "90vh",
        },
      }}
    >
      <DialogTitle
        sx={{
          background: styles.gradients.primary,
          color: styles.colors.white,
          fontWeight: styles.typography.fontWeight.semibold,
          fontSize: styles.typography.fontSize.xl,
        }}
      >
        Lịch sử đặt hàng
      </DialogTitle>
      <DialogContent sx={{ p: styles.spacing(4) }}>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              p: styles.spacing(4),
            }}
          >
            <CircularProgress color="primary" />
          </Box>
        ) : error ? (
          <Box
            sx={{
              textAlign: "center",
              p: styles.spacing(4),
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: styles.colors.error,
                fontSize: styles.typography.fontSize.base,
                mb: styles.spacing(2),
              }}
            >
              {error}
            </Typography>
            <Button
              sx={styles.button("primary")}
              onClick={fetchOrderHistory}
            >
              Thử lại
            </Button>
          </Box>
        ) : orders.length === 0 ? (
          <Typography
            variant="body1"
            sx={{
              color: styles.colors.text.secondary,
              fontSize: styles.typography.fontSize.base,
              textAlign: "center",
              p: styles.spacing(4),
            }}
          >
            Không có lịch sử đặt hàng
          </Typography>
        ) : (
          <Box>
            {orders.map((orderData, index) => (
              <Box
                key={orderData.order.id}
                sx={{
                  mb: styles.spacing(4),
                  ...styles.card("main"),
                  p: styles.spacing(4),
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: styles.typography.fontWeight.bold,
                    fontSize: styles.typography.fontSize.lg,
                    color: styles.colors.text.primary,
                  }}
                >
                  Đơn hàng #{orderData.order.id}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: styles.colors.text.secondary,
                    mb: styles.spacing(2),
                  }}
                >
                  Thời gian:{" "}
                  {new Date(orderData.order.time).toLocaleString("vi-VN")}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: styles.colors.text.secondary,
                    mb: styles.spacing(2),
                  }}
                >
                  Bàn: {orderData.reservedTables[0]?.table_number} (
                  {orderData.reservedTables[0]?.area})
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: styles.colors.text.secondary,
                    mb: styles.spacing(2),
                  }}
                >
                  Trạng thái:{" "}
                  {orderData.order.status === "confirmed"
                    ? "Đã xác nhận"
                    : "Chờ xử lý"}
                </Typography>
                <Divider sx={{ my: styles.spacing(2) }} />
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: styles.typography.fontWeight.semibold,
                    color: styles.colors.text.primary,
                  }}
                >
                  Món ăn:
                </Typography>
                <List dense>
                  {orderData.itemOrders.map((item, i) => (
                    <ListItem
                      key={i}
                      sx={{
                        py: styles.spacing(1),
                        borderRadius: styles.rounded("sm"),
                      }}
                    >
                      <ListItemText
                        primary={
                          <Typography
                            sx={{
                              fontWeight: styles.typography.fontWeight.medium,
                              fontSize: styles.typography.fontSize.base,
                            }}
                          >
                            {item.itemName} {item.size ? `(${item.size})` : ""}
                          </Typography>
                        }
                        secondary={
                          <Typography
                            sx={{
                              color: styles.colors.text.secondary,
                              fontSize: styles.typography.fontSize.sm,
                            }}
                          >
                            Số lượng: {item.quantity} | Ghi chú: {item.note || "Không có"} | Giá:{" "}
                            {(item.itemPrice * item.quantity).toLocaleString()} VNĐ
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
                <Divider sx={{ my: styles.spacing(2) }} />
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: styles.typography.fontWeight.bold,
                    color: styles.colors.text.primary,
                  }}
                >
                  Tổng cộng: {orderData.order.final_amount.toLocaleString()} VNĐ
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default OrderHistory;