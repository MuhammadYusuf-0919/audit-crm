import { useState } from "react";
import { Button, Col, Form, Modal } from "antd";
import { EditOutlined } from "@ant-design/icons";
const EditData = ({ selectedRowKeys, onEdit, editData, editModalTitle }) => {
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);

    const onEdited = (values) => {
        onEdit(values, selectedRowKeys);
        setVisible(false);
    };

    const onCancel = () => {
        setVisible(false);
    };

    const initialData = { ...selectedRowKeys };

    return (
        <div>
            <Button
                type="primary"
                onClick={() => {
                    form.setFieldsValue({ ...initialData });
                    setVisible(true);
                }}
                className="add-button"
                icon={<EditOutlined />}
            >
                O'zgartirish
            </Button>
            <Modal
                open={visible}
                title={editModalTitle}
                okText="O'zgartirish"
                cancelText="Bekor qilish"
                width={Object.keys(editData).length > 8 ? 700 : 350}
                onCancel={() => {
                    onCancel();
                }}
                onOk={() => {
                    form.validateFields()
                        .then((values) => {
                            form?.resetFields();
                            onEdited(values);
                        })
                        .catch((info) => {
                            console.error("Validate Failed:", info);
                        });
                }}
            >
                <Form form={form} layout="vertical" name="form_in_modal">
                    {editData?.map((data) => {
                        return (
                            <Col
                                span={
                                    Object.keys(editData).length > 8 ? 12 : 24
                                }
                                key={data.name}
                            >
                                <Form.Item
                                    name={data.name}
                                    key={data.name}
                                    label={data.label}
                                    rules={[
                                        {
                                            required: data.required,
                                            message: `${data.label}ni kiriting`,
                                        },
                                    ]}
                                >
                                    {data.hasOwnProperty("input")
                                        ? data.input
                                        : data.inputSelect(
                                              selectedRowKeys[data.name]
                                          )}
                                </Form.Item>
                            </Col>
                        );
                    })}
                </Form>
            </Modal>
        </div>
    );
};

export default EditData;
