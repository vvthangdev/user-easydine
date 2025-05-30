// src/components/ItemDetailsModal.js
import React from 'react';
import { Modal, Button, Form, Input, Select } from 'antd';

const { Option } = Select;

const ItemDetailsModal = ({ isModalVisible, selectedItem, form, addItem, closeModal }) => {
  return (
    <Modal
      title={`Thêm ${selectedItem?.name}`}
      open={isModalVisible}
      onCancel={closeModal}
      footer={null}
    >
      <Form form={form} onFinish={addItem} layout="vertical">
        {selectedItem?.sizes.length > 0 && (
          <Form.Item
            name="size"
            label="Kích thước"
            rules={[{ required: true, message: 'Vui lòng chọn kích thước' }]}
          >
            <Select placeholder="Chọn kích thước">
              {selectedItem.sizes.map((size) => (
                <Option key={size._id} value={size.name}>
                  {size.name} ({size.price.toLocaleString()} VNĐ)
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}
        <Form.Item
          name="quantity"
          label="Số lượng"
          initialValue={1}
          rules={[{ required: true, message: 'Vui lòng nhập số lượng' }]}
        >
          <Input type="number" min={1} />
        </Form.Item>
        <Form.Item name="note" label="Ghi chú">
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Thêm món
          </Button>
          <Button onClick={closeModal} style={{ marginLeft: 8 }}>
            Hủy
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ItemDetailsModal;