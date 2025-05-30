// src/components/MenuItemsDisplay.js
import React from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  Paper,
  IconButton,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const MenuItemsDisplay = ({ menuItems, loading, showItemDetails, incrementItem }) => {
  return (
    <>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      ) : menuItems.length > 0 ? (
        <Grid container spacing={3}>
          {menuItems.map((item) => (
            <Grid item xs={12} sm={6} key={item._id}>
              <Paper
                elevation={2}
                sx={{
                  borderRadius: 2,
                  overflow: "hidden",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "scale(1.02)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  },
                  width: "100%",
                  maxWidth: 400,
                  height: 400,
                  display: "flex",
                  flexDirection: "column",
                  cursor: "pointer", // Thêm con trỏ để báo hiệu có thể bấm
                }}
                onClick={() => {
                  console.log("Paper clicked for item:", item); // Debugging
                  showItemDetails(item);
                }}
              >
                <Box sx={{ height: 200, overflow: "hidden" }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/200";
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    p: 2,
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: "bold", color: "#d32f2f" }}
                    >
                      Giá: {item.price.toLocaleString()} VNĐ
                    </Typography>
                    {item.sizes && item.sizes.length > 0 && (
                      <>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          Kích thước:
                        </Typography>
                        {item.sizes.map((size, index) => (
                          <Typography variant="body2" key={size._id}>
                            {size.name} ({size.price.toLocaleString()} VNĐ)
                            {index < item.sizes.length - 1 ? ", " : ""}
                          </Typography>
                        ))}
                      </>
                    )}
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Danh mục:{" "}
                      {item.categories.length > 0
                        ? item.categories.map((cat) => cat.name).join(", ")
                        : "Không có"}
                    </Typography>
                    {item.description && (
                      <Typography
                        variant="body2"
                        sx={{
                          mt: 1,
                          color: "#555",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        Mô tả: {item.description}
                      </Typography>
                    )}
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <IconButton
                      color="primary"
                      onClick={(e) => {
                        e.stopPropagation(); // Ngăn sự kiện click trên Paper
                        console.log("IconButton clicked for item:", item); // Debugging
                        incrementItem(item); // Gọi hàm tăng số lượng
                      }}
                      sx={{ fontSize: "2rem" }}
                    >
                      <AddCircleIcon fontSize="inherit" />
                    </IconButton>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1">Không tìm thấy món ăn nào.</Typography>
      )}
    </>
  );
};

export default MenuItemsDisplay;