"use client";
import { Box, List, ListItem, ListItemButton, Divider, Typography  } from "@mui/material";
import { Category, GridView } from "@mui/icons-material";
import { useAppleStyles } from "../theme/theme-hooks.js";

const Sidebar = ({ categories, filterCategory, handleFilterByCategory }) => {
  const styles = useAppleStyles();

  return (
    <Box
  sx={{
         width: { xs: "25%", sm: "25%" },
        background: styles.gradients.light,
        boxShadow: styles.shadows.card,
        p: { xs: styles.spacing(1), sm: styles.spacing(3) },
        pt: styles.spacing(2), // Thêm padding-top nhỏ cho thẩm mỹ
        position: "fixed", // Cố định Sidebar
         top: { xs: styles.spacing(14), sm: styles.spacing(20), md: styles.spacing(24) }, // Khớp chính xác với chiều cao Header
        left: 0,
        height: "100vh", // Chiếm toàn bộ chiều cao viewport
        zIndex: 10,
        borderRight: `1px solid ${styles.colors.neutral[200]}`,
        boxSizing: "border-box",
      }}
>
      {/* Header */}
      <Box
        sx={{
          ...styles.components.header.primary,
          mb: styles.spacing(2),
          p: { xs: styles.spacing(1), sm: styles.spacing(3) },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={styles.components.iconContainer.glass}>
          <Category sx={{ fontSize: 12, color: styles.colors.white }} />
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
                },
              }}
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
      </List>
    </Box>
  );
};

export default Sidebar;