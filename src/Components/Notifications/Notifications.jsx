import {
    Menu,
    Avatar,
    Divider,
    Tooltip,
    MenuItem,
    Typography,
    IconButton,
    ListItemText,
    ListItemAvatar,
} from "@mui/material";
import moment from "moment";
import instance from "../../Api/Axios";
import { Link } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import MarkUnreadChatAltIcon from "@mui/icons-material/MarkUnreadChatAlt";

export const NotificationsMenu = ({
    id,
    url,
    data,
    open,
    close,
    title,
    routeLink,
    rightTheme,
    messagesEl,
    getResponse,
}) => {
    return (
        <Menu
            anchorEl={messagesEl}
            id={id}
            keepMounted
            open={open}
            onClose={close}
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
                        top: 0,
                        width: 10,
                        zIndex: 0,
                        height: 10,
                        right: rightTheme,
                        display: "block",
                        position: "absolute",
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                    },
                },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
            <MenuItem>
                <Typography subtitle2="h2">{title}</Typography>
            </MenuItem>
            <Divider />
            {data.count > 0 ? (
                data?.messages?.map((item) => (
                    <MenuItem
                        key={item.id}
                        onClick={() => {
                            instance
                                .put(url + item.id)
                                .then(() => getResponse())
                                .catch((err) => console.error(err));
                        }}
                    >
                        <Link
                            key={item.id}
                            to={routeLink}
                            component={RouterLink}
                            variant="subtitle6"
                            style={{
                                color: "unset",
                                display: "contents",
                            }}
                        >
                            <ListItemAvatar sx={{ minWidth: 0 }}>
                                <Avatar
                                    alt={`${item.senderUsername}`}
                                    src={`/static/images/avatar/${
                                        item + 1
                                    }.jpg`}
                                />
                            </ListItemAvatar>
                            <ListItemText
                                primary={item.senderUsername}
                                secondary={
                                    item?.message
                                        .split("")
                                        .slice(0, 25)
                                        .join("") + "..."
                                }
                            />
                            <Typography
                                sx={{
                                    color: "#455A64",
                                    fontSize: "0.9rem",
                                    marginBottom: "auto",
                                }}
                                component="span"
                            >
                                {moment(item?.date).format("LT")}
                            </Typography>
                        </Link>
                        <Tooltip title="Delete" placement="top-end">
                            <IconButton
                                sx={{
                                    marginLeft: "10px",
                                    marginBottom: "auto",
                                    padding: 0,
                                }}
                                edge="end"
                                aria-label="delete"
                                onClick={() => {
                                    instance
                                        .put(url + item.id)
                                        .then(() => getResponse())
                                        .catch((err) => console.error(err));
                                }}
                            >
                                <MarkUnreadChatAltIcon />
                            </IconButton>
                        </Tooltip>
                    </MenuItem>
                ))
            ) : (
                <Typography sx={{ textAlign: " center" }}>
                    Yangi xabarlar yo'q!
                </Typography>
            )}
        </Menu>
    );
};
