// src/components/Menu.js
import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Modal, Button } from 'antd';
import MenuViewModel from './MenuViewModel';
import Sidebar from './Sidebar';
import MenuItemsDisplay from './MenuItemsDisplay';
import CartView from './CartView';
import Header from './Header';
import BottomNav from './BottomNav';
import ItemDetailsModal from './ItemDetailsModal';

const Menu = () => {
  const {
    menuItems,
    categories,
    selectedItems,
    loading,
    filterCategory,
    searchTerm,
    isModalVisible,
    selectedItem,
    tableId,
    form,
    search,
    filterByCategory,
    addItem,
    showItemDetails,
    incrementItem,
    closeModal,
    clearCart,
    createOrder, // Thêm createOrder
  } = MenuViewModel();

  const [isCartModalVisible, setIsCartModalVisible] = useState(false);

  const handleClearCart = () => {
    clearCart();
    form.resetFields();
  };

  const handleCartClick = () => {
    setIsCartModalVisible(true);
  };

  const handleCartModalClose = () => {
    setIsCartModalVisible(false);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Sidebar
        categories={categories}
        filterCategory={filterCategory}
        handleFilterByCategory={filterByCategory}
      />

      <Box
        sx={{
          flexGrow: 1,
          ml: { xs: '200px', sm: '250px' },
          pt: 10,
          pb: 10,
          px: 4,
        }}
      >
        <Header
          tableId={tableId}
          searchTerm={searchTerm}
          handleSearch={search}
          selectedItems={selectedItems}
          onCartClick={handleCartClick}
        />

        {tableId ? (
          <MenuItemsDisplay
            menuItems={menuItems}
            loading={loading}
            showItemDetails={showItemDetails}
            incrementItem={incrementItem}
          />
        ) : (
          <Typography variant="body1" color="error">
            Không tìm thấy thông tin bàn. Vui lòng truy cập lại.
          </Typography>
        )}

        <BottomNav selectedItems={selectedItems} onCartClick={handleCartClick} />
      </Box>

      {/* Modal chi tiết món */}
      <ItemDetailsModal
        isModalVisible={isModalVisible}
        selectedItem={selectedItem}
        form={form}
        addItem={addItem}
        closeModal={closeModal}
      />

      {/* Modal giỏ hàng */}
      <Modal
        title="Giỏ hàng"
        open={isCartModalVisible}
        onCancel={handleCartModalClose}
        footer={[
          <Button key="close" onClick={handleCartModalClose}>
            Đóng
          </Button>,
        ]}
      >
        <CartView
          selectedItems={selectedItems}
          handleClearCart={handleClearCart}
          showItemDetails={showItemDetails}
          createOrder={createOrder} // Truyền createOrder
        />
      </Modal>
    </Box>
  );
};

export default Menu;