import {
    Box,
    Fab,
    Toolbar,
    CssBaseline,
    useMediaQuery,
} from "@mui/material";
import React from "react";
import Main from "./Styles";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import ScrollTop from "../Components/KeyboardScroll";
import { useDispatch, useSelector } from "react-redux";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function LayoutMenu(props) {
    const theme = useTheme();
    const dispatch = useDispatch();
    const matchDownMd = useMediaQuery(theme.breakpoints.down("md"));
    let { menuOpen } = useSelector((state) => state.menuReducer);
    const [open, setOpen] = React.useState(!matchDownMd ? menuOpen : false);

    const handleDrawerToggle = () => {
        setOpen(!open);
        dispatch({ type: "MENU_SUCCESS", menuOpen: !open });
    };

    return (
        <Box>
            <CssBaseline />
            <Toolbar id="back-to-top-anchor">
                <Header open={open} handleDrawerToggle={handleDrawerToggle} />
            </Toolbar>
            <Box sx={{ display: { md: "flex", sm: "block" } }}>
                <Sidebar open={open} handleDrawerToggle={handleDrawerToggle} />
                <Main theme={theme} open={open} md={matchDownMd}>
                    <ScrollTop {...props}>
                        <Fab
                            sx={{
                                ":hover": {
                                    backgroundColor: "#ffffff",
                                    color: "black",
                                },
                                ":active": {
                                    backgroundColor: "#A4A4A3",
                                    color: "#ffffff",
                                },
                                backgroundColor: "#A4A4A3",
                                color: "#F5F5F5",
                                width: "45px",
                                height: "45px",
                            }}
                            size="small"
                            aria-label="scroll back to top"
                        >
                            <KeyboardArrowUpIcon sx={{ fontSize: "1.6rem" }} />
                        </Fab>
                    </ScrollTop>
                    {/* <Breadcrumbs separator={IconChevronRight} navigation={navigation} icon title rightAlign /> */}
                    <Outlet />
                </Main>
            </Box>
        </Box>
    );
}
