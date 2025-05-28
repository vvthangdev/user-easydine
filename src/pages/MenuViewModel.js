import { useEffect, useState, useCallback } from 'react';
import { message, Form } from 'antd';
import { itemAPI } from '../services/apis/Item';
import { toast } from 'react-toastify';
import { debounce } from 'lodash';

const useMenuViewModel = () => {
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

  // Hàm lấy danh sách danh mục
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

  // Hàm lấy danh sách món ăn
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

  // Debounce tìm kiếm
  const debouncedFetchMenuItems = useCallback(
    debounce((search, category) => {
      fetchMenuItems(search, category);
    }, 500),
    [fetchMenuItems]
  );

  // Xử lý tìm kiếm
  const handleSearch = (value) => {
    setSearchTerm(value);
    debouncedFetchMenuItems(value, filterCategory);
  };

  // Lọc theo danh mục
  const handleFilterByCategory = (categoryId) => {
    setFilterCategory(categoryId);
    setSearchTerm(''); // Reset searchTerm khi chọn danh mục
    fetchMenuItems('', categoryId);
  };

  // Thêm món vào danh sách chọn
  const handleAddItem = (values) => {
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

  // Hiển thị modal chi tiết món
  const showItemDetails = (item) => {
    setSelectedItem({
      id: item._id,
      name: item.name,
      price: item.price,
      sizes: item.sizes || [],
    });
    setIsModalVisible(true);
  };

  // Đóng modal
  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedItem(null);
    form.resetFields();
  };

  // Khởi tạo dữ liệu
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
    handleSearch,
    handleFilterByCategory,
    handleAddItem,
    showItemDetails,
    handleModalClose,
  };
};

export default useMenuViewModel;