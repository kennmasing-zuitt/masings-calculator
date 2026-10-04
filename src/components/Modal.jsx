// app/components/NumberModal.jsx
'use client';

import { useState } from 'react';
import { Button, Modal, Form, InputNumber, message, Col } from 'antd';
import { useDispatch } from 'react-redux'
import {
  productPressed,
  operatorPressed,
  equalsPressed,
  clearPressed,
  submitPressed,
} from '@/lib/features/calculator/pbbBbkCalculatorSlice'

export default function NumberModal({ product, onClose, onSubmit }) {
    const dispatch = useDispatch()

    const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleClickProductButton = (key) => {
    console.log("OPEN MODAL", key)
    setOpen(true)
    dispatch(productPressed(key))
  }

  const handleSubmit = async (values) => {
    console.log("VALUES", values)
    setLoading(true);
    try {
      // Replace with your API call
    //   await new Promise((r) => setTimeout(r, 800));

        dispatch(submitPressed(values.quantity))

      message.success(`Submitted: ${values.quantity}`);
      form.resetFields();
      setOpen(false);
    } catch (error) {
        console.log("ERROR", error)
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setOpen(false);
  };

  {/* <button key={foundProduct?.key} className={foundProduct?.key === '0' ? 'key key--zero' : 'key'} onClick={() => handleOpenModal(foundProduct?.key)}>
    {foundProduct?.label}
  </button> */}

  return (
    <>
        <Col span={4}>
        
            <button key={product?.key} className={product?.key === '0' ? 'key key--zero' : 'key'} onClick={() => handleClickProductButton(product?.key)}>
                {product?.label}
            </button>
        </Col>

      <Modal
        title="Enter a Number"
        open={open}
        onOk={() => form.submit()} // triggers validation, then onFinish
        onCancel={handleCancel}
        okText="Submit"
        cancelText="Cancel"
        confirmLoading={loading}
        // forceRender // keeps the form instance connected
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[{ required: true, message: 'Please enter a number' }]}
          >
            <InputNumber min={0} style={{ width: '100%' }} placeholder="e.g. 10" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}