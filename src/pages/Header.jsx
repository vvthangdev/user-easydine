import React, { useState, useEffect } from "react";
import { Box, Typography, IconButton, Badge } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HistoryIcon from "@mui/icons-material/History";
import { useAppleStyles } from "../theme/theme-hooks.js";
import { toast } from "react-toastify";
import { tableAPI } from "../services/apis/Table";

const Header = ({
  tableId,
  searchTerm,
  handleSearch,
  selectedItems,
  onCartClick,
  onHistoryClick,
}) => {
  const styles = useAppleStyles();
  const [tableInfo, setTableInfo] = useState(null);

  useEffect(() => {
    const fetchTableInfo = async () => {
      if (!tableId) {
        toast.error("Không tìm thấy ID bàn");
        setTableInfo(null);
        return;
      }

      try {
        const response = await tableAPI.getTableById({ table_id: tableId });
        console.log("Table info response:", response);
        setTableInfo(response);
      } catch (error) {
        console.error("Error fetching table info:", error);
        setTableInfo(null);
        toast.error(error.message || "Không thể lấy thông tin bàn");
      }
    };

    fetchTableInfo();
  }, [tableId]);

  return (
    <Box
      sx={{
        width: "100%",
        background: styles.gradients.light,
        boxShadow: styles.shadow("sm"),
        p: { xs: styles.spacing(2), sm: styles.spacing(4) },
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        zIndex: styles.mui.zIndex.appBar,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: styles.spacing(2) }}>
        {tableInfo ? (
          <Typography
            variant="h6"
            sx={{
              fontWeight: styles.typography.fontWeight.bold,
              color: styles.colors.text.primary,
              fontSize: {
                xs: styles.typography.fontSize.base,
                sm: styles.typography.fontSize.xl,
              },
            }}
          >
            Bàn {tableInfo.table_number}
          </Typography>
        ) : (
          <Typography
            variant="h6"
            sx={{
              color: styles.colors.error,
              fontWeight: styles.typography.fontWeight.semibold,
              fontSize: {
                xs: styles.typography.fontSize.base,
                sm: styles.typography.fontSize.xl,
              },
            }}
          >
            Không tìm thấy thông tin bàn
          </Typography>
        )}
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: styles.spacing(1),
        }}
      >
        <Box
          sx={{
            ...styles.input("search"),
            display: "flex",
            alignItems: "center",
            position: "relative",
            width: { xs: "50%", sm: "40ch" },
            mr: styles.spacing(2),
          }}
        >
          <Box
            sx={{
              ...styles.iconContainer("primary"),
              position: "absolute",
              left: styles.spacing(1),
              pointerEvents: "none",
              width: { xs: styles.spacing(8), sm: styles.spacing(12) },
              height: { xs: styles.spacing(8), sm: styles.spacing(12) },
            }}
          >
            <SearchIcon fontSize="small" />
          </Box>
          <input
            placeholder="Tìm món ăn..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            style={{
              ...styles.input("search"),
              width: "100%",
              paddingLeft: `calc(1em + ${styles.spacing(4)})`,
              paddingRight: styles.spacing(1),
              color: styles.colors.text.primary,
              fontSize: {
                xs: styles.typography.fontSize.sm,
                sm: styles.typography.fontSize.base,
              },
            }}
          />
        </Box>

        <IconButton
          onClick={onCartClick}
          sx={{
            ...styles.iconContainer("primary"),
            color: styles.colors.white,
            width: { xs: styles.spacing(8), sm: styles.spacing(12) },
            height: { xs: styles.spacing(8), sm: styles.spacing(12) },
          }}
        >
          <Badge badgeContent={selectedItems.length} color="error">
            <ShoppingCartIcon fontSize="small" />
          </Badge>
        </IconButton>

        <IconButton
          onClick={onHistoryClick}
          sx={{
            ...styles.iconContainer("primary"),
            color: styles.colors.white,
            width: { xs: styles.spacing(8), sm: styles.spacing(12) },
            height: { xs: styles.spacing(8), sm: styles.spacing(12) },
          }}
        >
          <HistoryIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Header;