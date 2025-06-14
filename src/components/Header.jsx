import { Box, Typography, IconButton, Badge, InputBase, Chip } from "@mui/material";
import { Search, ShoppingCart, History, Wifi } from "@mui/icons-material";
import { useAppleStyles } from "../theme/theme-hooks.js";
import restaurantLogo from "../assets/images/logo2.png"; // Đường dẫn logo

const Header = ({ tableInfo, searchTerm, handleSearch, selectedItems, onCartClick, onHistoryClick }) => {
  const styles = useAppleStyles();

  const getStatusColor = (status) => {
    switch (status) {
      case "Available":
        return styles.colors.success;
      case "Occupied":
        return styles.colors.warning;
      case "Reserved":
        return styles.colors.info;
      default:
        return styles.colors.neutral[500];
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "Available":
        return "Trống";
      case "Occupied":
        return "Đang dùng";
      case "Reserved":
        return "Đã đặt";
      default:
        return "Không rõ";
    }
  };

  return (
    <Box
      sx={{
        background: styles.gradients.light,
        boxShadow: styles.shadows.card,
        borderBottom: `1px solid ${styles.colors.neutral[200]}`,
        position: "sticky",
        top: 0,
        zIndex: styles.mui.zIndex.appBar,
        width: "100%",
        minWidth: "100%",
      }}
    >
      {/* Main Header - Single row layout */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: { xs: styles.spacing(2), sm: styles.spacing(3) },
          p: { xs: styles.spacing(3), sm: styles.spacing(4), md: styles.spacing(5) }, // 12px, 16px, 20px
          flexWrap: "wrap",
          width: "100%",
          maxWidth: "100%",
        }}
      >
        {/* Table Info with Logo */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: styles.spacing(2),
            flex: 1,
            minWidth: 0,
          }}
        >
          <Box
            component="img"
            src={restaurantLogo}
            alt="Số bàn"
            sx={{
              width: { xs: 32, sm: 40, md: 48 },
              height: { xs: 32, sm: 40, md: 48 },
              objectFit: "contain",
              flexShrink: 0,
            }}
          />

          {tableInfo ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: styles.spacing(1.5),
                flex: 1,
                minWidth: 0,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: styles.spacing(0.5),
                  flex: 1,
                  minWidth: 0,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: styles.typography.fontWeight.bold,
                    color: styles.colors.text.primary,
                    fontSize: { xs: styles.typography.fontSize.sm, sm: styles.typography.fontSize.base },
                    lineHeight: 1.2,
                    flexShrink: 0,
                  }}
                >
                  {`Số bàn ${tableInfo.table_number}`}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: styles.colors.text.secondary,
                    fontSize: { xs: styles.typography.fontSize.xs, sm: styles.typography.fontSize.sm },
                    lineHeight: 1.2,
                    flexShrink: 0,
                  }}
                >
                  {tableInfo.area}
                </Typography>
              </Box>
              <Chip
                label={getStatusText(tableInfo.status)}
                size="small"
                sx={{
                  backgroundColor: getStatusColor(tableInfo.status),
                  color: styles.colors.white,
                  fontWeight: styles.typography.fontWeight.semibold,
                  fontSize: { xs: "10px", sm: styles.typography.fontSize.sm },
                  px: { xs: styles.spacing(0.5), sm: styles.spacing(1) },
                  height: { xs: 18, sm: 24 },
                  flexShrink: 0,
                  "& .MuiChip-label": {
                    px: { xs: styles.spacing(0.5), sm: styles.spacing(1) },
                  },
                }}
              />
            </Box>
          ) : (
            <Typography
              variant="body2"
              sx={{
                color: styles.colors.error,
                fontWeight: styles.typography.fontWeight.semibold,
                fontSize: { xs: styles.typography.fontSize.xs, sm: styles.typography.fontSize.sm },
              }}
            >
              Không tìm thấy bàn
            </Typography>
          )}
        </Box>

        {/* Search Box */}
        <Box
          sx={{
            position: "relative",
            width: { xs: 140, sm: 220, md: 260 },
            minWidth: 120,
            ...styles.components.card.glass,
            p: { xs: styles.spacing(1), sm: styles.spacing(1.5) },
            display: "flex",
            alignItems: "center",
            borderRadius: styles.borderRadius.input,
            boxShadow: styles.shadows.xs,
            flexShrink: 1,
          }}
        >
          <IconButton
            sx={{
              ...styles.components.iconContainer.primary,
              width: { xs: 32, sm: 36 },
              height: { xs: 32, sm: 36 },
              p: { xs: styles.spacing(0.75), sm: styles.spacing(1) },
              mr: styles.spacing(0.5),
              transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
              "&:hover": {
                transform: "scale(1.15)",
                boxShadow: styles.shadows.sm,
              },
            }}
          >
            <Search
              sx={{
                fontSize: { xs: 14, sm: 18 },
                color: styles.colors.white,
              }}
            />
          </IconButton>
          <InputBase
            placeholder="Tìm kiếm..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            sx={{
              flex: 1,
              fontSize: { xs: styles.typography.fontSize.xs, sm: styles.typography.fontSize.sm },
              color: styles.colors.text.primary,
              minWidth: 0,
              "& ::placeholder": {
                color: styles.colors.text.secondary,
                opacity: 1,
              },
            }}
          />
        </Box>

        {/* Action Buttons */}
        <Box
          sx={{
            display: "flex",
            gap: styles.spacing(1),
            flexShrink: 0,
          }}
        >
          <IconButton
            onClick={onCartClick}
            sx={{
              ...styles.components.iconContainer.primary,
              width: { xs: 32, sm: 44 },
              height: { xs: 32, sm: 44 },
              p: { xs: styles.spacing(0.75), sm: styles.spacing(1.5) },
              transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
              "&:hover": {
                transform: "scale(1.15)",
                boxShadow: styles.shadows.sm,
              },
            }}
          >
            <Badge
              badgeContent={selectedItems.length}
              color="error"
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: styles.colors.error,
                  color: styles.colors.white,
                  fontWeight: styles.typography.fontWeight.bold,
                  fontSize: { xs: "8px", sm: styles.typography.fontSize.sm },
                  minWidth: { xs: 14, sm: 20 },
                  height: { xs: 14, sm: 20 },
                },
              }}
            >
              <ShoppingCart sx={{ fontSize: { xs: 14, sm: 18 }, color: styles.colors.white }} />
            </Badge>
          </IconButton>

          <IconButton
            onClick={onHistoryClick}
            sx={{
              ...styles.components.iconContainer.secondary,
              width: { xs: 32, sm: 44 },
              height: { xs: 32, sm: 44 },
              p: { xs: styles.spacing(0.75), sm: styles.spacing(1.5) },
              transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
              "&:hover": {
                transform: "scale(1.15)",
                boxShadow: styles.shadows.sm,
              },
            }}
          >
            <History sx={{ fontSize: { xs: 14, sm: 18 }, color: styles.colors.white }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;