import * as React from "react";
import {
    Button,
    Box,
    Modal,
    Backdrop,
    Fade,
    TextField,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import { message } from "antd";
import instance from "../../Api/Axios";
import { useData } from "../../Hooks/UseData";
import { useNavigate } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import CommonLoading from "../Loading/CommonLoading";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

const MaillModal = () => {
    const [loading, setLoading] = React.useState(false);
    const [fileData, setFilesData] = React.useState();
    const [formData, setFormData] = React.useState({
        emailTo: "",
        content: "",
        subject: "",
    });
    const [open, setOpen] = React.useState(false);
    const { filesData, getEmailSendData } = useData();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate();
    const handleChangeInput = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleChange = (event) => {
        setFilesData(event.target.value);
    };
    const handleSendSubmit = (event) => {
        event.preventDefault();
        if (fileData == null) {
            return message.error("Iltimos, fayl tanlang");
        } else {
            setLoading(true);
            getEmailSend(formData);
            setLoading(false);
        }
        handleClose();
    };
    const getEmailSend = (values) => {
        setLoading(true);
        instance
            .post(
                `api/audit/department/emailSendAttachment/fileByEmailHistory/${fileData}`,
                {
                    ...values,
                }
            )
            .then(function (response) {
                message.success("File muvaffaqiyatli jo'natildi");
                getEmailSendData();
            })
            .catch((error) => {
                console.error(error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error("Faylni yuborishda muammo bo'ldi");
            });
    };
    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        maxWidth: "40%",
        minWidth: "380px",
        borderRadius: "16px",
        bgcolor: "background.paper",
        // boxShadow: 24,
        p: 4,
        boxShadow:
            "0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%), 0 9px 28px 8px rgb(0 0 0 / 5%)",
    };
    if (loading) {
        return <CommonLoading />;
    }
    return (
        <Box sx={{ p: 2, textAlign: "center" }}>
            <Button
                onClick={handleOpen}
                variant="contained"
                size="large"
                startIcon={<ModeEditIcon />}
                sx={{ width: "90%", borderRadius: "30px", padding: "12px" }}
            >
                Compose
            </Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box component="form" sx={style}>
                        <Grid
                            container
                            sapcing={2}
                            justifyContent="space-around"
                            rowSpacing={4}
                        >
                            <Grid item xs={12}>
                                <TextField
                                    id="to"
                                    name="to"
                                    label="Email"
                                    type="email"
                                    fullWidth
                                    required
                                    value={formData?.to}
                                    onChange={handleChangeInput}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="subject"
                                    name="subject"
                                    label="Subject"
                                    type="text"
                                    multiline
                                    fullWidth
                                    required
                                    value={formData?.subject}
                                    onChange={handleChangeInput}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="content"
                                    name="content"
                                    label="Content"
                                    type="text"
                                    fullWidth
                                    required
                                    value={formData?.content}
                                    onChange={handleChangeInput}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">
                                        Upload files
                                    </InputLabel>
                                    <Select
                                        label="Uploaded files"
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={fileData}
                                        onChange={handleChange}
                                        required
                                    >
                                        {filesData.map((item) => (
                                            <MenuItem
                                                key={item.id}
                                                value={item.id}
                                            >
                                                {item.originalName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sx={{
                                    textAlign: "end",
                                }}
                            >
                                <Button
                                    variant="outlined"
                                    onClick={handleClose}
                                    sx={{ marginRight: "20px !important" }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="contained"
                                    endIcon={<SendIcon />}
                                    onClick={handleSendSubmit}
                                >
                                    Send
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Fade>
            </Modal>
        </Box>
    );
};

export default MaillModal;
