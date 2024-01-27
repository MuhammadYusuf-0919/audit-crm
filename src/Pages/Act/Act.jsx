import * as React from "react";
import JoditEditor from "jodit-react";
import {
    Box,
    Button,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    Typography,
} from "@mui/material";
import { useData } from "../../Hooks/UseData";
import instance from "../../Api/Axios";
import { message } from "antd";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import { useNavigate } from "react-router-dom";
import CustomTable from "../../Modules/Table/Table";
import CommonLoading from "../../Components/Loading/CommonLoading";

export default function ActAudit() {
    const [post, setPost] = React.useState({
        content: "",
        category: "",
        branch: "",
    });
    const [pageData, setPageData] = React.useState({
        categorys: [],
        loading: false,
        current: 1,
        pageSize: 10,
    });
    const [loading, setLoading] = React.useState(false);
    const { branchData, auditingCategoryData } = useData();
    const editor = React.useRef(null);
    const navigate = useNavigate();
    const contentFieldChanged = (data) => {
        setPost({ ...post, content: data });
    };

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    const getCategorys = (current, pageSize) => {
        setPageData((prev) => ({ ...prev, loading: true }));
        instance
            .get(
                `api/audit/department/descriptionOfAuditing/page?page=${current}&size=${pageSize}`
            )
            .then((data) => {
                setPageData((prev) => ({
                    ...prev,
                    categorys: data.data?.data?.auditingPage,
                }));
            })
            .catch((error) => {
                console.error(error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error("Aktlarni yuklashda muammo bo'ldi");
            })
            .finally(() =>
                setPageData((prev) => ({ ...prev, loading: false }))
            );
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setPageData((prev) => ({ ...prev, loading: true }));
        const data = {
            description: post.content.replace(new RegExp("<[^>]*>", "g"), ""),
            auditingCategoryId: post.category,
            branchId: post.branch,
        };
        try {
            const response = await instance.post(
                `api/audit/department/descriptionOfAuditing`,
                { ...data }
            );
            console.log(response.data);
            message.success("Akt muvaffaqitali qo'shildi");
            getCategorys(pageData.current - 1, pageData.pageSize);
        } catch (error) {
            console.error(error);
            if (error.response?.status === 500) navigate("/server-error");
            message.error("Aktni qo'shishda muammo bo'ldi");
        }
        setPost({
            content: "",
            category: "",
            branch: "",
        });
        setPageData((prev) => ({ ...prev, loading: false }));
        setLoading(false);
    };
    if (loading) {
        return <CommonLoading />;
    }

    const columns = [
        {
            title: "Akt descriptions",
            dataIndex: "description",
            key: "description",
            width: "10rem",
            search: true,
            sorter: (a, b) => {
                if (a.description < b.description) {
                    return -1;
                }
                if (a.description > b.description) {
                    return 1;
                }
                return 0;
            },
        },
        {
            title: "Auditing",
            dataIndex: "auditingCategoryId",
            key: "auditingCategoryId",
            width: "25px",
            search: true,
            render: (record) => {
                const data = auditingCategoryData?.filter(
                    (item) => item.id === record
                );
                return data[0]?.name;
            },
            sorter: (a, b) => {
                if (a.auditingCategoryId < b.auditingCategoryId) {
                    return -1;
                }
                if (a.auditingCategoryId > b.auditingCategoryId) {
                    return 1;
                }
                return 0;
            },
        },
        {
            title: "Branch",
            dataIndex: "branchId",
            key: "branchId",
            width: "25px",
            search: true,
            render: (record) => {
                const data = branchData?.filter((item) => item.id === record);
                return data[0]?.name;
            },
            sorter: (a, b) => {
                if (a.branchId < b.branchId) {
                    return -1;
                }
                if (a.branchId > b.branchId) {
                    return 1;
                }
                return 0;
            },
        },
    ];

    return (
        <Box
            component="main"
            sx={{
                padding: {md: "40px 30px 25px 30px", xs: '30px 10px 15px 10px'},
                display: "flex",
                flexDirection: "column",
                gap: "30px",
            }}
        >
            <Box
                sx={{
                    background: " #fff",
                    borderRadius: "15px",
                    position: "relative",
                    boxShadow: "1px 1px 10px 0px #9e9e9e",
                    overflow: "hidden",
                }}
                component="form"
                onSubmit={handleSubmit}
            >
                <JoditEditor
                    ref={editor}
                    value={post.content}
                    onChange={(newContent) => contentFieldChanged(newContent)}
                />
                <Grid
                    container
                    spacing={2}
                    justifyContent="space-around"
                    rowSpacing={4}
                    p={2.5}
                    sx={{ flexDirection: { xs: "column", lg: "row" } }}
                >
                    <Grid item lg={3} xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                                Auditing
                            </InputLabel>
                            <Select
                                name="category"
                                label="Auditing"
                                value={post?.category}
                                onChange={handleChange}
                            >
                                {auditingCategoryData?.map((item) => (
                                    <MenuItem key={item.id} value={item.id}>
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item lg={3} xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                                Branchs
                            </InputLabel>
                            <Select
                                name="branch"
                                label="Branchs"
                                value={post?.branch}
                                onChange={handleChange}
                            >
                                {branchData?.map((item) => (
                                    <MenuItem key={item.id} value={item.id}>
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid
                        item
                        lg={1.5}
                        xs={12}
                        sx={{ marginLeft: { lg: "auto", xs: "unset" } }}
                    >
                        <Button
                            variant="outlined"
                            color="primary"
                            type="submit"
                            sx={{ width: "100%" }}
                        >
                            <IconButton
                                size="middle"
                                aria-label="show save icon"
                                color="inherit"
                            >
                                <SaveAsIcon />
                            </IconButton>
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <Box>
                <Typography
                    sx={{ textAlign: "center" }}
                    variant="h4"
                    component="h2"
                >
                    Acts
                </Typography>
                <CustomTable
                    columns={columns}
                    pageSizeOptions={[10, 20]}
                    getData={getCategorys}
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
            </Box>
        </Box>
    );
}
