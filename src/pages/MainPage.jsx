import React from 'react';
import { Button } from 'antd';
import { Box, Typography } from '@mui/material';

function MainPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Trang Chủ
      </Typography>
      <Typography variant="body1" gutterBottom>
        Chào mừng bạn đến với EasyDine!
      </Typography>
      <Button type="primary">Khám Phá</Button>
    </Box>
  );
}

export default MainPage;