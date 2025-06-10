import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import { useAppleStyles } from "../theme/theme-hooks.js";

const Sidebar = ({ categories, filterCategory, handleFilterByCategory }) => {
  const styles = useAppleStyles();

  return (
    <Box
      sx={{
        // Giảm width để tối ưu không gian
        width: { 
          xs: styles.spacing(18), // Giảm từ 20 về 18 (72px)
          sm: styles.spacing(22)  // Giảm từ 24 về 22 (88px)
        },
        background: styles.colors.background.paper,
        boxShadow: styles.shadow("sm"),
        minHeight: "100vh",
        // Giảm padding để tối ưu không gian
        p: { 
          xs: styles.spacing(1), // Giảm từ 1 về 0.5
          sm: styles.spacing(1)    // Giảm từ 2 về 1
        },
        overflowY: "auto",
        position: "sticky",
        top: 0,
        zIndex: 1,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: styles.typography.fontWeight.semibold,
          fontSize: { 
            xs: styles.typography.fontSize.sm, // Giảm từ base về sm
            sm: styles.typography.fontSize.base // Giảm từ lg về base
          },
          color: styles.colors.text.primary,
          mb: styles.spacing(1.5), // Giảm margin bottom
          pl: styles.spacing(0.5), // Giảm padding left
          // Cho phép xuống dòng thay vì cắt
          overflow: "visible",
          textOverflow: "unset",
          whiteSpace: "normal",
          wordWrap: "break-word",
          lineHeight: 1.2,
        }}
      >
        Danh mục
      </Typography>
      <Divider sx={{ mb: styles.spacing(1.5) }} />
      <List sx={{ p: 0 }}>
        <ListItem disablePadding sx={{ mb: styles.spacing(0.25) }}>
          <ListItemButton
            selected={filterCategory === "all"}
            onClick={() => handleFilterByCategory("all")}
            sx={{
              borderRadius: styles.borderRadius.sm,
              py: styles.spacing(1), // Giảm padding vertical
              px: styles.spacing(1), // Giảm padding horizontal
              minHeight: 40, // Giảm chiều cao tối thiểu
              "&.Mui-selected": {
                background: styles.gradients.primary,
                color: styles.colors.white,
                "&:hover": {
                  background: styles.colors.primary.dark,
                },
              },
              "&:hover": {
                background: styles.colors.primary[50],
              },
            }}
          >
            <ListItemText
              primary={
                <Typography
                  sx={{
                    fontWeight: styles.typography.fontWeight.medium,
                    fontSize: { 
                      xs: styles.typography.fontSize.xs, // Giảm size
                      sm: styles.typography.fontSize.sm  // Giảm size
                    },
                    // Cho phép xuống dòng
                    overflow: "visible",
                    textOverflow: "unset",
                    whiteSpace: "normal",
                    wordWrap: "break-word",
                    lineHeight: 1.3,
                  }}
                >
                  Tất cả
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>
        {categories.map((category) => (
          <ListItem key={category._id} disablePadding sx={{ mb: styles.spacing(0.25) }}>
            <ListItemButton
              selected={filterCategory === category._id}
              onClick={() => handleFilterByCategory(category._id)}
              sx={{
                borderRadius: styles.borderRadius.sm,
                py: styles.spacing(1),
                px: styles.spacing(1),
                minHeight: 40,
                "&.Mui-selected": {
                  background: styles.gradients.primary,
                  color: styles.colors.white,
                  "&:hover": {
                    background: styles.colors.primary.dark,
                  },
                },
                "&:hover": {
                  background: styles.colors.primary[50],
                },
              }}
            >
              <ListItemText
                primary={
                  <Typography
                    sx={{
                      fontWeight: styles.typography.fontWeight.medium,
                      fontSize: { 
                        xs: styles.typography.fontSize.xs,
                        sm: styles.typography.fontSize.sm
                      },
                      // Cho phép xuống dòng thay vì cắt
                      overflow: "visible",
                      textOverflow: "unset",
                      whiteSpace: "normal",
                      wordWrap: "break-word",
                      lineHeight: 1.3,
                    }}
                  >
                    {category.name}
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;