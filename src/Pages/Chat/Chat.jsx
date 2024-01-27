import "./Chat.css";
import {
    Box,
    Drawer,
    Avatar,
    Toolbar,
    Typography,
    IconButton,
    CssBaseline,
    useMediaQuery,
    CircularProgress,
} from "@mui/material";
import Stomp from "stompjs";
import * as React from "react";
import PropTypes from "prop-types";
import SockJS from "sockjs-client";
import { useSelector } from "react-redux";
import { useData } from "../../Hooks/UseData";
import { useTheme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import AppBar from "../../Components/Chat/ChatAppBar";
import instance, { avatarUrl } from "../../Api/Axios";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { SvgRightImages } from "../../Assets/Svg/SvgImages";
import { DawerDoc } from "../../Components/Chat/DocDrawer/DocDrawer";
import { ChatFormFooter } from "../../Components/Chat/ChatFormFooter";
import appDrawerWidth, { chatDrawerWidth } from "../../Utils/constant";
import { DrawerContent } from "../../Components/Chat/ChatDrawerContent";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { MessageList } from "../../Components/Chat/MessageList/MessageList";
var stompClient = null;
const fakeData = "3fa85f64-5717-4562-b3fc-2c963f66afa6";

function Chat(props) {
    const { window } = props;
    const theme = useTheme();
    const [file, setFile] = React.useState(null);
    const [value, setValue] = React.useState("0");
    const [messages, setMessage] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [selected, setSelected] = React.useState(null);
    const [allMessages, setAllMessages] = React.useState([]);
    const [rightOpen, setRightOpen] = React.useState(false);
    const [selectedUser, setSelectedUser] = React.useState([]);
    const matchDownMD = useMediaQuery(theme.breakpoints.down("md"));
    const [open, setOpen] = React.useState(!matchDownMD ? true : false);
    const [profile, setProfile] = React.useState(
        localStorage.getItem("profile")
    );
    let menuOpen = useSelector((state) => state.menuReducer?.menuOpen);
    const leftWidth = open ? chatDrawerWidth : 0;
    const fatherWidth = menuOpen ? appDrawerWidth : 0;
    const rightWidth = rightOpen ? chatDrawerWidth : 0;
    const appWidth = fatherWidth + leftWidth + rightWidth;
    const { usersData, getUsersData, chatsData, getChatsData, userData } =
        useData();
    let authData = useSelector((state) => state.authReducer?.authData?.data);
    let currentUser = useSelector((state) => state.currentReducer?.currentUser);
    const [currentChat, setCurrentChat] = React.useState(currentUser);

    if (loading) {
        <CircularProgress />;
    }

    const handleDrawerDoc = () => {
        setRightOpen(!rightOpen);
    };

    const handleChangeSubmit = (value) => {
        setMessage(value);
    };
    const handleChangeFile = (e) => {
        setFile(e.target.files[0]);
    };
    const handleChange = (newValue) => {
        setValue(newValue);
        setSelected(null);
        setCurrentChat(null);
    };
    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    const handleChatSubmit = (e) => {
        e.preventDefault();
        if (messages !== "" || file !== null) {
            const formData = new FormData();
            formData.append("fileData", file);
            sendMessage(messages, profile?.userName);
        }
        setMessage("");
        setFile(null);
    };

    const getAllMessage = () => {
        setLoading(true);
        instance
            .get(
                `api/chat/all/message?firstUsername=${profile?.userName}&secondUsername=${currentChat?.userName}`
            )
            .then((data) => {
                setAllMessages(data.data?.data);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => setLoading(false));
    };

    React.useEffect(() => {
        if (currentUser) {
            setCurrentChat(currentUser);
            console.log(currentUser);
        }
        if (currentChat) {
            getAllMessage();
        }
    }, [currentUser]);

    React.useEffect(() => {
        chatsData?.map((itm) => {
            const filteredUsers = usersData?.filter(
                (item) => item.id === itm.with
            );
            setSelectedUser(filteredUsers);
        });
    }, [chatsData]);

    React.useEffect(() => {
        setProfile(authData);
        connectToChat(profile?.userName);
        getUsersData();
    }, [authData]);

    function connectToChat(userName) {
        console.log("Connecting to chat...");
        let socket = new SockJS("https://project2-java.herokuapp.com/api/chat");
        stompClient = Stomp.over(socket);
        stompClient.connect({}, function (frame) {
            console.log("Connected to: " + frame + " userName=" + userName);
            stompClient.subscribe(
                "/topic/messages/" + userName,
                function (response) {
                    let data = JSON.parse(response.body);
                    console.log(data + "=response");
                }
            );
        });
    }

    const sendMessage = (message, name) => {
        setLoading(true);
        console.log("Sending");
        stompClient.send(
            `/app/chat/${currentChat?.userName}`,
            {},
            JSON.stringify({
                messageSender: name,
                destination: currentChat?.userName,
                message: message,
                date: new Date(),
            })
        );
        getAllMessage();
    };

    const container =
        window !== undefined ? () => window().document.body : undefined;

    return (
        <Box
            sx={{
                margin: "auto !important",
                padding: "20px !important",
                display: "flex",
            }}
        >
            <CssBaseline />
            <AppBar
                open={open}
                md={!matchDownMD}
                appwidth={appWidth}
                leftwidth={leftWidth}
                fatherwidth={fatherWidth}
                drawerwidth={chatDrawerWidth}
                menuopen={menuOpen ? "true" : "false"}
                rightopen={rightOpen ? "true" : "false"}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{
                            mr: 2,
                        }}
                    >
                        {!open ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    </IconButton>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        {currentChat !== null ? (
                            <Avatar
                                alt={`${currentChat?.userName}`}
                                src={
                                    currentChat?.photoId !== fakeData
                                        ? avatarUrl(currentChat?.photoId)
                                        : fakeData
                                }
                                sx={{
                                    display: { xs: "flex", md: "none" },
                                    width: "45px",
                                    height: "45px",
                                    marginRight: "15px",
                                }}
                            />
                        ) : (
                            ""
                        )}
                        <Typography variant="h6" noWrap component="div">
                            {currentChat?.fio}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            color: "#ffffff",
                            marginLeft: "auto",
                            alignItems: "center",
                            // display: `${currentChat ? "flex" : "none"}`,
                            display: "flex",
                        }}
                    >
                        <IconButton aria-label="search" color="inherit">
                            <SearchIcon color="inherit" />
                        </IconButton>
                        <IconButton
                            color="inherit"
                            aria-label="doc"
                            sx={{
                                cursor: "pointer",
                                display: "flex",
                            }}
                            onClick={handleDrawerDoc}
                        >
                            <SvgRightImages
                                width="25px"
                                height="25px"
                                color={`${rightOpen ? "#1e9bff" : "#ffffff"}`}
                            />
                        </IconButton>
                        <IconButton aria-label="settings" color="inherit">
                            <MoreVertIcon color="inherit" />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: chatDrawerWidth }, flexShrink: { sm: 0 } }}
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
                                width: chatDrawerWidth,
                                top: "80px !important",
                                zIndex: "10 !important",
                                ml: { md: `${fatherWidth}px` },
                            },
                        }}
                    >
                        <DrawerContent
                            value={value}
                            profile={profile}
                            fakeData={fakeData}
                            userData={userData}
                            usersData={usersData}
                            selectedUser={selectedUser}
                            handleChange={handleChange}
                            handleDrawerToggle={handleDrawerToggle}
                        />
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
                                width: chatDrawerWidth,
                                top: "11% !important",
                                borderTopRightRadius: "15px",
                            },
                        }}
                    >
                        <DrawerContent
                            value={value}
                            profile={profile}
                            fakeData={fakeData}
                            userData={userData}
                            usersData={usersData}
                            selectedUser={selectedUser}
                            handleChange={handleChange}
                            handleDrawerToggle={handleDrawerToggle}
                        />
                    </Drawer>
                )}
                {!matchDownMD ? (
                    <Drawer
                        sx={{
                            display: { xs: "none", md: "block" },
                            width: chatDrawerWidth,
                            flexShrink: 0,
                            "& .MuiDrawer-paper": {
                                width: chatDrawerWidth,
                                top: "10.7%",
                            },
                        }}
                        variant="persistent"
                        anchor="right"
                        open={rightOpen}
                    >
                        <DawerDoc
                            open={rightOpen}
                            fakeData={fakeData}
                            current={currentChat}
                            avatarUrl={avatarUrl}
                            setOpen={setRightOpen}
                        />
                    </Drawer>
                ) : (
                    <Drawer
                        container={container}
                        ModalProps={{
                            keepMounted: true,
                        }}
                        variant="temporary"
                        sx={{
                            display: { xs: "block", md: "none" },
                            width: chatDrawerWidth,
                            flexShrink: 0,
                            "& .MuiDrawer-paper": {
                                width: chatDrawerWidth,
                                top: "11%",
                                borderTopLeftRadius: "15px",
                            },
                        }}
                        anchor="right"
                        open={rightOpen}
                    >
                        <DawerDoc
                            open={rightOpen}
                            fakeData={fakeData}
                            current={currentChat}
                            avatarUrl={avatarUrl}
                            setOpen={setRightOpen}
                        />
                    </Drawer>
                )}
            </Box>
            <Box
                component="main"
                sx={{
                    p: 3,
                    flexGrow: 1,
                    width: { md: `calc(100% - ${appWidth}px)` },
                }}
            >
                <Box component="form" onSubmit={handleChatSubmit}>
                    <Box
                        position="fixed"
                        sx={{
                            width: {
                                md: `calc(100% - ${appWidth}px)`,
                                xs: "100%",
                            },
                            left: { md: `${fatherWidth + leftWidth}px` },
                            backgroundColor: "#2a4255",
                            right: { md: rightWidth, xs: 0 },
                            top: "20%",
                            overflowY: "auto",
                            height: "72vh",
                        }}
                    >
                        <MessageList
                            profile={profile}
                            fakeData={fakeData}
                            current={currentChat}
                            avatarUrl={avatarUrl}
                            messages={allMessages}
                        />
                    </Box>
                    <ChatFormFooter
                        messages={messages}
                        appWidth={appWidth}
                        leftWidth={leftWidth}
                        rightWidth={rightWidth}
                        fatherWidth={fatherWidth}
                        handleChangeFile={handleChangeFile}
                        handleChatSubmit={handleChatSubmit}
                        handleChangeSubmit={handleChangeSubmit}
                    />
                </Box>
            </Box>
        </Box>
    );
}

Chat.propTypes = {
    window: PropTypes.func,
};

export default Chat;
