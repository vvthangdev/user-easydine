import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Rating, Box, Typography } from '@mui/material';
import { useAppleStyles } from '../theme/theme-hooks.js';
import { orderAPI } from '../services/apis/Order.js';
import { toast } from 'react-toastify';

const RatingModal = ({ open, onClose, orderId, ratingPin }) => {
  const styles = useAppleStyles();
  const [star, setStar] = React.useState(0);
  const [comment, setComment] = React.useState('');

  const handleSubmit = async () => {
    try {
      if (!orderId) {
        toast.error('Không tìm thấy ID đơn hàng để đánh giá!');
        return;
      }
      if (!star || star < 1 || star > 5) {
        toast.error('Vui lòng chọn số sao từ 1 đến 5!');
        return;
      }
      if (comment.length > 255) {
        toast.error('Bình luận không được vượt quá 255 ký tự!');
        return;
      }
      if (!ratingPin) {
        toast.error('Không tìm thấy mã đánh giá! Vui lòng kiểm tra lại thông tin đơn hàng.');
        return;
      }

      const response = await orderAPI.rateOrder({
        order_id: orderId,
        star,
        comment: comment || null,
        rating_pin: ratingPin,
      });
      console.log(`vvt check respone: `, response)
    //   if (error) {
        
    //     toast.error(message); // Hiển thị message từ server, ví dụ: "Order has already been rated!"
    //     return;
    //   }

      toast.success('Đánh giá đơn hàng thành công!');
      onClose();
      setStar(0);
      setComment('');
    } catch (error) {
        console.log(`vt check respone: `,  error.response.data.message)
      toast.error(error.response.data.message || 'Đánh giá thất bại. Vui lòng thử lại.');
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: styles.rounded('modal'),
          boxShadow: styles.shadow('2xl'),
          background: styles.colors.background.paper,
          maxWidth: '90vw',
          maxHeight: '90vh',
        },
      }}
    >
      <DialogTitle
        sx={{
          background: styles.gradientBg('primary'),
          color: styles.colors.white,
          fontWeight: styles.typography.fontWeight.semibold,
        }}
      >
        Đánh giá đơn hàng
      </DialogTitle>
      <DialogContent sx={{ p: styles.spacing(3) }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: styles.spacing(2) }}>
          <Typography variant="body1">Chọn số sao:</Typography>
          <Rating
            value={star}
            onChange={(event, newValue) => setStar(newValue)}
            precision={1}
            size="large"
          />
          <TextField
            label="Bình luận (tùy chọn)"
            multiline
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            variant="outlined"
            fullWidth
            inputProps={{ maxLength: 255 }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          sx={{
            color: styles.colors.text.secondary,
            textTransform: 'none',
          }}
        >
          Hủy
        </Button>
        <Button
          onClick={handleSubmit}
          sx={{
            background: styles.gradients.primary,
            color: styles.colors.white,
            textTransform: 'none',
            '&:hover': {
              background: styles.gradients.primaryHover,
            },
          }}
        >
          Gửi đánh giá
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RatingModal;