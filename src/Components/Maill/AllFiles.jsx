import { message } from "antd";
import { useState } from "react";
import instance from "../../Api/Axios";
import { useNavigate } from "react-router-dom";
import CustomTable from "../../Modules/Table/Table";

const GetAllFiles = () => {
    const [pageData, setPageData] = useState({
        response: [],
        loading: true,
        current: 1,
        pageSize: 10,
    });
    const navigate = useNavigate();

    const getResponse = () => {
        setPageData((prev) => ({ ...prev, loading: true }));
        instance
            .get("api/audit/department/attachment/")
            .then((data) => {
                setPageData((prev) => ({
                    ...prev,
                    response: data.data?.data,
                }));
            })
            .catch((error) => {
                console.error(error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error("Fayllarni yuklashda muammo bo'ldi");
            })
            .finally(() =>
                setPageData((prev) => ({ ...prev, loading: false }))
            );
    };

    const columns = [
        {
            title: "Yuklangan fayllar",
            dataIndex: "originalName",
            key: "originalName",
            width: "100%",
            search: true,
            sorter: (a, b) => {
                if (a.originalName < b.originalName) {
                    return -1;
                }
                if (a.originalName > b.originalName) {
                    return 1;
                }
                return 0;
            },
        },
    ];

    return (
        <CustomTable
            columns={columns}
            pageSizeOptions={[10, 20]}
            getData={getResponse}
            current={pageData?.current}
            pageSize={pageData?.pageSize}
            setCurrent={(newProp) =>
                setPageData((prev) => ({ ...prev, current: newProp }))
            }
            setPageSize={(newProp) =>
                setPageData((prev) => ({ ...prev, pageSize: newProp }))
            }
            tableData={pageData?.response}
            loading={pageData?.loading}
            setLoading={(newProp) =>
                setPageData((prev) => ({ ...prev, loading: newProp }))
            }
        />
    );
};

export default GetAllFiles;
