import { toast } from "react-toastify";
import { orderAPI } from "../services/apis/Order";

const CartViewModel = (selectedItems, onItemUpdate, orderId, onCloseCart) => {
  const tableId = localStorage.getItem("tableId");

  const updateItemQuantity = (index, newQuantity) => {
    if (newQuantity >= 1) {
      selectedItems[index].quantity = newQuantity;
      onItemUpdate([...selectedItems]);
    }
  };

  const removeItem = (index) => {
    const updatedItems = selectedItems.filter((_, i) => i !== index);
    onItemUpdate(updatedItems);
    toast.success("Đã xóa món ăn khỏi giỏ hàng");
  };

  const createOrder = async (guestInfo = {}) => {
    if (!tableId) {
      toast.error("Không tìm thấy ID bàn");
      return;
    }

    if (selectedItems.length === 0) {
      toast.error("Giỏ hàng trống, vui lòng thêm món");
      return;
    }

    const payload = {
      tables: [tableId],
      items: selectedItems.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        size: item.size || undefined,
        note: item.note || undefined,
      })),
      status: "pending",
      payment_method: "cash",
    };

    try {
      if (orderId) {
        // Bàn đang được phục vụ, thêm món vào đơn hàng hiện tại
        const addItemsPayload = {
          order_id: orderId,
          items: payload.items,
        };
        console.log("Adding items to order with payload:", addItemsPayload);
        await orderAPI.addItemsToOrder(addItemsPayload);
        toast.success("Đã thêm món vào đơn hàng!");
      } else {
        // Bàn trống, tạo đơn hàng mới
        const currentTime = new Date();
        const endTime = new Date(currentTime.getTime() + 2 * 60 * 60 * 1000);
        payload.start_time = currentTime.toISOString();
        payload.end_time = endTime.toISOString();
        if (guestInfo && (guestInfo.name || guestInfo.phone || guestInfo.email)) {
          payload.guest_info = {
            name: guestInfo.name || undefined,
            phone: guestInfo.phone || undefined,
            email: guestInfo.email || undefined,
          };
        }
        console.log("Creating order with payload:", payload);
        const response = await orderAPI.createTableOrder(payload);
        console.log("Response order with payload:", response);
        localStorage.setItem("ratingPin", response.rating_pin);
        toast.success("Đặt hàng thành công!");
        
      }
      selectedItems.length = 0;
      onItemUpdate([]);
      onCloseCart()
    } catch (error) {
      console.error("Error processing order:", error);
      toast.error("Không thể xử lý đơn hàng, vui lòng thử lại");
    }
  };

  return {
    createOrder,
    updateItemQuantity,
    removeItem,
  };
};

export default CartViewModel;