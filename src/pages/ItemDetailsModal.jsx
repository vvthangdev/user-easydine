import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Box,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { useAppleStyles } from "../theme/theme-hooks.js";

const ItemDetailsModal = ({
  isModalVisible,
  selectedItem,
  control,
  handleSubmit, // Được truyền từ MenuViewModel
  reset,
  closeModal,
}) => {
  const styles = useAppleStyles();

  // Kiểm tra an toàn cho selectedItem
  if (!selectedItem) {
    return null; // Không render modal nếu selectedItem là null hoặc undefined
  }

  return (
    <Dialog
      open={isModalVisible}
      onClose={closeModal}
      PaperProps={{
        sx: {
          borderRadius: styles.borderRadius.modal,
          boxShadow: styles.shadows["2xl"],
          background: styles.colors.background.paper,
        },
      }}
    >
      <DialogTitle
        sx={{
          background: styles.gradients.primary,
          color: styles.colors.white,
        }}
      >
        {selectedItem.name || "Chi tiết món"}
      </DialogTitle>
      <DialogContent>
        <Box
          component="form"
          onSubmit={handleSubmit} // Sử dụng trực tiếp handleSubmit
          sx={{ mt: styles.spacing[2] }}
          id="item-details-form"
        >
          {selectedItem.sizes && selectedItem.sizes.length > 0 && (
            <Controller
              name="size"
              control={control}
              rules={{ required: "Vui lòng chọn kích thước" }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  select
                  label="Kích thước"
                  fullWidth
                  margin="normal"
                  error={!!error}
                  helperText={error?.message}
                  sx={styles.input("default")}
                >
                  {selectedItem.sizes.map((size) => (
                    <MenuItem key={size.name} value={size.name}>
                      {size.name} ({size.price.toLocaleString()} VNĐ)
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          )}
          <Controller
            name="quantity"
            control={control}
            rules={{
              required: "Vui lòng nhập số lượng",
              min: { value: 1, message: "Số lượng phải lớn hơn 0" },
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                type="number"
                label="Số lượng"
                fullWidth
                margin="normal"
                error={!!error}
                helperText={error?.message}
                sx={styles.input("default")}
              />
            )}
          />
          <Controller
            name="note"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Ghi chú"
                multiline
                rows={3}
                fullWidth
                margin="normal"
                sx={styles.input("default")}
              />
            )}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal} sx={styles.button("outline")}>
          Hủy
        </Button>
        <Button type="submit" form="item-details-form" sx={styles.button("primary")}>
          Thêm vào giỏ hàng
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ItemDetailsModal;