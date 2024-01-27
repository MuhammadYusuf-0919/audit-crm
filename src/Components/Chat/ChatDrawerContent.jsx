import {
    Box,
    Tab,
    Tabs,
    List,
    Avatar,
    Divider,
    Toolbar,
    ListItem,
    ListItemText,
    ListItemAvatar,
} from "@mui/material";
import UsersList from "./UsersList";
import { avatarUrl } from "../../Api/Axios";
import { TabContext, TabPanel } from "@mui/lab";

export const DrawerContent = ({
    value,
    profile,
    fakeData,
    userData,
    usersData,
    handleChange,
    selectedUser,
    handleDrawerToggle,
}) => {
    return (
        <Box>
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
                    gap: "10px",
                }}
            >
                <Toolbar
                    sx={{
                        backgroundColor: "#fff",
                        color: "#616161",
                        justifyContent: "center",
                        gap: "10px",
                    }}
                >
                    <List
                        sx={{
                            width: "100%",
                            maxWidth: 360,
                            bgcolor: "background.paper",
                        }}
                    >
                        <ListItem
                            alignItems="flex-start"
                            sx={{ p: 0, gap: "10px", alignItems: "center" }}
                        >
                            <ListItemAvatar
                                aria-label="open drawer"
                                edge="start"
                            >
                                <Avatar
                                    alt={`${profile?.userName}`}
                                    sx={{ width: 50, height: 50 }}
                                    src={
                                        userData?.photoId !== fakeData
                                            ? avatarUrl(userData?.photoId)
                                            : fakeData
                                    }
                                />
                            </ListItemAvatar>
                            <ListItemText
                                primary={`${profile?.fio}`}
                                secondary={`${profile?.email}`}
                            />
                        </ListItem>
                    </List>
                </Toolbar>
                <Divider />
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    sx={{ width: "100%" }}
                >
                    <Tab value={"0"} label="Chats" sx={{ width: "50%" }} />
                    <Tab value={"1"}label="Contacts" sx={{ width: "50%" }} />
                </Tabs>
            </Box>
            <Divider />
            <TabContext value={value}>
                <TabPanel value={"0"} className="chat-panel">
                    <UsersList
                        fakeData={fakeData}
                        avatarUrl={avatarUrl}
                        getData={selectedUser}
                        toggle={handleDrawerToggle}
                    />
                </TabPanel>
                <TabPanel value={"1"} className="chat-panel">
                    <UsersList
                        getData={usersData}
                        fakeData={fakeData}
                        avatarUrl={avatarUrl}
                        toggle={handleDrawerToggle}
                    />
                </TabPanel>
            </TabContext>
            <Divider />
        </Box>
    );
};
