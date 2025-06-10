import { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { debounce } from "lodash";
import { itemAPI } from "../services/apis/Item";
import { tableAPI } from "../services/apis/Table";

const MenuViewModel = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterCategory, setFilterCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isItemModalVisible, setIsItemModalVisible] = useState(false);
  const [isCartModalVisible, setIsCartModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editItemIndex, setEditItemIndex] = useState(null);
  const [tableInfo, setTableInfo] = useState(null);
  const tableId = localStorage.getItem("tableId");
  const { control, handleSubmit, reset, watch } = useForm({
    defaultValues: { size: "", quantity: 1, note: "" },
  });

  const fetchCategories = async () => {
    try {
      const categoriesData = await itemAPI.getAllCategories();
      setCategories(categoriesData || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Không thể tải danh mục món ăn");
      setCategories([]);
    }
  };

  const fetchTableStatus = async () => {
    if (!tableId) {
      toast.error("Không tìm thấy ID bàn");
      return;
    }

    try {
      const statuses = await tableAPI.getAllTablesStatus();
      const currentTable = statuses.find((table) => table.table_id === tableId);
      if (currentTable) {
        setTableInfo(currentTable);
      } else {
        setTableInfo(null);
        toast.error("Không tìm thấy bàn với ID này");
      }
    } catch (error) {
      console.error("Error fetching table status:", error);
      toast.error("Không thể kiểm tra trạng thái bàn");
      setTableInfo(null);
    }
  };

  const fetchMenuItems = useCallback(
    async (search = "", category = null) => {
      if (!tableId) {
        toast.error("Không tìm thấy ID bàn");
        return;
      }

      setLoading(true);
      try {
        let items;
        if (search) {
          items = await itemAPI.searchItem({ name: search });
        } else if (category && category !== "all") {
          items = await itemAPI.filterItemsByCategory(category);
        } else {
          items = await itemAPI.getAllItem();
        }
        setMenuItems(items.map((item) => ({ ...item, sizes: item.sizes || [] })) || []);
      } catch (error) {
        console.error("Error fetching menu items:", error);
        toast.error("Không thể tải danh sách món ăn");
        setMenuItems([]);
      } finally {
        setLoading(false);
      }
    },
    [tableId]
  );

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
    setSearchTerm("");
    fetchMenuItems("", categoryId);
  };

  const showItemDetails = (item, index = null) => {
    const itemData =
      index !== null
        ? { ...selectedItems[index], sizes: item.sizes || [] }
        : {
            id: item._id || item.id,
            name: item.name,
            price: item.price,
            sizes: item.sizes || [],
          };
    setSelectedItem(itemData);
    setEditItemIndex(index);
    reset({
      size: itemData.size || (itemData.sizes?.length > 0 ? itemData.sizes[0].name : ""),
      quantity: itemData.quantity || 1,
      note: itemData.note || "",
    });
    setIsItemModalVisible(true);
  };

  const addToCart = (data) => {
    if (!selectedItem) {
      toast.error("Không thể thêm món vào giỏ hàng");
      return;
    }

    const { size, quantity, note } = data;
    const itemToAdd = {
      id: selectedItem.id,
      name: selectedItem.name,
      price: selectedItem.sizes.find((s) => s.name === size)?.price || selectedItem.price,
      size: size || undefined,
      quantity: parseInt(quantity, 10) || 1,
      note: note || "",
    };

    if (editItemIndex !== null) {
      const updatedItems = [...selectedItems];
      updatedItems[editItemIndex] = itemToAdd;
      setSelectedItems(updatedItems);
      toast.success(`Đã cập nhật ${itemToAdd.name} trong giỏ hàng!`);
    } else {
      const existingIndex = selectedItems.findIndex(
        (i) => i.id === itemToAdd.id && i.size === itemToAdd.size
      );
      if (existingIndex > -1) {
        const updatedItems = [...selectedItems];
        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          quantity: updatedItems[existingIndex].quantity + itemToAdd.quantity,
          note: note || updatedItems[existingIndex].note,
        };
        setSelectedItems(updatedItems);
      } else {
        setSelectedItems([...selectedItems, itemToAdd]);
      }
      toast.success(`Đã thêm ${itemToAdd.name} vào giỏ hàng!`);
    }

    closeItemModal();
  };

  const addItemDirectly = (item) => {
    const itemToAdd = {
      id: item._id || item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      note: "",
    };

    const existingIndex = selectedItems.findIndex((i) => i.id === itemToAdd.id);
    if (existingIndex > -1) {
      const updatedItems = [...selectedItems];
      updatedItems[existingIndex].quantity += 1;
      setSelectedItems(updatedItems);
    } else {
      setSelectedItems([...selectedItems, itemToAdd]);
    }

    toast.success(`Đã thêm ${itemToAdd.name} vào giỏ hàng!`);
  };

  const updateItemQuantity = (index, newQuantity) => {
    if (newQuantity >= 1) {
      const updatedItems = [...selectedItems];
      updatedItems[index].quantity = newQuantity;
      setSelectedItems(updatedItems);
    }
  };

  const closeItemModal = () => {
    setIsItemModalVisible(false);
    setSelectedItem(null);
    setEditItemIndex(null);
    reset();
  };

  const openCartModal = () => {
    setIsCartModalVisible(true);
  };

  const closeCartModal = () => {
    setIsCartModalVisible(false);
  };

  useEffect(() => {
    if (tableId) {
      fetchMenuItems();
      fetchCategories();
      fetchTableStatus();
    } else {
      toast.error("Vui lòng truy cập qua đường dẫn hợp lệ với ID bàn");
    }
  }, [tableId, fetchMenuItems]);

  return {
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
    handleSubmit: handleSubmit(addToCart),
    reset,
    search,
    filterByCategory,
    showItemDetails,
    incrementItem: (item) =>
      item.sizes.length > 0 ? showItemDetails(item) : addItemDirectly(item),
    updateItemQuantity,
    closeItemModal,
    openCartModal,
    closeCartModal,
  };
};

export default MenuViewModel;