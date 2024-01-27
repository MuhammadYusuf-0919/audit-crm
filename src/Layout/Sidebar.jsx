import { Menu } from "antd";
import * as React from "react";
import {
    LaptopOutlined,
    MonitorOutlined,
    DashboardOutlined,
    PayCircleOutlined,
    CheckSquareOutlined,
    InsertRowLeftOutlined,
    ReconciliationOutlined,
} from "@ant-design/icons";
import Sider from "antd/es/layout/Sider";
import Drawer from "@mui/material/Drawer";
import { useSelector } from "react-redux";
import { BsChatText } from "react-icons/bs";
import Toolbar from "@mui/material/Toolbar";
import appDrawerWidth from "../Utils/constant";
import { useTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LogoImgSecond from "../Assets/Images/LogoImgSecond.jpg";
import { Link, useMediaQuery, Box, Divider } from "@mui/material";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { ColorMode } from "../Modules/Settings/DarkAndLightMode/DarkAndLight";
function Sidebar(props) {
    const { window, open, handleDrawerToggle } = props;
    const theme = useTheme();
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = React.useState(false);
    const matchDownMD = useMediaQuery(theme.breakpoints.down("md"));
    let authData = useSelector((state) => state.authReducer?.authData?.data);

    const onClickGoPage = (e) => {
        if (e.key === "/maill-app") {
            return navigate("/maill-app");
        }
        navigate(e.key);
    };
    const items = [
        {
            label: "Monitoring",
            key: "/monitoring",
            icon: <MonitorOutlined style={{ fontSize: "20px" }} />,
        },
        authData?.roleId === 1 || authData?.roleId === 2
            ? {
                  label: "Xodimlar",
                  key: "/xodimlar",
                  icon: <PeopleOutlineIcon style={{ fontSize: "20px" }} />,
              }
            : null,
        authData?.roleId === 1 || authData?.roleId === 2
            ? {
                  key: "/yillik",
                  icon: <LaptopOutlined style={{ fontSize: "20px" }} />,
                  label: "Yillik Reja",
                  children: [
                      {
                          key: "/surov",
                          label: "So'rovnoma",
                          children: [
                              {
                                  key: "/yillikReja/surovnomalar",
                                  label: "So'rovnomalar",
                              },
                              {
                                  key: "/yillikReja/surovnoma-natijasi",
                                  label: "So'rovnomalar natijasi",
                              },
                          ],
                      },
                      {
                          key: "/yakuniy-reja",
                          label: "Yakuniy Reja",
                          children: [
                              {
                                  key: "/yakuniy-reja/jadval",
                                  label: "Jadval",
                              },
                          ],
                      },
                  ],
              }
            : null,
        authData?.roleId === 1 || authData?.roleId === 2
            ? {
                  key: "/budjet1",
                  icon: <PayCircleOutlined style={{ fontSize: "20px" }} />,
                  label: "Byudjet",
                  children: [
                      {
                          key: "/budjet",
                          label: "Byudjet",
                      },
                      {
                          key: "/budjet/jadval",
                          label: "Jadval",
                      },
                  ],
              }
            : null,
        authData?.roleId === 1 || authData?.roleId === 2
            ? {
                  label: "Audit tekshiruvi",
                  key: "/audit-check",
                  icon: <CheckSquareOutlined style={{ fontSize: "20px" }} />,
                  children: [
                      {
                          key: "/audit-check/app",
                          label: "Dastur",
                      },
                      {
                          key: "/audit-check/notification",
                          label: "Bildirishnoma",
                      },
                  ],
              }
            : null,
        authData?.roleId === 1 || authData?.roleId === 2
            ? {
                  label: "Tekshiruv natijalari",
                  key: "/result",
                  icon: <InsertRowLeftOutlined style={{ fontSize: "20px" }} />,
              }
            : null,
        authData?.roleId === 1 || authData?.roleId === 2
            ? {
                  label: "Statistika",
                  key: "/statistic",
                  icon: <ReconciliationOutlined style={{ fontSize: "20px" }} />,
              }
            : null,
        authData?.roleId === 1 || authData?.roleId === 2
            ? {
                  label: "Filiallar",
                  key: "/branchs",
                  icon: <DashboardOutlined style={{ fontSize: "20px" }} />,
              }
            : null,
        {
            label: "Akt",
            key: "/act-audit",
            icon: <DescriptionOutlinedIcon style={{ fontSize: "20px" }} />,
        },
        {
            label: "Mail App",
            key: "/maill-app",
            icon: <MailOutlineIcon style={{ fontSize: "20px" }} />,
        },
        {
            label: "Chat",
            key: "/chat",
            icon: <BsChatText style={{ fontSize: "20px" }} />,
        },
    ];

    const drawer = (
        <Box>
            <Toolbar>
                <Link
                    to="/"
                    component={RouterLink}
                    sx={{ display: "contents" }}
                >
                    <Box
                        component="img"
                        width={150}
                        height={80}
                        src={LogoImgSecond}
                        alt="logo"
                    />
                </Link>
            </Toolbar>
            <Divider />
            <Sider
                width={239}
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
                trigger={null}
            >
                <Menu
                    theme="light"
                    mode="inline"
                    defaultSelectedKeys={["/"]}
                    onClick={onClickGoPage}
                    style={{
                        height: "100%",
                        borderRight: 0,
                    }}
                    items={items}
                />
            </Sider>
            <Divider />
            <Box position="absolute" sx={{bottom: 0, left: 0, right: 0}}>
                <Divider />
                <ColorMode />
            </Box>
        </Box>
    );

    const container =
        window !== undefined ? () => window().document.body : undefined;

    return (
        <Box
            sx={{
                display: "flex",
            }}
        >
            <CssBaseline />
            <Box
                component="nav"
                sx={{
                    width: { md: open && appDrawerWidth },
                    flexShrink: { md: 0 },
                    zIndex: 1300,
                }}
                aria-label="mailbox folders"
            >
                {!matchDownMD ? (
                    <Drawer
                        open={open}
                        variant="persistent"
                        onClose={handleDrawerToggle}
                        sx={{
                            display: { xs: "none", md: "block" },
                            "& .MuiDrawer-paper": {
                                boxSizing: "border-box",
                                width: appDrawerWidth,
                                zIndex: "14 !important",
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
                        ModalProps={{ keepMounted: true }}
                        sx={{
                            display: { xs: "block", md: "none" },
                            "& .MuiDrawer-paper": {
                                boxSizing: "border-box",
                                width: appDrawerWidth,
                                borderRight: `1px solid ${theme.palette.divider}`,
                                backgroundImage: "none",
                                boxShadow: "inherit",
                            },
                        }}
                    >
                        {drawer}
                    </Drawer>
                )}
            </Box>
        </Box>
    );
}

export default Sidebar;
