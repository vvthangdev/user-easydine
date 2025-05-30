// src/viewModels/MenuViewModel.js
import { useEffect, useState, useCallback } from 'react';
import { message, Form } from 'antd';
import { itemAPI } from '../services/apis/Item';
import { orderAPI } from '../services/apis/Order'; // Import orderAPI
import { toast } from 'react-toastify';
import { debounce } from 'lodash';

const MenuViewModel = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterCategory, setFilterCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const tableId = localStorage.getItem('tableId');
  const [form] = Form.useForm();

  const fetchCategories = async () => {
    try {
      const categoriesData = await itemAPI.getAllCategories();
      setCategories(categoriesData || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Không thể tải danh mục món ăn');
      setCategories([]);
    }
  };

  const fetchMenuItems = useCallback(async (search = '', category = null) => {
    if (!tableId) {
      message.error('Không tìm thấy ID bàn');
      return;
    }

    setLoading(true);
    try {
      let items;
      if (search) {
        items = await itemAPI.searchItem({ name: search });
      } else if (category && category !== 'all') {
        items = await itemAPI.filterItemsByCategory(category);
      } else {
        items = await itemAPI.getAllItem();
      }
      setMenuItems(items.map(item => ({ ...item, sizes: item.sizes || [] })) || []);
    } catch (error) {
      console.error('Error fetching menu items:', error);
      toast.error('Không thể tải danh sách món ăn');
      setMenuItems([]);
    } finally {
      setLoading(false);
    }
  }, [tableId]);

  const debouncedFetchMenuItems = useCallback(
    debounce((search, category) => {
      fetchMenuItems(search, category);
    }, 500),
    [fetchMenuItems]
  );

  const search = (value) => {
    setSearchTerm(value);
    debouncedFetchMenuItems(value, filterCategory);
  };

  const filterByCategory = (categoryId) => {
    setFilterCategory(categoryId);
    setSearchTerm('');
    fetchMenuItems('', categoryId);
  };

  const addItem = (values, itemData) => {
    console.log('Adding item with values:', values, 'Item data:', itemData); // Debugging
    const item = itemData || selectedItem;
    if (!item) {
      console.error('No item data available to add');
      toast.error('Không thể thêm món vào giỏ hàng');
      return;
    }

    const newItem = {
      id: item.id,
      name: item.name,
      size: values.size || null,
      price: values.size
        ? item.sizes.find((s) => s.name === values.size)?.price || item.price
        : item.price,
      quantity: values.quantity || 1,
      note: values.note || '',
    };

    setSelectedItems((prev) => {
      console.log('Updating selectedItems:', prev, newItem); // Debugging
      const existingIndex = prev.findIndex(
        (i) => i.id === newItem.id && i.size === newItem.size
      );
      if (existingIndex !== -1) {
        const updatedItems = [...prev];
        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          quantity: updatedItems[existingIndex].quantity + newItem.quantity,
          note: newItem.note || updatedItems[existingIndex].note,
        };
        return updatedItems;
      }
      return [...prev, newItem];
    });

    setIsModalVisible(false);
    setSelectedItem(null);
    form.resetFields();
    toast.success(`Đã cập nhật ${newItem.name} trong giỏ hàng`);
  };

  const incrementItem = (item) => {
    console.log('Incrementing item:', item); // Debugging
    const itemData = {
      id: item._id || item.id,
      name: item.name,
      price: item.sizes?.length > 0 ? item.sizes[0].price : item.price,
      sizes: item.sizes || [],
      size: item.sizes?.length > 0 ? item.sizes[0].name : null,
    };

    addItem({ quantity: 1, note: '' }, itemData);
  };

  const showItemDetails = (item) => {
    const itemData = {
      id: item._id || item.id,
      name: item.name,
      price: item.price,
      sizes: item.sizes || [],
    };
    console.log('showItemDetails called for:', itemData); // Debugging
    setSelectedItem(itemData);

    // Điền sẵn thông tin vào form
    form.setFieldsValue({
      size: item.size || (itemData.sizes?.length > 0 ? itemData.sizes[0].name : undefined),
      quantity: item.quantity || 1,
      note: item.note || '',
    });

    setIsModalVisible(true);
  };

  const createOrder = async () => {
    if (!tableId) {
      toast.error('Không tìm thấy ID bàn');
      return;
    }

    if (selectedItems.length === 0) {
      toast.error('Giỏ hàng trống, vui lòng thêm món');
      return;
    }

    const currentTime = new Date();
    const endTime = new Date(currentTime.getTime() + 2 * 60 * 60 * 1000); // +2 giờ

    const payload = {
      start_time: currentTime.toISOString(),
      end_time: endTime.toISOString(),
      tables: [tableId],
      items: selectedItems.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        size: item.size || undefined,
        note: item.note || undefined,
      })),
      status: 'pending',
      payment_method: 'cash',
    };

    try {
      console.log('Creating order with payload:', payload); // Debugging
      const response = await orderAPI.createTableOrder(payload);
      toast.success('Đặt hàng thành công!');
      setSelectedItems([]); // Xóa giỏ hàng sau khi đặt hàng
      form.resetFields();
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Không thể đặt hàng, vui lòng thử lại');
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedItem(null);
    form.resetFields();
  };

  const clearCart = () => {
    setSelectedItems([]);
    toast.success('Đã xóa giỏ hàng');
  };

  useEffect(() => {
    if (tableId) {
      fetchMenuItems();
      fetchCategories();
    } else {
      message.error('Vui lòng truy cập qua đường dẫn hợp lệ với ID bàn');
    }
  }, [tableId, fetchMenuItems]);

  return {
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
    createOrder,
  };
};

export default MenuViewModel;