import {
    Box,
    Link,
    Menu,
    Badge,
    AppBar,
    Avatar,
    Divider,
    Toolbar,
    MenuItem,
    IconButton,
    Typography,
    ListItemIcon,
} from "@mui/material";
import * as React from "react";
import useToken from "../Hooks/UseToken";
import { useSelector } from "react-redux";
import { useData } from "../Hooks/UseData";
import chat from "../Assets/Images/chat.png";
import appDrawerWidth from "../Utils/constant";
import Logout from "@mui/icons-material/Logout";
import instance, { avatarUrl } from "../Api/Axios";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Link as RouterLink } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { NotificationsMenu } from "../Components/Notifications/Notifications";

export default function Header(props) {
    const { handleDrawerToggle, open } = props;
    const { token } = useToken();
    const { userData } = useData();
    const urlMessage = "api/chat?messageId";
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [messagesEl, setMessagesEl] = React.useState(null);
    const [allMessagesData, setAllMessages] = React.useState([]);
    const [notificationEl, setNotificationEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    let authData = useSelector((state) => state.authReducer?.authData?.data);
    const isMenuOpen = Boolean(anchorEl);
    const isMenuMessagesOpen = Boolean(messagesEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const isMenuNotificationOpen = Boolean(notificationEl);
    const appWidth = open ? appDrawerWidth : 0;
    const menuId = "primary-search-account-menu";
    const menuMessagesId = "primary-messages-menu";
    const menuNotificationId = "primary-notification-menu";
    const mobileMenuId = "primary-search-account-menu-mobile";

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMessagesMenuOpen = (event) => {
        setMessagesEl(event.currentTarget);
    };

    const handleNotificationMenuOpen = (event) => {
        setNotificationEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMenuMessagesClose = () => {
        setMessagesEl(null);
    };

    const handleMenuNotificationClose = () => {
        setNotificationEl(null);
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };
    const handleLogOut = () => {
        if (sessionStorage.getItem("bank-audit-admin"))
            sessionStorage.removeItem("bank-audit-admin", token);
        if (localStorage.getItem("profile"))
            localStorage.removeItem("profile", token);
        if (localStorage.getItem("bank-audit-admin")) {
            localStorage.removeItem("bank-audit-admin", token);
        }
        localStorage.clear();
        window.location.href = "/login";
    };
    const handleLogoutChange = () => {
        handleLogOut();
        handleMenuClose();
    };

    const getNotificationMessage = () => {
        instance
            .get(`api/chat/notification?username=${authData?.userName}`)
            .then((data) => {
                setAllMessages(data.data?.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    React.useEffect(() => {
        getNotificationMessage();
    }, []);

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            id={menuId}
            keepMounted
            open={isMenuOpen}
            onClose={handleMenuClose}
            PaperProps={{
                elevation: 0,
                sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                    "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: { xs: 26, md: 20 },
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                    },
                },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
            <Link
                to={"/profile"}
                component={RouterLink}
                variant="subtitle6"
                style={{ color: "unset", display: "contents" }}
            >
                <MenuItem>
                    <Avatar />
                    Profile
                </MenuItem>
            </Link>
            <Divider />
            <MenuItem onClick={handleLogoutChange} sx={{ color: "red" }}>
                <ListItemIcon>
                    <Logout sx={{ color: "red" }} fontSize="small" />
                </ListItemIcon>
                Logout
            </MenuItem>
        </Menu>
    );

    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            id={mobileMenuId}
            keepMounted
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
            PaperProps={{
                elevation: 0,
                sx: {
                    overflowY: "visible",
                    overflowX: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    height: "250px",
                    width: "280px",
                    padding: "5px",
                    borderRadius: "10px",
                    "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                    "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: "5%",
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                    },
                },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
            <MenuItem>
                <Link to="/chat">
                    <IconButton
                        aria-label="show 4 new mails"
                        size="large"
                        edge="start"
                        aria-controls={menuMessagesId}
                        aria-haspopup="true"
                        onClick={handleMessagesMenuOpen}
                        color="inherit"
                    >
                        <Badge
                            badgeContent={allMessagesData?.count}
                            color="error"
                        >
                            <Box
                                component="img"
                                width={30}
                                height={30}
                                src={chat}
                                alt="message-image"
                            />
                        </Badge>
                    </IconButton>
                    Messages
                </Link>
            </MenuItem>
            <MenuItem>
                <Link to="/notifications">
                    <IconButton
                        size="large"
                        aria-label="show 17 new notifications"
                        color="inherit"
                    >
                        <Badge badgeContent={7} color="error">
                            <NotificationsIcon
                                sx={{ color: "#ebba16", fontSize: "1.8rem" }}
                            />
                        </Badge>
                    </IconButton>
                    Notifications
                </Link>
            </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="fixed"
                sx={{
                    zIndex: "12 !important",
                    backgroundColor: "#001529",
                    padding: "8px 0 !important",
                    boxShadow: "0px 3px 10px 3px #757575",
                    ml: { md: `${appWidth}px` },
                    width: {
                        md: `calc(100% - ${appWidth}px)`,
                    },
                }}
            >
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{
                            mr: 2,
                            fontSize: "1.7rem",
                        }}
                        onClick={handleDrawerToggle}
                    >
                        {!open ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Bank Audit
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: "none", md: "flex" } }}>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-haspopup="true"
                            aria-controls={menuMessagesId}
                            onClick={handleMessagesMenuOpen}
                            aria-label="show 4 new messages"
                        >
                            <Badge
                                badgeContent={allMessagesData?.count}
                                color="error"
                            >
                                <Box
                                    component="img"
                                    width={30}
                                    height={30}
                                    src={chat}
                                    alt="message-image"
                                />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            color="inherit"
                            aria-haspopup="true"
                            aria-controls={menuNotificationId}
                            onClick={handleNotificationMenuOpen}
                            aria-label="show 17 new notifications"
                        >
                            <Badge badgeContent={7} color="error">
                                <NotificationsIcon
                                    sx={{
                                        color: "#ebba16",
                                        fontSize: "1.8rem",
                                    }}
                                />
                            </Badge>
                        </IconButton>
                    </Box>
                    <IconButton
                        edge="end"
                        size="large"
                        color="inherit"
                        aria-haspopup="true"
                        aria-controls={menuId}
                        onClick={handleProfileMenuOpen}
                        aria-label="account of current user"
                    >
                        <Avatar
                            alt={`${authData?.userName}`}
                            src={
                                userData?.photoId !==
                                "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                                    ? avatarUrl(userData?.photoId)
                                    : "3fa85f64-5717-4562-b3fc-2c963f66afa6"
                            }
                        />
                    </IconButton>
                    <Box sx={{ display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            color="inherit"
                            aria-haspopup="true"
                            aria-label="show more"
                            sx={{ padding: "6px" }}
                            aria-controls={mobileMenuId}
                            onClick={handleMobileMenuOpen}
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <NotificationsMenu
                rightTheme="8%"
                title="Messages"
                url={urlMessage}
                routeLink="/chat"
                id={menuMessagesId}
                data={allMessagesData}
                messagesEl={messagesEl}
                open={isMenuMessagesOpen}
                close={handleMenuMessagesClose}
                getResponse={getNotificationMessage}
            />
            <NotificationsMenu
                rightTheme="8%"
                url={urlMessage}
                routeLink="/chat"
                title="Notifications"
                data={allMessagesData}
                id={menuNotificationId}
                messagesEl={notificationEl}
                open={isMenuNotificationOpen}
                close={handleMenuNotificationClose}
                getResponse={getNotificationMessage}
            />
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}
