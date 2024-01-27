import {
    Box,
    Fade,
    Link,
    List,
    Avatar,
    Switch,
    Toolbar,
    Divider,
    ListItem,
    Snackbar,
    IconButton,
    Typography,
    ListItemIcon,
    ListItemText,
    ListItemAvatar,
    ListItemButton,
} from "@mui/material";
import "./DocDrawer.css";
import React from "react";
import { ListItemComponent } from "./ListItem";
// import { CopyToClipboard } from "react-copy-to-clipboard";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ReportOutlinedIcon from "@mui/icons-material/ReportOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
// import reactElementToJSXString from 'react-element-to-jsx-string';
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { DrawerContent } from "../../../Api/Data";
export const DawerDoc = ({ current, fakeData, avatarUrl, open, setOpen }) => {
    const [snack, setSnack] = React.useState(false);
    const handleClick = () => {
        setSnack(true);
    };

    const handleClose = () => {
        setSnack(false);
    };
    const label = { inputProps: { "aria-label": "Color switch demo" } };
    return (
        <Box sx={{ overflowY: "auto", height: "90%" }}>
            <Box
                sx={{
                    position: "sticky",
                    top: 0,
                    right: 0,
                    left: 0,
                    zIndex: 99,
                    backgroundColor: "#fff",
                    color: "#616161",
                    justifyContent: "center",
                    gap: "15px",
                }}
            >
                <Toolbar
                    sx={{
                        p: "0 20px !important",
                        position: "sticky",
                        top: 0,
                        right: 0,
                        backgroundColor: "#fff",
                        color: "#616161",
                        justifyContent: "center",
                        gap: "10px",
                        userSelect: "none",
                        display: "block",
                        height: "74px",
                        zIndex: 2,
                    }}
                >
                    <Box
                        sx={{
                            p: "17px 0",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Typography>User info</Typography>
                        <IconButton aria-label="cancel">
                            <CloseOutlinedIcon
                                onClick={() => setOpen(!open)}
                                sx={{ borderRadius: "50%", cursor: "pointer" }}
                            />
                        </IconButton>
                    </Box>
                </Toolbar>
                <Divider sx={{ width: "100%" }} />
                <List
                    sx={{
                        width: "100%",
                        maxWidth: 360,
                        p: "10px 20px",
                        bgcolor: "background.paper",
                    }}
                >
                    <ListItem
                        alignItems="flex-start"
                        sx={{ p: 0, gap: "20px", alignItems: "center" }}
                    >
                        <ListItemAvatar
                            aria-label="open drawer"
                            edge="start"
                            sx={{ m: 0 }}
                        >
                            <Avatar
                                alt={`${current?.userName}`}
                                sx={{ width: 70, height: 70 }}
                                src={
                                    current?.photoId !== fakeData
                                        ? avatarUrl(current?.photoId)
                                        : fakeData
                                }
                            />
                        </ListItemAvatar>
                        <ListItemText
                            primary={`${current?.fio}`}
                            secondary={`${current?.email}`}
                        />
                    </ListItem>
                </List>
                <Divider sx={{ borderWidth: "5px" }} />
                <List>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <ReportOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={current?.phoneNumber}
                                secondary="Mobile"
                            />
                        </ListItemButton>
                    </ListItem>
                    <ListItem
                        disablePadding
                        sx={{ marginLeft: "auto", width: "73%" }}
                    >
                        <ListItemText
                            primary={
                                // <CopyToClipboard
                                //     text={reactElementToJSXString(
                                //         current?.userName,
                                //         {
                                //             showFunctions: true,
                                //             maxInlineAttributesLineLength: 100,
                                //         }
                                //     )}
                                // >
                                <Link
                                    href="#"
                                    underline="hover"
                                    onClick={handleClick}
                                >
                                    {`@${current?.userName}`}
                                </Link>
                                // </CopyToClipboard>
                            }
                            secondary="Username"
                        />
                        <Snackbar
                            sx={{ width: "20%", fontSize: "50px" }}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "center",
                            }}
                            TransitionComponent={Fade}
                            open={snack}
                            color="warning"
                            onClose={handleClose}
                            message="Link copied to clipboard"
                            // key={"top" + "center"}
                        />
                    </ListItem>
                    <Divider />
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <NotificationsNoneOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Notifications" />
                            <ListItemIcon>
                                <Switch
                                    {...label}
                                    defaultChecked
                                    disabled
                                    color="default"
                                />
                            </ListItemIcon>
                        </ListItemButton>
                    </ListItem>
                </List>
                <Divider sx={{ borderWidth: "5px" }} />
                <List>
                    {
                        DrawerContent?.map((item, index) => (
                            <ListItemComponent
                                key={index}
                                text={item.text}
                                Icon={item.icon}
                            />
                        ))
                    }
                </List>
                <Divider sx={{ borderWidth: "5px" }} />
                <List>
                    <ListItemComponent
                        text={`Edit contact`}
                        Icon={ModeEditOutlineOutlinedIcon}
                    />
                    <ListItemComponent
                        text={`Delete contact`}
                        Icon={DeleteOutlinedIcon}
                    />
                </List>
            </Box>
        </Box>
    );
};
