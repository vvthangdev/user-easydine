// src/components/Menu.js
import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Modal, Button, Form, Input, Select } from 'antd';
import MenuViewModel from './MenuViewModel';
import Sidebar from './Sidebar';
import MenuItemsDisplay from './MenuItemsDisplay';
import CartView from './CartView';
import Header from './Header';
import BottomNav from './BottomNav';

const { Option } = Select;

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
    closeModal,
    clearCart,
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
          pt: 10, // Padding-top cho header
          pb: 10, // Padding-bottom cho bottom navigation
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
          />
        ) : (
          <Typography variant="body1" color="error">
            Không tìm thấy thông tin bàn. Vui lòng truy cập lại.
          </Typography>
        )}

        <BottomNav selectedItems={selectedItems} onCartClick={handleCartClick} />
      </Box>

      {/* Modal thêm món */}
      <Modal
        title={`Thêm ${selectedItem?.name}`}
        open={isModalVisible}
        onCancel={closeModal}
        footer={null}
      >
        <Form form={form} onFinish={addItem} layout="vertical">
          {selectedItem?.sizes.length > 0 && (
            <Form.Item
              name="size"
              label="Kích thước"
              rules={[{ required: true, message: 'Vui lòng chọn kích thước' }]}
            >
              <Select placeholder="Chọn kích thước">
                {selectedItem.sizes.map((size) => (
                  <Option key={size._id} value={size.name}>
                    {size.name} ({size.price.toLocaleString()} VNĐ)
                  </Option>
                ))}
              </Select>
            </Form.Item>
          )}
          <Form.Item
            name="quantity"
            label="Số lượng"
            initialValue={1}
            rules={[{ required: true, message: 'Vui lòng nhập số lượng' }]}
          >
            <Input type="number" min={1} />
          </Form.Item>
          <Form.Item name="note" label="Ghi chú">
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Thêm món
            </Button>
            <Button onClick={closeModal} style={{ marginLeft: 8 }}>
              Hủy
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal giỏ hàng */}
      <Modal
        title="Giỏ hàng"
        open={isCartModalVisible}
        onCancel={handleCartModalClose}
        footer={[
          <Button key="clear" type="danger" onClick={handleClearCart}>
            Xóa giỏ hàng
          </Button>,
          <Button key="close" onClick={handleCartModalClose}>
            Đóng
          </Button>,
        ]}
      >
        <CartView selectedItems={selectedItems} handleClearCart={handleClearCart} />
      </Modal>
    </Box>
  );
};

export default Menu;