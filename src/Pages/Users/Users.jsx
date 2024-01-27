import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import instance from "../../Api/Axios";
import CustomTable from "../../Modules/Table/Table";
import { useData } from "../../Hooks/UseData";

const Users = () => {
    const [pageData, setPageData] = useState({
        categorys: [],
        loading: true,
        current: 1,
        pageSize: 10,
    });
    const navigate = useNavigate();
    const { roleData } = useData();

    const getCategorys = () => {
        setPageData((prev) => ({ ...prev, loading: true }));
        instance
            .get("api/audit/department/user")
            .then((data) => {
                setPageData((prev) => ({
                    ...prev,
                    categorys: data.data?.data,
                }));
            })
            .catch((error) => {
                console.error(error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error("Xodimlarni yuklashda muammo bo'ldi");
            })
            .finally(() =>
                setPageData((prev) => ({ ...prev, loading: false }))
            );
    };

    const onCreate = (values) => {
        const value = {
            ...values,
            photoId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        };
        setPageData((prev) => ({ ...prev, loading: true }));
        instance
            .post("api/audit/department/user", { ...value })
            .then(function (response) {
                message.success("Xodim muvaffaqiyatli qo'shildi");
                getCategorys(pageData.current - 1, pageData.pageSize);
            })
            .catch(function (error) {
                console.error(error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error("Xodimni qo'shishda muammo bo'ldi");
            })
            .finally(() => {
                setPageData((prev) => ({ ...prev, loading: false }));
            });
    };

    const onEdit = (values, initial) => {
        setPageData((prev) => ({ ...prev, loading: true }));
        instance
            .put(`api/audit/department/user/${initial.id}`, {
                ...values,
            })
            .then((res) => {
                message.success("Xodim muvaffaqiyatli taxrirlandi");
                getCategorys(pageData.current - 1, pageData.pageSize);
            })
            .catch(function (error) {
                console.error("Error in edit: ", error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error("Xodimni taxrirlashda muammo bo'ldi");
            })
            .finally(() => {
                setPageData((prev) => ({ ...prev, loading: false }));
            });
    };

    const handleDelete = (arr) => {
        setPageData((prev) => ({ ...prev, loading: true }));
        arr.map((item) => {
            instance
                .delete(`api/audit/department/user/${item}`)
                .then((data) => {
                    getCategorys(pageData.current - 1, pageData.pageSize);
                    message.success("Xodim muvaffaqiyatli o'chirildi");
                })
                .catch((error) => {
                    console.error(error);
                    if (error.response?.status === 500)
                        navigate("/server-error");
                    message.error("Xodimni o'chirishda muammo bo'ldi");
                })
                .finally(() =>
                    setPageData((prev) => ({ ...prev, loading: false }))
                );
            return null;
        });
    };

    const columns = [
        {
            title: "Xodim ism sharifi",
            dataIndex: "fio",
            key: "fio",
            width: "20%",
            search: true,
            sorter: (a, b) => {
                if (a.fio < b.fio) {
                    return -1;
                }
                if (a.fio > b.fio) {
                    return 1;
                }
                return 0;
            },
        },
        {
            title: "Xodim userName",
            dataIndex: "userName",
            key: "userName",
            width: "20%",
            search: true,
            sorter: (a, b) => {
                if (a.userName < b.userName) {
                    return -1;
                }
                if (a.userName > b.userName) {
                    return 1;
                }
                return 0;
            },
        },
        {
            title: "Xodim email",
            dataIndex: "email",
            key: "email",
            width: "20%",
            search: true,
            sorter: (a, b) => {
                if (a.email < b.email) {
                    return -1;
                }
                if (a.email > b.email) {
                    return 1;
                }
                return 0;
            },
        },
        {
            title: "Xodim nomeri",
            dataIndex: "phoneNumber",
            key: "phoneNumber",
            width: "20%",
            search: true,
            sorter: (a, b) => {
                if (a.phoneNumber < b.phoneNumber) {
                    return -1;
                }
                if (a.phoneNumber > b.phoneNumber) {
                    return 1;
                }
                return 0;
            },
        },
        {
            title: "Xodim ish o'rni",
            dataIndex: "roleId",
            key: "roleId",
            width: "20%",
            search: true,
            render: (record) => {
                const data = roleData?.filter((item) => item.id === record);
                return data[0]?.name;
            },
            sorter: (a, b) => {
                if (a.roleId < b.roleId) {
                    return -1;
                }
                if (a.roleId > b.roleId) {
                    return 1;
                }
                return 0;
            },
        },
    ];

    return (
        <div className="others">
            <div>
                <h3>Xodimlar</h3>
                <CustomTable
                    columns={columns}
                    pageSizeOptions={[10, 20]}
                    getData={getCategorys}
                    onDelete={handleDelete}
                    onCreate={onCreate}
                    onEdit={onEdit}
                    current={pageData?.current}
                    pageSize={pageData?.pageSize}
                    setCurrent={(newProp) =>
                        setPageData((prev) => ({ ...prev, current: newProp }))
                    }
                    setPageSize={(newProp) =>
                        setPageData((prev) => ({ ...prev, pageSize: newProp }))
                    }
                    tableData={pageData?.categorys}
                    loading={pageData?.loading}
                    setLoading={(newProp) =>
                        setPageData((prev) => ({ ...prev, loading: newProp }))
                    }
                />
            </div>
        </div>
    );
};

export default Users;
