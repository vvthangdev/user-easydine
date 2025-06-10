"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useAppleStyles } from "../theme/theme-hooks.js";

const MenuItemsDisplay = ({ menuItems, loading, showItemDetails, incrementItem }) => {
  const styles = useAppleStyles();

  // State để quản lý modal chi tiết
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Hàm mở modal chi tiết
  const handleOpenDetailModal = (item) => {
    setSelectedItem(item);
    setOpenDetailModal(true);
  };

  // Hàm đóng modal chi tiết
  const handleCloseDetailModal = () => {
    setOpenDetailModal(false);
    setSelectedItem(null);
  };

  return (
    <>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: styles.spacing(8) }}>
          <CircularProgress color="primary" />
        </Box>
      ) : menuItems.length > 0 ? (
        <Grid container spacing={styles.spacing(2)} justifyContent="center">
          {menuItems.map((item) => (
            <Grid item xs={6} sm={4} md={3} key={item._id}>
              <Card
                sx={{
                  width: 120,
                  height: 200, // Giảm chiều cao để gọn hơn
                  display: "flex",
                  flexDirection: "column",
                  cursor: "pointer",
                  bgcolor: styles.colors.background.paper,
                  boxShadow: styles.shadow("card"),
                  borderRadius: styles.borderRadius.card,
                  transition: styles.components.card.main.transition,
                  "&:hover": {
                    transform: styles.components.card.main["&:hover"].transform,
                    boxShadow: styles.components.card.main["&:hover"].boxShadow,
                  },
                }}
                onClick={() => {
                  console.log("Card clicked for item:", item);
                  showItemDetails(item);
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    width: "100%",
                    height: 80, // Giảm chiều cao ảnh
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                  image={item.image}
                  alt={item.name}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/160x80?text=Image+Not+Found";
                  }}
                />
                <CardContent
                  sx={{
                    p: styles.spacing(2), // Giảm padding
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    minHeight: 120, // Giảm chiều cao nội dung
                  }}
                >
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: styles.typography.fontWeight.semibold,
                        fontSize: {
                          xs: styles.typography.fontSize.sm, // Nhỏ hơn trên xs
                          sm: styles.typography.fontSize.base,
                        },
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: styles.typography.fontWeight.medium,
                        color: styles.colors.error,
                        mt: styles.spacing(1),
                        fontSize: {
                          xs: styles.typography.fontSize.xs,
                          sm: styles.typography.fontSize.sm,
                        },
                      }}
                    >
                      Giá: {item.price.toLocaleString()} VNĐ
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mt: styles.spacing(1),
                    }}
                  >
                    <Button
                      variant="outlined"
                      sx={{
                        ...styles.button("outline"),
                        fontSize: {
                          xs: styles.typography.fontSize.xs,
                          sm: styles.typography.fontSize.sm,
                        },
                        px: styles.spacing(2), // Giảm padding nút
                        py: styles.spacing(0.5),
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log("Detail button clicked for item:", item);
                        handleOpenDetailModal(item);
                      }}
                    >
                      Chi tiết
                    </Button>
                    <IconButton
                      color="primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log("IconButton clicked for item:", item);
                        incrementItem(item);
                      }}
                      sx={{
                        fontSize: {
                          xs: "1.25rem", // Nhỏ hơn trên xs
                          sm: "1.5rem",
                        },
                        color: styles.colors.primary.main,
                      }}
                    >
                      <AddCircleIcon fontSize="inherit" />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography
          variant="body1"
          sx={{
            fontSize: styles.typography.fontSize.base,
            color: styles.colors.text.secondary,
            textAlign: "center",
            mt: styles.spacing(8),
          }}
        >
          Không tìm thấy món ăn nào.
        </Typography>
      )}

      {/* Modal hiển thị chi tiết món ăn */}
      {selectedItem && (
        <Dialog
          open={openDetailModal}
          onClose={handleCloseDetailModal}
          PaperProps={{
            sx: {
              borderRadius: styles.borderRadius.modal,
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
              fontSize: {
                xs: styles.typography.fontSize.lg,
                sm: styles.typography.fontSize.xl,
              },
            }}
          >
            {selectedItem.name || "Chi tiết món"}
          </DialogTitle>
          <DialogContent sx={{ mt: styles.spacing(2), px: styles.spacing(3) }}>
            {selectedItem.sizes && selectedItem.sizes.length > 0 ? (
              <Box sx={{ mb: styles.spacing(2) }}>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: styles.typography.fontWeight.medium,
                    fontSize: {
                      xs: styles.typography.fontSize.sm,
                      sm: styles.typography.fontSize.base,
                    },
                  }}
                >
                  Kích thước:
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: {
                      xs: styles.typography.fontSize.xs,
                      sm: styles.typography.fontSize.sm,
                    },
                    color: styles.colors.text.primary,
                  }}
                >
                  {selectedItem.sizes
                    .map((size) => `${size.name} (${size.price.toLocaleString()} VNĐ)`)
                    .join(", ")}
                </Typography>
              </Box>
            ) : (
              <Typography
                variant="body2"
                sx={{
                  fontSize: {
                    xs: styles.typography.fontSize.xs,
                    sm: styles.typography.fontSize.sm,
                  },
                  color: styles.colors.text.secondary,
                }}
              >
                Không có kích thước nào.
              </Typography>
            )}
            {selectedItem.description ? (
              <Box>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: styles.typography.fontWeight.medium,
                    fontSize: {
                      xs: styles.typography.fontSize.sm,
                      sm: styles.typography.fontSize.base,
                    },
                  }}
                >
                  Mô tả:
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: {
                      xs: styles.typography.fontSize.xs,
                      sm: styles.typography.fontSize.sm,
                    },
                    color: styles.colors.text.primary,
                  }}
                >
                  {selectedItem.description}
                </Typography>
              </Box>
            ) : (
              <Typography
                variant="body2"
                sx={{
                  fontSize: {
                    xs: styles.typography.fontSize.xs,
                    sm: styles.typography.fontSize.sm,
                  },
                  color: styles.colors.text.secondary,
                }}
              >
                Không có mô tả.
              </Typography>
            )}
          </DialogContent>
          <DialogActions sx={{ px: styles.spacing(2), pb: styles.spacing(2) }}>
            <Button
              onClick={handleCloseDetailModal}
              sx={{
                ...styles.button("outline"),
                fontSize: {
                  xs: styles.typography.fontSize.sm,
                  sm: styles.typography.fontSize.base,
                },
                px: styles.spacing(6), // Giảm padding nút
                        py: styles.spacing(2),
              }}
            >
              Đóng
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default MenuItemsDisplay;