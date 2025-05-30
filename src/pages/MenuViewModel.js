// src/viewModels/MenuViewModel.js
import { useEffect, useState, useCallback } from 'react';
import { message, Form } from 'antd';
import { itemAPI } from '../services/apis/Item';
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
      setMenuItems(items || []);
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

  const addItem = (values) => {
    const itemData = {
      id: selectedItem.id,
      name: selectedItem.name,
      size: values.size || null,
      price: values.size
        ? selectedItem.sizes.find((s) => s.name === values.size)?.price || selectedItem.price
        : selectedItem.price,
      quantity: values.quantity || 1,
      note: values.note || '',
    };

    setSelectedItems((prev) => {
      const existing = prev.find(
        (item) => item.id === itemData.id && item.size === itemData.size
      );
      if (existing) {
        return prev.map((item) =>
          item.id === itemData.id && item.size === itemData.size
            ? { ...item, quantity: item.quantity + itemData.quantity, note: itemData.note }
            : item
        );
      }
      return [...prev, itemData];
    });
    setIsModalVisible(false);
    setSelectedItem(null);
    form.resetFields();
    toast.success(`Đã thêm ${itemData.name} vào danh sách`);
  };

  const showItemDetails = (item) => {
    setSelectedItem({
      id: item._id,
      name: item.name,
      price: item.price,
      sizes: item.sizes || [],
    });
    setIsModalVisible(true);
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
    closeModal,
    clearCart,
  };
};

export default MenuViewModel;