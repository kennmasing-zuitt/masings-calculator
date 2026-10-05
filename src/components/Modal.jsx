// app/components/NumberModal.jsx
"use client";

import { useState, useEffect } from "react";
import { Button, Modal, Form, InputNumber, message, Col } from "antd";
import { useDispatch } from "react-redux";
import {
    productPressed,
    operatorPressed,
    equalsPressed,
    clearPressed,
    submitPressed,
} from "@/lib/features/calculator/pbbBbkCalculatorSlice";
import { useSelector } from "react-redux";
import { selectHistory } from "@/lib/features/calculator/pbbBbkCalculatorSlice";
import { isEmpty } from "lodash";

export default function NumberModal({ product, onClose, onSubmit, span }) {
    const dispatch = useDispatch();

    const history = useSelector(selectHistory);

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const handleClickProductButton = (key) => {
        setOpen(true);
        dispatch(productPressed(key));
    };

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            // Replace with your API call
            //   await new Promise((r) => setTimeout(r, 800));

            dispatch(submitPressed(values.quantity));

            message.success(`Submitted: ${values.quantity}`);
            form.resetFields();
            setOpen(false);
        } catch (error) {
            console.log("ERROR", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        form.resetFields();
        setOpen(false);
    };

    {
        /* <button key={foundProduct?.key} className={foundProduct?.key === '0' ? 'key key--zero' : 'key'} onClick={() => handleOpenModal(foundProduct?.key)}>
    {foundProduct?.label}
  </button> */
    }

    const productFound = history.find((e) => e.product === product?.key);

    const value = `${productFound?.quantity}`;

    useEffect(() => {
        form.setFieldsValue({
            quantity: !isEmpty(productFound)
                ? productFound.quantity
                : undefined,
        });
    }, [productFound]);

    return (
        <>
            <Col span={span}>
                <button
                    style={{ width: "100%" }}
                    key={product?.key}
                    className="key pbb__bbk"
                    onClick={() => handleClickProductButton(product?.key)}
                >
                    {product?.label}
                </button>
            </Col>

            <Modal
                title={product?.label}
                open={open}
                onOk={() => form.submit()} // triggers validation, then onFinish
                onCancel={handleCancel}
                okText="Submit"
                cancelText="Cancel"
                confirmLoading={loading}
                mask={{ closable: false }}
            >
                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                    <Form.Item
                        label="Quantity"
                        name="quantity"
                        rules={[
                            {
                                required: true,
                                message: "Please enter a number",
                            },
                        ]}
                    >
                        <InputNumber
                            min={0}
                            style={{ width: "100%" }}
                            className={`defaultValue ${isEmpty(productFound) ? value : ""}`}
                            // placeholder={isEmpty(productFound) ? "e.g. 10" : productFound.quantity}
                            placeholder="e.g. 10"
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}
