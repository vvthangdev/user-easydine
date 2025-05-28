import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const MenuRedirect = () => {
  const { id } = useParams(); // Lấy id từ URL (ví dụ: 683689e1a31421720ca7c41d)
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      localStorage.setItem('tableId', id); // Lưu tableId vào localStorage
      navigate('/menu', { replace: true }); // Redirect về /menu
    }
  }, [id, navigate]);

  return null;
};

export default MenuRedirect;