// import * as React from 'react';
// import { DocumentEditorComponent, WordExport, SfdtExport } from '@syncfusion/ej2-react-documenteditor';

// //Inject require modules.
// DocumentEditorComponent.Inject(WordExport, SfdtExport);
// function Template() {
// let documenteditor: DocumentEditorComponent;
// function save() {
//     let http: XMLHttpRequest = new XMLHttpRequest();
//     // http.open('POST', 'http://localhost:5000/api/documenteditor/ExportSFDT');
//     // http.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
//     // http.responseType = 'json';
//     // //Serialize document content as SFDT.
//     // let sfdt: any = { content: documenteditorh.serialize() };
//     // //Send the sfdt content to server side.
//     // http.send(JSON.stringify(sfdt));
//     instance
//             .send(
//                 `api/audit/department/descriptionOfAuditing${JSON.stringify(sfdt)}`
//             )
//             .then((data) => {
//                 setPageData((prev) => ({
//                     ...prev,
//                     categorys: data.data?.data?.auditingPage,
//                 }));
//             })
//             .catch((error) => {
//                 console.error(error);
//                 if (error.response?.status === 500) navigate("/server-error");
//                 message.error("Aktlarni yuklashda muammo bo'ldi");
//             })
//             .finally(() =>
//                 setPageData((prev) => ({ ...prev, loading: false }))
//             );
// }
// return (
//     <div>
//         <button onClick={save}>Save</button>
//         <DocumentEditorComponent id="container" height={'330px'} ref={(scope) => { documenteditor = scope; }} enableWordExport={true} enableSfdtExport={true} enableTextExport={true} />
//     </div>
// );
// }
// export default Template;




// import React, { useState, useEffect } from 'react';
// import SockJS from 'sockjs-client';
// import Stomp from 'stompjs';

// const Chat = ({ userName }) => {
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [newMessages, setNewMessages] = useState(new Map());
//   const socket = socketIO.connect('https://project2-java.herokuapp.com/');
//   let stompClient;
//  const url = "https://project2-java.herokuapp.com/";
//   useEffect(() => {
//     connectToChat(userName);
//     return () => {
//       stompClient.disconnect();
//     }
//   }, [userName]);

//   function connectToChat(userName) {
//     let socket = new SockJS(url + '/chat');
//     stompClient = Stomp.over(socket);
//     stompClient.connect({}, function (frame) {
//         stompClient.subscribe("/topic/messages/" + userName, function (response) {
//             let data = JSON.parse(response.body);
//             if (selectedUser === data.fromLogin) {
//                 render(data.message, data.fromLogin);
//             } else {
//                 let newMap = new Map(newMessages);
//                 newMap.set(data.fromLogin, data.message);
//                 setNewMessages(newMap);
//             }
//         });
//     });
//   }

//   function render(message, fromLogin) {
//     // Code for rendering the message
//   }

//   return (
//     <div>
//       {/* Code for displaying the messages and new messages count */}
//     </div>
//   );
// }

import "./Chat.css";
import {
    Box,
    Tab,
    Tabs,
    List,
    AppBar,
    Drawer,
    Avatar,
    Button,
    Divider,
    Toolbar,
    ListItem,
    Typography,
    IconButton,
    CssBaseline,
    ListItemText,
    useMediaQuery,
    ListItemAvatar,
    CircularProgress,
} from "@mui/material";
import Stomp from "stompjs";
import * as React from "react";
import PropTypes from "prop-types";
import SockJS from "sockjs-client";
import instance from "../../Api/Axios";
import { useSelector } from "react-redux";
import InputEmoji from "react-input-emoji";
import { useData } from "../../Hook/UseData";
// import MuiAppBar from "@mui/material/AppBar";
// import MuiDrawer from "@mui/material/Drawer";
import { TabContext, TabPanel } from "@mui/lab";
import { useTheme } from '@mui/material/styles';
// import { styled } from "@mui/material/styles";
import UsersList from "../../Components/UsersList";
import SearchIcon from "@mui/icons-material/Search";
import sendIcon from "../../Assets/Images/sendIcon.png";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { SvgRightImages } from "../../Assets/Svg/SvgImages";
import { DawerDoc } from "../../Components/DocDrawer/DocDrawer";
import { MessageList } from "../../Components/MessageList/MessageList";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import KeyboardVoiceOutlinedIcon from "@mui/icons-material/KeyboardVoiceOutlined";
const three = 30;
var stompClient = null;
const drawerWidth = 280;
const fakeData = "3fa85f64-5717-4562-b3fc-2c963f66afa6";

