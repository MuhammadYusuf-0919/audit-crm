import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Col,
    message,
    Button,
    Form,
    Modal,
    List,
    Input,
    Row,
    Space,
    Select,
} from "antd";
import instance from "../../Api/Axios";
import { PlusOutlined } from "@ant-design/icons";
import { useData } from "../../Hooks/UseData";
import CustomSelect from "../../Modules/Select/Select";

const { Option } = Select;

const AddData = ({ onCreate }) => {
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const { provinceData } = useData();
    const onCreatee = (values) => {
        onCreate(values);
        setVisible(false);
    };

    const onCancel = () => {
        setVisible(false);
    };

    return (
        <div>
            <Button
                type="primary"
                onClick={() => {
                    setVisible(true);
                }}
                className="add-button"
                icon={<PlusOutlined />}
            >
                Qo'shish
            </Button>
            <Modal
                open={visible}
                title={"Yangi filial qo'shish"}
                okText="Qo'shish"
                cancelText="Bekor qilish"
                width={350}
                onCancel={() => {
                    onCancel();
                }}
                onOk={() => {
                    form.validateFields()
                        .then((values) => {
                            form?.resetFields();
                            onCreatee(values);
                        })
                        .catch((info) => {
                            console.error("Validate Failed:", info);
                        });
                }}
            >
                <Form form={form} layout="vertical" name="form_in_modal">
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                name="name"
                                key="name"
                                label="Filial nomi"
                                rules={[
                                    {
                                        required: true,
                                        message: `Filial nomini kiriting`,
                                    },
                                ]}
                            >
                                <Input placeholder="Filial nomini kiriting" />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="code"
                                key="code"
                                label="Filial kodi"
                                rules={[
                                    {
                                        required: true,
                                        message: `Filial kodini kiriting`,
                                    },
                                ]}
                            >
                                <Input placeholder="Filial codini kiriting" />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="address"
                                key="address"
                                label="Filial addressi"
                                rules={[
                                    {
                                        required: true,
                                        message: `Filial addressini kiriting`,
                                    },
                                ]}
                            >
                                <Input placeholder="Filial addressini kiriting" />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="provinceId"
                                key="provinceId"
                                label="Filial joylashgan viloyat"
                                rules={[
                                    {
                                        required: true,
                                        message: `Viloyatni kiriting`,
                                    },
                                ]}
                            >
                                <CustomSelect
                                    backValue={"id"}
                                    selectData={provinceData?.map((item) => {
                                        return {
                                            ...item,
                                            name: item?.province,
                                        };
                                    })}
                                    placeholder="Viloyatni kiriting"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div>
    );
};

const App = ({ branches }) => (
    <List
        itemLayout="horizontal"
        dataSource={branches}
        renderItem={(item) => (
            <List.Item>
                <div>
                    <h3 style={{ fontSize: 22, fontWeight: 400 }}>
                        {item?.name}
                    </h3>
                    <Col
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%",
                            fontSize: 16,
                        }}
                    >
                        <p style={{ fontWeight: 600 }}>Kodi: </p>
                        <p>{item?.code}</p>
                    </Col>
                    <Col
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%",
                            fontSize: 16,
                        }}
                    >
                        <p style={{ fontWeight: 600 }}>Address: </p>
                        <p>{item?.address}</p>
                    </Col>
                </div>
            </List.Item>
        )}
    />
);

