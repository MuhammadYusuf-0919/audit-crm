import {
    List,
    Avatar,
    Divider,
    Typography,
    ListItemText,
    ListItemAvatar,
    ListItemButton,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";

const UsersList = ({ getData, toggle, avatarUrl, fakeData }) => {
    const [selected, setSelected] = React.useState(null);
    const dispatch = useDispatch();

    const handleCurrentButton = (event, item, index) => {
        event.preventDefault();
        dispatch({type: 'USER_SUCCESS', currentUser: item})
        setSelected(index);
    };

    return (
        <List
            sx={{
                width: "100%",
                maxWidth: 360,
                bgcolor: "background.paper",
            }}
            component="nav"
            onClick={toggle}
        >
            {getData?.map((item, index) => (
                <>
                    <ListItemButton
                        key={index}
                        alignItems="flex-start"
                        selected={index === selected}
                        onClick={(event) => {
                            handleCurrentButton(event, item, index);
                        }}
                        sx={{
                            "&.Mui-selected": {
                                backgroundColor: "#9e9e9e7a",
                                color: "#fff",
                            },
                            ":hover": {
                                backgroundColor: "rgba(0, 0, 0, 8%)",
                            },
                        }}
                    >
                        <ListItemAvatar>
                            <Avatar
                                alt={`${item?.userName}`}
                                src={
                                    item?.photoId !==
                                    fakeData
                                        ? avatarUrl + item?.photoId
                                        : fakeData
                                }
                            />
                        </ListItemAvatar>
                        <ListItemText
                            primary={item?.userName}
                            secondary={
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {"Description"}
                                </Typography>
                            }
                        />
                        {/* <Typography
                            sx={{ display: "inline-block" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            Date
                        </Typography> */}
                    </ListItemButton>
                    <Divider variant="inset" component="li" />
                </>
            ))}
        </List>
    );
};

export default UsersList;
