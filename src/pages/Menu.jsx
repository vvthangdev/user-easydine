import React, { useState } from "react";
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { useAppleStyles } from "../theme/theme-hooks.js";
import MenuViewModel from "./MenuViewModel.js";
import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/Header.jsx";
import MenuItemsDisplay from "./MenuItemsDisplay.jsx";
import BottomNav from "../components/BottomNav.jsx";
import ItemDetailsModal from "../components/ItemDetailsModal.jsx";
import CartView from "../components/CartView.jsx";
import OrderHistory from "../components/OrderHistory.jsx";
import RatingModal from "../components/RatingModal.jsx";

const Menu = () => {
  const styles = useAppleStyles();
  const [isHistoryModalVisible, setIsHistoryModalVisible] = useState(false);
  const [isRatingModalVisible, setIsRatingModalVisible] = useState(false);

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

  const openRatingModal = () => {
    setIsRatingModalVisible(true);
  };

  const closeRatingModal = () => {
    setIsRatingModalVisible(false);
  };

  // Lấy rating_pin từ localStorage (giả định lưu sau khi gọi createTableOrder)
  const ratingPin = localStorage.getItem("ratingPin");
  console.log(`vvt check table info in menu jsx: `, tableInfo)

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
            onRateClick={openRatingModal}
          />
        )}
        <Box
          sx={{
            flexGrow: 1,
            width: { xs: "75%", sm: "75%" },
            ml: { xs: "25%", sm: "25%" },
            pt: styles.spacing(2),
            pb: styles.spacing(12),
            px: { xs: styles.spacing(2), sm: styles.spacing(4) },
            overflowY: "auto",
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
            onCloseCart={closeCartModal}
          />
        </DialogContent>
      </Dialog>

      <OrderHistory
        tableId={tableInfo?.table_id}
        open={isHistoryModalVisible}
        onClose={closeHistoryModal}
      />

      <RatingModal
        open={isRatingModalVisible}
        onClose={closeRatingModal}
        orderId={tableInfo?.reservation_id}
        ratingPin={ratingPin}
      />
    </Box>
  );
};

export default Menu;