const BranchComp = () => {
    const [pageData, setPageData] = useState({
        branches: [],
        loading: true,
        current: 1,
        pageSize: 10,
        totalItems: 1,
    });
    const navigate = useNavigate();
    const { provinceData } = useData();

    const getBranchs = (current, pageSize) => {
        setPageData((prev) => ({ ...prev, loading: true }));
        instance
            .get(
                `/api/audit/department/api/audit/department/branch/page?page=${current}&size=${pageSize}`
            )
            .then((data) => {
                setPageData((prev) => ({
                    ...prev,
                    branches: data.data?.data?.branches,
                    totalItems: data.data?.data?.totalItems,
                }));
            })
            .catch((error) => {
                console.error(error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error("Filiallarni yuklashda muammo bo'ldi");
            })
            .finally(() =>
                setPageData((prev) => ({ ...prev, loading: false }))
            );
    };

    const getBranchsProvince = (value) => {
        setPageData((prev) => ({ ...prev, loading: true }));
        instance
            .get(
                `/api/audit/department/api/audit/department/branch/province?provinceId=${value}`
            )
            .then((data) => {
                setPageData((prev) => ({
                    ...prev,
                    branches: data.data?.data,
                    totalItems: data.data?.data?.totalItems,
                }));
            })
            .catch((error) => {
                console.error(error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error("Filiallarni yuklashda muammo bo'ldi");
            })
            .finally(() =>
                setPageData((prev) => ({ ...prev, loading: false }))
            );
    };

    const onCreate = (values) => {
        setPageData((prev) => ({ ...prev, loading: true }));
        instance
            .post("/api/audit/department/api/audit/department/branch/post", {
                ...values,
            })
            .then(function (response) {
                message.success("Filial muvaffaqiyatli qo'shildi");
                getBranchs(pageData.current - 1, pageData.pageSize);
            })
            .catch(function (error) {
                console.error(error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error("Filialni qo'shishda muammo bo'ldi");
            })
            .finally(() => {
                setPageData((prev) => ({ ...prev, loading: false }));
            });
    };

    // const onEdit = (values, initial) => {
    //     setPageData((prev) => ({ ...prev, loading: true }));
    //     instance
    //         .put("/api/audit/department/api/audit/department/branch/put", {
    //             ...values,
    //             id: initial.id,
    //         })
    //         .then((res) => {
    //             message.success("Filial muvaffaqiyatli taxrirlandi");
    //             getBranchs(pageData.current - 1, pageData.pageSize);
    //         })
    //         .catch(function (error) {
    //             console.error("Error in edit: ", error);
    //             if (error.response?.status === 500) navigate("/server-error");
    //             message.error("Filialni taxrirlashda muammo bo'ldi");
    //         })
    //         .finally(() => {
    //             setPageData((prev) => ({ ...prev, loading: false }));
    //         });
    // };

    // const handleDelete = (arr) => {
    //     setPageData((prev) => ({ ...prev, loading: true }));
    //     arr.map((item) => {
    //         instance
    //             .delete(
    //                 `/api/audit/department/api/audit/department/branch/delete/${item}`
    //             )
    //             .then((data) => {
    //                 getBranchs(pageData.current - 1, pageData.pageSize);
    //                 message.success("Filial muvaffaqiyatli o'chirildi");
    //             })
    //             .catch((error) => {
    //                 console.error(error);
    //                 if (error.response?.status === 500)
    //                     navigate("/server-error");
    //                 message.error("Filialni o'chirishda muammo bo'ldi");
    //             })
    //             .finally(() =>
    //                 setPageData((prev) => ({ ...prev, loading: false }))
    //             );
    //         return null;
    //     });
    // };

    useEffect(() => {
        getBranchs(pageData.current - 1, pageData.pageSize);
    }, []);

    const handleBranchChange = (value) => {
        if (value === "all") {
            return getBranchs(0, pageData.pageSize);
        }
        getBranchsProvince(value);
    };

    return (
        <div className="branches">
            <h3>Filiallar</h3>
            <Space className="buttons" size="middle">
                <Space align="center" size={0}>
                    <Select
                        showSearch
                        placeholder="Filialni tanlang"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.children
                                ?.toLowerCase()
                                ?.includes(input.toLowerCase())
                        }
                        style={{
                            width: 150,
                            marginRight: "10px",
                        }}
                        className="select-add"
                        onChange={handleBranchChange}
                        defaultValue={"all"}
                    >
                        <Option key="all" value="all">
                            Barcha filiallar
                        </Option>
                        {provinceData?.map((item) => (
                            <Option key={item?.id} value={item?.id}>
                                {item?.province}
                            </Option>
                        ))}
                    </Select>
                </Space>
                <Space align="center" size="middle" className="new-buttons">
                    <AddData onCreate={onCreate} />
                </Space>
            </Space>
            <App branches={pageData?.branches} />
        </div>
    );
};

export default BranchComp;
