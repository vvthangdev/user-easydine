export const handleApiResponse = (res) => {
  try {
    const { status, message, data } = res.data; // Lưu ý: axios trả về res.data
    if (status === "SUCCESS") return data;
    throw new Error(message || "Lỗi từ server");
  } catch (error) {
    console.error("Lỗi xử lý phản hồi API:", res);
    throw new Error(error.message || "Phản hồi từ server không đúng định dạng");
  }
};