import { styled } from "@mui/material/styles";
import appDrawerWidth from "../Utils/constant";

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
    ({ theme, open, md }) => ({
        ...theme.typography.mainContent,
        backgroundColor: "#f5f5f5",
        padding: !md ? "40px 10px 20px 10px" : "40px 5px 10px 5px",
        minHeight: !md ? "calc(100vh - 64px)" : "calc(100vh - 56px)",
        ...(!open && {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            transition: theme.transitions.create("margin", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: "100%",
        }),
        ...(open && {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            width: `calc(100% - ${appDrawerWidth}px)`,
            transition: theme.transitions.create(["margin", "width"], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            [theme.breakpoints.up("md")]: {
                width: `calc(100% - ${appDrawerWidth}px)`,
            },
            [theme.breakpoints.up("xs")]: {
                width: "100%",
            },
            [theme.breakpoints.down("xs")]: {
                marginLeft: 0,
            },
        }),
    })
);

export default Main;