import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import instance from "../../Api/Axios";
import CustomTable from "../../Modules/Table/Table";

const CategoryComp = () => {
    const [pageData, setPageData] = useState({
        categorys: [],
        loading: true,
        current: 1,
        pageSize: 10,
    });
    const navigate = useNavigate();

    const getCategorys = (current, pageSize) => {
        setPageData((prev) => ({ ...prev, loading: true }));
        instance
            .get(
                `api/audit/department/api/audit/department/category/getAllPageable?page=${current}&size=${pageSize}`
            )
            .then((data) => {
                setPageData((prev) => ({
                    ...prev,
                    categorys: data.data?.data?.category,
                }));
            })
            .catch((error) => {
                console.error(error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error("Kategoriyalarni yuklashda muammo bo'ldi");
            })
            .finally(() =>
                setPageData((prev) => ({ ...prev, loading: false }))
            );
    };

    const onCreate = (values) => {
        setPageData((prev) => ({ ...prev, loading: true }));
        instance
            .post("/api/exam/createOrUpdate", { ...values })
            .then(function (response) {
                message.success("Kategoriya muvaffaqiyatli qo'shildi");
                getCategorys(pageData.current - 1, pageData.pageSize);
            })
            .catch(function (error) {
                console.error(error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error("Kategoriyani qo'shishda muammo bo'ldi");
            })
            .finally(() => {
                setPageData((prev) => ({ ...prev, loading: false }));
            });
    };

    const onEdit = (values, initial) => {
        setPageData((prev) => ({ ...prev, loading: true }));
        instance
            .post("/api/exam/createOrUpdate", {
                ...values,
                id: initial.id,
            })
            .then((res) => {
                message.success("Kategoriya muvaffaqiyatli taxrirlandi");
                getCategorys(pageData.current - 1, pageData.pageSize);
            })
            .catch(function (error) {
                console.error("Error in edit: ", error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error("Kategoriyani taxrirlashda muammo bo'ldi");
            })
            .finally(() => {
                setPageData((prev) => ({ ...prev, loading: false }));
            });
    };

    const handleDelete = (arr) => {
        setPageData((prev) => ({ ...prev, loading: true }));
        arr.map((item) => {
            instance
                .delete(`/api/exam/delete/${item}`)
                .then((data) => {
                    getCategorys(pageData.current - 1, pageData.pageSize);
                    message.success("Kategoriya muvaffaqiyatli o'chirildi");
                })
                .catch((error) => {
                    console.error(error);
                    if (error.response?.status === 500)
                        navigate("/server-error");
                    message.error("Kategoriyani o'chirishda muammo bo'ldi");
                })
                .finally(() =>
                    setPageData((prev) => ({ ...prev, loading: false }))
                );
            return null;
        });
    };

    const columns = [
        {
            title: "Kategoriya nomi",
            dataIndex: "name",
            key: "name",
            width: "59%",
            search: true,
            sorter: (a, b) => {
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                return 0;
            },
        },
        {
            title: "Kategoriya kodi",
            dataIndex: "code",
            key: "code",
            width: "40%",
            search: true,
            sorter: (a, b) => {
                if (a.code < b.code) {
                    return -1;
                }
                if (a.code > b.code) {
                    return 1;
                }
                return 0;
            },
        },
    ];

    return (
        <div className="others">
            <div>
                <h3>Kategoriyalar</h3>
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

export default CategoryComp;
