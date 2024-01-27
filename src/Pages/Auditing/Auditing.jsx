import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../../Api/Axios";
import { message } from "antd";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const AuditingComp = () => {
    const [pageData, setPageData] = useState({
        auditing: [],
        loading: true,
        current: 1,
        pageSize: 10,
    });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [auditData, setAuditData] = useState([]);
    const [auditingData, setAuditingData] = useState("");

    const handleChange = (event) => {
        setAuditingData(event.target.value);
    };

    const getauditing = () => {
        setPageData((prev) => ({ ...prev, loading: true }));
        instance
            .get(
                "/api/audit/department/auditingCategory/getPageable?page=0&size=10"
            )
            .then((data) => {
                setPageData((prev) => ({
                    ...prev,
                    auditing: data.data?.data?.allWorkers,
                }));
            })
            .catch((error) => {
                console.error(error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error("Tumanlarni yuklashda muammo bo'ldi");
            })
            .finally(() =>
                setPageData((prev) => ({ ...prev, loading: false }))
            );
    };

    const getAuditingSelect = () => {
        setLoading(true);
        instance
            .get("api/audit/department/auditingCategory/getAll")
            .then((data) => {
                setAuditData(data.data?.data);
            })
            .catch((error) => {
                console.error(error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error("Tumanlarni yuklashda muammo bo'ldi");
            })
            .finally(() => setLoading(false));
    };
    useEffect(() => {
        getAuditingSelect();
    }, []);

    return (
        <div className="others">
            <div>
                <h3>Navoiy viloyati tumanlari</h3>
                <FormControl sx={{ m: 1, minWidth: 80 }}>
                    <InputLabel id="demo-simple-select-autowidth-label">
                        Age
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        value={auditingData}
                        onChange={handleChange}
                        autoWidth
                        label="Viloyatlar"
                    >
                        {auditData.map((item) => (
                            <MenuItem value={item.id}>{item.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
        </div>
    );
};

export default AuditingComp;
