import {
    Box,
    Tab,
    Tabs,
    Drawer,
    AppBar,
    Toolbar,
    Divider,
    IconButton,
    Typography,
    CssBaseline,
    useMediaQuery,
} from "@mui/material";
import * as React from "react";
import PropTypes from "prop-types";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import { useTheme } from "@mui/material/styles";
import MailIcon from "@mui/icons-material/Mail";
import appDrawerWidth from "../../Utils/constant";
import OutboxIcon from "@mui/icons-material/Outbox";
import { MailWidjet } from "../../Components/Widgets";
import MessageIcon from "@mui/icons-material/Message";
import SendFiles from "../../Components/Maill/SendFiles";
import GetAllFiles from "../../Components/Maill/AllFiles";
import MaillModal from "../../Components/Maill/MaillModal";
import uploadIcon from "../../Assets/Images/uploadIcon.png";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import downloadIcon from "../../Assets/Images/downloadIcon.png";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

function MaillMap(props) {
    const { window } = props;
    const theme = useTheme();
    const [value, setValue] = React.useState(1);
    const matchDownMd = useMediaQuery(theme.breakpoints.down("md"));
    const [open, setOpen] = React.useState(!matchDownMd ? true : false);
    let menuOpen = useSelector((state) => state.menuReducer?.menuOpen);
    const leftWidth = open ? appDrawerWidth : 0;
    const fatherWidth = menuOpen ? appDrawerWidth : 0;
    const appWidth = fatherWidth + leftWidth;
    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    const handleChangeTabs = (event, newValue) => {
        setValue(newValue);
    };
    const drawer = (
        <Box>
            <Toolbar
                sx={{
                    color: "#616161",
                    justifyContent: "center",
                    gap: "10px",
                    minHeight: "74px !important",
                }}
            >
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                >
                    <MessageIcon sx={{ fontSize: "2rem !important" }} />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                    MailBox
                </Typography>
            </Toolbar>
            <Divider />
            <MaillModal />
            <Divider />
            <Tabs
                orientation="vertical"
                variant="scrollable"
                aria-label="Vertical tabs example"
                value={value}
                sx={{ borderRight: 1, borderColor: "divider" }}
                onChange={handleChangeTabs}
                className="tabs-ver"
            >
                <Tab
                    className="tab-item"
                    icon={<OutboxIcon />}
                    iconPosition="start"
                    label="Sent"
                    value={1}
                    onClick={matchDownMd && handleDrawerToggle}
                />
                <Tab
                    className="tab-item"
                    icon={<CloudUploadIcon />}
                    iconPosition="start"
                    label="Upload"
                    value={2}
                    onClick={matchDownMd && handleDrawerToggle}
                />
                <Tab
                    className="tab-item"
                    icon={<CloudDownloadIcon />}
                    iconPosition="start"
                    label="Dowload"
                    value={3}
                    onClick={matchDownMd && handleDrawerToggle}
                />
                <Tab
                    className="tab-item"
                    icon={<MailIcon />}
                    iconPosition="start"
                    label="All files"
                    value={4}
                    onClick={matchDownMd && handleDrawerToggle}
                />
            </Tabs>
            <Divider />
        </Box>
    );

    const container =
        window !== undefined ? () => window().document.body : undefined;

    return (
        <Box
            sx={{
                margin: "auto !important",
                display: "flex",
            }}
        >
            <TabContext value={value}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    sx={{
                        top: "60px !important",
                        zIndex: "1 !important",
                        padding: "25px 10px 5px 5px",
                        ml: { md: `${appWidth}px` },
                        backgroundColor: "#b0b3b6 !important",
                        boxShadow: "0 2px 4px 0px rgb(105 101 101 / 75%)",
                        width: { md: `calc(100% - ${appWidth}px)` },
                    }}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2 }}
                        >
                            {!open ? (
                                <MenuUnfoldOutlined />
                            ) : (
                                <MenuFoldOutlined />
                            )}
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Box
                    component="nav"
                    sx={{
                        width: { md: appDrawerWidth },
                        flexShrink: { sm: 0 },
                    }}
                    aria-label="mailbox folders"
                >
                    {!matchDownMd ? (
                        <Drawer
                            variant="persistent"
                            open={open}
                            onClose={handleDrawerToggle}
                            sx={{
                                display: { xs: "none", md: "block" },
                                "& .MuiDrawer-paper": {
                                    boxSizing: "border-box",
                                    width: appDrawerWidth,
                                    top: "80px !important",
                                    zIndex: "10 !important",
                                    ml: { md: `${fatherWidth}px` },
                                },
                            }}
                        >
                            {drawer}
                        </Drawer>
                    ) : (
                        <Drawer
                            container={container}
                            variant="temporary"
                            open={open}
                            onClose={handleDrawerToggle}
                            ModalProps={{
                                keepMounted: true,
                            }}
                            sx={{
                                display: { xs: "block", md: "none" },
                                "& .MuiDrawer-paper": {
                                    boxSizing: "border-box",
                                    width: appDrawerWidth,
                                    top: "8% !important",
                                    borderTopRightRadius: "15px",
                                },
                            }}
                        >
                            {drawer}
                        </Drawer>
                    )}
                </Box>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        pt: 4,
                        width: { md: `calc(100% - ${appDrawerWidth}px)` },
                        marginLeft: "-10px",
                    }}
                >
                    <Toolbar />
                    <TabPanel
                        value={1}
                        sx={{
                            padding: "0 !important",
                        }}
                    >
                        <SendFiles />
                    </TabPanel>
                    <TabPanel
                        value={2}
                        sx={{ padding: { xs: "30px 0 0 0", md: "24px" } }}
                    >
                        <MailWidjet
                            uploadData={true}
                            selectFile={false}
                            mailImage={uploadIcon}
                            mailTitle={"Send file"}
                        />
                    </TabPanel>
                    <TabPanel
                        value={3}
                        sx={{ padding: { xs: "30px 0 0 0", md: "24px" } }}
                    >
                        <MailWidjet
                            selectFile={true}
                            uploadData={false}
                            mailImage={downloadIcon}
                            mailTitle={"Download file"}
                            />
                    </TabPanel>
                    <TabPanel value={4}>
                        <GetAllFiles />
                    </TabPanel>
                </Box>
            </TabContext>
        </Box>
    );
}

MaillMap.propTypes = {
    window: PropTypes.func,
};

export default MaillMap;
