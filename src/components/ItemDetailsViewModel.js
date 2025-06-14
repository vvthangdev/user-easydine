import { toast } from "react-toastify";

const ItemDetailsViewModel = (selectedItem, reset, closeModal) => {
  const onSubmit = (data) => {
    if (!selectedItem) {
      toast.error("Không thể thêm món vào giỏ hàng");
      return;
    }

    // Logic này đã được xử lý trong MenuViewModel qua handleSubmit, nên chỉ đóng modal
    closeModal();
    reset();
    toast.success(`Đã thêm ${selectedItem.name} vào giỏ hàng!`);
  };

  return { onSubmit };
};

export default ItemDetailsViewModel;