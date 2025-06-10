import React, { useState } from "react";
import { Box, Typography, Dialog, DialogTitle, DialogContent } from "@mui/material";
import { useAppleStyles } from "../theme/theme-hooks.js";
import MenuViewModel from "./MenuViewModel.js";
import Sidebar from "./Sidebar.jsx";
import Header from "./Header.jsx";
import MenuItemsDisplay from "./MenuItemsDisplay.jsx";
import BottomNav from "./BottomNav.jsx";
import ItemDetailsModal from "./ItemDetailsModal.jsx";
import CartView from "./CartView.jsx";
import OrderHistory from "./OrderHistory.jsx";

const Menu = () => {
  const styles = useAppleStyles();
  const [isHistoryModalVisible, setIsHistoryModalVisible] = useState(false);

  const {
    menuItems,
    categories,
    selectedItems,
    setSelectedItems,
    loading,
    filterCategory,
    searchTerm,
    isItemModalVisible,
    isCartModalVisible,
    selectedItem,
    tableInfo,
    control,
    handleSubmit,
    reset,
    search,
    filterByCategory,
    showItemDetails,
    incrementItem,
    updateItemQuantity,
    closeItemModal,
    openCartModal,
    closeCartModal,
  } = MenuViewModel();

  const openHistoryModal = () => {
    setIsHistoryModalVisible(true);
  };

  const closeHistoryModal = () => {
    setIsHistoryModalVisible(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        background: styles.gradientBg("light"),
      }}
    >
      <Header
        tableInfo={tableInfo}
        searchTerm={searchTerm}
        handleSearch={search}
        selectedItems={selectedItems}
        onCartClick={openCartModal}
        onHistoryClick={openHistoryModal}
      />
      <Box sx={{ display: "flex", flexGrow: 1, minHeight: 0 }}>
        {categories && (
          <Sidebar
            categories={categories}
            filterCategory={filterCategory}
            handleFilterByCategory={filterByCategory}
          />
        )}
        <Box
          sx={{
            flexGrow: 1,
            width: { xs: "75%", sm: "75%" }, // Đảm bảo chiếm phần còn lại
            ml: { xs: "25%", sm: "25%" }, // Tạo khoảng cách bên trái để tránh bị Sidebar che
            pt: styles.spacing(2),
            pb: styles.spacing(12),
            px: { xs: styles.spacing(2), sm: styles.spacing(4) },
            overflowY: "auto", // Chỉ phần này cuộn
          }}
        >
          {tableInfo ? (
            <MenuItemsDisplay
              menuItems={menuItems}
              loading={loading}
              showItemDetails={showItemDetails}
              incrementItem={incrementItem}
            />
          ) : (
            <Typography
              variant="body1"
              sx={{
                color: styles.colors.error,
                fontSize: styles.typography.fontSize.base,
                textAlign: "center",
                mt: styles.spacing(8),
              }}
            >
              Không tìm thấy thông tin bàn. Vui lòng truy cập lại.
            </Typography>
          )}
        </Box>
      </Box>
      <BottomNav selectedItems={selectedItems} onCartClick={openCartModal} />

      <ItemDetailsModal
        isModalVisible={isItemModalVisible}
        selectedItem={selectedItem}
        control={control}
        handleSubmit={handleSubmit}
        reset={reset}
        closeModal={closeItemModal}
      />

      <Dialog
        open={isCartModalVisible}
        onClose={closeCartModal}
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
            background: styles.gradientBg("primary"),
            color: styles.colors.white,
            fontWeight: styles.typography.fontWeight.semibold,
          }}
        >
          Giỏ hàng
        </DialogTitle>
        <DialogContent>
          <CartView
            selectedItems={selectedItems}
            onItemUpdate={setSelectedItems}
            onShowDetails={showItemDetails}
            orderId={tableInfo?.reservation_id}
          />
        </DialogContent>
      </Dialog>

      <OrderHistory
        tableId={tableInfo?.table_id}
        open={isHistoryModalVisible}
        onClose={closeHistoryModal}
      />
    </Box>
  );
};

export default Menu;