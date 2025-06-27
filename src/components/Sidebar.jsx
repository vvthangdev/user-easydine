import { Box, List, ListItem, ListItemButton, Divider, Typography } from "@mui/material";
import { Notifications, GridView, Star } from "@mui/icons-material";
import { useAppleStyles } from "../theme/theme-hooks.js";
import { orderAPI } from "../services/apis/Order.js";
import { toast } from "react-toastify";

const Sidebar = ({ categories, filterCategory, handleFilterByCategory, onRateClick }) => {
  const styles = useAppleStyles();

  // Hàm xử lý khi bấm vào chuông (gửi thông báo)
  const handleNotificationClick = async () => {
    try {
      const tableId = localStorage.getItem("tableId");
      if (!tableId) {
        toast.error("Không tìm thấy ID bàn trong localStorage");
        return;
      }
      const response = await orderAPI.sendTableNotification(tableId);
      toast.success("Gửi thông báo cho bàn thành công!");
      console.log("Phản hồi từ API:", response);
    } catch (error) {
      toast.error("Gửi thông báo thất bại. Vui lòng thử lại.");
      console.error("Lỗi khi gửi thông báo:", error);
    }
  };

  return (
    <Box
      sx={{
        width: { xs: "25%", sm: "25%" },
        background: styles.gradients.light,
        boxShadow: styles.shadows.card,
        p: { xs: styles.spacing(1), sm: styles.spacing(3) },
        pt: styles.spacing(2),
        position: "fixed",
        top: { xs: styles.spacing(14), sm: styles.spacing(20), md: styles.spacing(24) },
        left: 0,
        height: "100vh",
        zIndex: 10,
        borderRight: `1px solid ${styles.colors.neutral[200]}`,
        boxSizing: "border-box",
      }}
    >
      {/* Icon thông báo */}
      <Box
        sx={{
          ...styles.components.header.primary,
          mb: styles.spacing(2),
          p: { xs: styles.spacing(1), sm: styles.spacing(3) },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
        onClick={handleNotificationClick}
      >
        <Box sx={styles.components.iconContainer.glass}>
          <Notifications sx={{ fontSize: 12, color: styles.colors.white }} />
        </Box>
      </Box>

      <List sx={{ p: 0 }}>
        {/* Tất cả */}
        <ListItem disablePadding sx={{ mb: styles.spacing(1) }}>
          <ListItemButton
            selected={filterCategory === "all"}
            onClick={() => handleFilterByCategory("all")}
            sx={{
              borderRadius: styles.borderRadius.lg,
              py: styles.spacing(1.5),
              px: { xs: styles.spacing(2), sm: styles.spacing(3) },
              minHeight: { xs: 40, sm: 48 },
              background: filterCategory === "all" ? styles.gradients.primary : "transparent",
              color: filterCategory === "all" ? styles.colors.white : styles.colors.text.primary,
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              "&:hover": {
                background: filterCategory === "all" ? styles.gradients.primary : styles.colors.primary[50],
                transform: "translateX(4px)",
                boxShadow: filterCategory === "all" ? styles.shadows.button : styles.shadows.sm,
              },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
              <GridView sx={{ fontSize: 16 }} />
            </Box>
          </ListItemButton>
        </ListItem>

        <Divider sx={{ my: styles.spacing(1.5), opacity: 0.3 }} />

        {/* Categories */}
        {categories.map((category) => (
          <ListItem key={category._id} disablePadding sx={{ mb: styles.spacing(1) }}>
            <ListItemButton
              selected={filterCategory === category._id}
              onClick={() => handleFilterByCategory(category._id)}
              sx={{
                borderRadius: styles.borderRadius.lg,
                py: styles.spacing(1.5),
                px: { xs: styles.spacing(2), sm: styles.spacing(3) },
                minHeight: { xs: 50, sm: 60 },
                maxHeight: { xs: 50, sm: 60 },
                background: filterCategory === category._id ? styles.gradients.primary : "transparent",
                color: filterCategory === category._id ? styles.colors.white : styles.colors.text.primary,
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  background: filterCategory === category._id ? styles.gradients.primary : styles.colors.primary[50],
                  transform: "translateX(4px)",
                  boxShadow: filterCategory === "all" ? styles.shadows.button : styles.shadows.sm,
                }}
              }
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: styles.spacing(1.5), width: "100%" }}>
                <Typography
                  sx={{
                    fontWeight: styles.typography.fontWeight.medium,
                    fontSize: styles.typography.fontSize.sm,
                    whiteSpace: "normal",
                    color: filterCategory === category._id ? styles.colors.white : styles.colors.text.primary,
                  }}
                >
                  {category.name}
                </Typography>
              </Box>
            </ListItemButton>
          </ListItem>
        ))}

        {/* Icon đánh giá */}
        <Box
          sx={{
            ...styles.components.header.secondary,
            background: styles.gradients.warning,
            mt: styles.spacing(2),
            p: { xs: styles.spacing(1), sm: styles.spacing(3) },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
          onClick={onRateClick}
        >
          <Box sx={styles.components.iconContainer.glass}>
            <Star sx={{ fontSize: 12, color: styles.colors.white }} />
          </Box>
        </Box>
      </List>
    </Box>
  );
};

export default Sidebar;