// const openedMixin = (theme) => ({
//     width: drawerWidth,
//     transition: theme.transitions.create("width", {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.enteringScreen,
//     }),
//     overflowX: "hidden",
// });

// const closedMixin = (theme) => ({
//     transition: theme.transitions.create("width", {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.leavingScreen,
//     }),
//     overflowX: "hidden",
//     width: `calc(${theme.spacing(7)} + 1px)`,
//     [theme.breakpoints.up("sm")]: {
//         width: `calc(${theme.spacing(8)} + 1px)`,
//     },
// });

//   const DrawerHeader = styled('div')(({ theme }) => ({
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//     padding: theme.spacing(0, 1),
//     // necessary for content to be below app bar
//     ...theme.mixins.toolbar,
//   }));

//   const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
//     ({ theme, open }) => ({
//       width: drawerWidth,
//       flexShrink: 0,
//       whiteSpace: 'nowrap',
//       boxSizing: 'border-box',
//       transition: theme.transitions.create('width', {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.leavingScreen,
//       }),
//     //   ...(open && {
//     //     ...openedMixin(theme),
//     //     '& .MuiDrawer-paper': openedMixin(theme),
//     //   }),
//     //   ...(!open && {
//     //     ...closedMixin(theme),
//     //     '& .MuiDrawer-paper': closedMixin(theme),
//     //   }),
//     }),
//   );

// const AppBar = styled(MuiAppBar, {
//     shouldForwardProp: (prop) => prop !== "openRight",
// })(({ theme, openRight }) => ({
//     zIndex: theme.zIndex.drawer + 1,
//     transition: theme.transitions.create(["width", "margin"], {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.leavingScreen,
//     }),
//     ...(openRight && {
//         transition: theme.transitions.create(["width", "margin"], {
//             easing: theme.transitions.easing.sharp,
//             duration: theme.transitions.duration.enteringScreen,
//         }),
//     }),
// }));

// const Main = styled("main", {
//     shouldForwardProp: (prop) => prop !== "openRight",
// })(({ theme, openRight }) => ({
//     flexGrow: 1,
//     padding: theme.spacing(3),
//     transition: theme.transitions.create("margin", {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.leavingScreen,
//     }),
//     ...(openRight && {
//         transition: theme.transitions.create("margin", {
//             easing: theme.transitions.easing.easeOut,
//             duration: theme.transitions.duration.enteringScreen,
//         }),
//         marginRight: 0,
//     }),
// }));
// const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
//     ({ theme, open }) => ({
//       flexGrow: 1,
//       padding: theme.spacing(3),
//       transition: theme.transitions.create('margin', {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.leavingScreen,
//       }),
//       marginLeft: `-${drawerWidth}px`,
//       ...(open && {
//         transition: theme.transitions.create('margin', {
//           easing: theme.transitions.easing.easeOut,
//           duration: theme.transitions.duration.enteringScreen,
//         }),
//         marginLeft: 0,
//       }),
//     }),
//   );
  
//   const AppBar = styled(MuiAppBar, {
//     shouldForwardProp: (prop) => prop !== 'open',
//   })(({ theme, open }) => ({
//     transition: theme.transitions.create(['margin', 'width'], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     ...(open && {
//       width: `calc(100% - ${drawerWidth}px)`,
//       marginLeft: `${drawerWidth}px`,
//       transition: theme.transitions.create(['margin', 'width'], {
//         easing: theme.transitions.easing.easeOut,
//         duration: theme.transitions.duration.enteringScreen,
//       }),
//     }),
//   }));
  
//   const DrawerHeader = styled('div')(({ theme }) => ({
//     display: 'flex',
//     alignItems: 'center',
//     padding: theme.spacing(0, 1),
//     // necessary for content to be below app bar
//     ...theme.mixins.toolbar,
//     justifyContent: 'flex-end',
//   }));
