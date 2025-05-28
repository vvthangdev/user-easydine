import React from 'react';
import { message, Input, Modal, Button, Form, Input as AntdInput, Select } from 'antd';
import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Divider,
  IconButton,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { toast } from 'react-toastify';
import MenuViewModel from './MenuViewModel';

const { Search } = Input;
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
    handleSearch,
    handleFilterByCategory,
    handleAddItem,
    showItemDetails,
    handleModalClose,
  } = MenuViewModel();

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      {/* Sidebar danh mục bên trái */}
      <Box
        sx={{
          width: { xs: 200, sm: 250 },
          backgroundColor: '#fff',
          boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          overflowY: 'auto',
          p: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, pl: 1 }}>
          Danh mục
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <List>
          <ListItem disablePadding>
            <ListItemButton
              selected={filterCategory === 'all'}
              onClick={() => handleFilterByCategory('all')}
              sx={{
                borderRadius: 1,
                py: 1.5,
                '&.Mui-selected': {
                  backgroundColor: '#1976d2',
                  color: '#fff',
                  '&:hover': { backgroundColor: '#1565c0' },
                },
                '&:hover': { backgroundColor: '#e3f2fd' },
              }}
            >
              <ListItemText primary="Tất cả" />
            </ListItemButton>
          </ListItem>
          {categories.map((category) => (
            <ListItem key={category._id} disablePadding>
              <ListItemButton
                selected={filterCategory === category._id}
                onClick={() => handleFilterByCategory(category._id)}
                sx={{
                  borderRadius: 1,
                  py: 1.5,
                  '&.Mui-selected': {
                    backgroundColor: '#1976d2',
                    color: '#fff',
                    '&:hover': { backgroundColor: '#1565c0' },
                  },
                  '&:hover': { backgroundColor: '#e3f2fd' },
                }}
              >
                <ListItemText primary={category.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Nội dung chính bên phải */}
      <Box sx={{ flexGrow: 1, ml: { xs: '200px', sm: '250px' }, p: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
          Menu cho bàn {tableId}
        </Typography>

        {tableId ? (
          <>
            {/* Thanh tìm kiếm */}
            <Box sx={{ mb: 4, maxWidth: 400 }}>
              <Search
                placeholder="Tìm kiếm món ăn"
                onSearch={handleSearch}
                onChange={(e) => handleSearch(e.target.value)}
                value={searchTerm}
                allowClear
                style={{ width: '100%' }}
              />
            </Box>

            {/* Danh sách món ăn */}
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
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
                        overflow: 'hidden',
                        transition: 'transform 0.2s',
                        '&:hover': {
                          transform: 'scale(1.02)',
                          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                        },
                        width: '100%',
                        maxWidth: 400,
                        height: 400,
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <Box sx={{ height: 200, overflow: 'hidden' }}>
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/200';
                          }}
                        />
                      </Box>
                      <Box
                        sx={{
                          p: 2,
                          flexGrow: 1,
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Box>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 'bold',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {item.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: 'bold', color: '#d32f2f' }}
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
                                  {index < item.sizes.length - 1 ? ', ' : ''}
                                </Typography>
                              ))}
                            </>
                          )}
                          <Typography variant="body2" sx={{ mt: 1 }}>
                            Danh mục:{' '}
                            {item.categories.length > 0
                              ? item.categories.map((cat) => cat.name).join(', ')
                              : 'Không có'}
                          </Typography>
                          {item.description && (
                            <Typography
                              variant="body2"
                              sx={{
                                mt: 1,
                                color: '#555',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                              }}
                            >
                              Mô tả: {item.description}
                            </Typography>
                          )}
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                          <IconButton
                            color="primary"
                            onClick={() => showItemDetails(item)}
                            sx={{ fontSize: '2rem' }}
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
        ) : (
          <Typography variant="body1" color="error">
            Không tìm thấy thông tin bàn. Vui lòng truy cập lại.
          </Typography>
        )}
      </Box>

      {/* Modal chọn món */}
      <Modal
        title={`Thêm ${selectedItem?.name}`}
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
      >
        <Form form={form} onFinish={handleAddItem} layout="vertical">
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
            <AntdInput type="number" min={1} />
          </Form.Item>
          <Form.Item name="note" label="Ghi chú">
            <AntdInput.TextArea rows={3} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Thêm món
            </Button>
            <Button onClick={handleModalClose} style={{ marginLeft: 8 }}>
              Hủy
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Box>
  );
};

export default Menu;