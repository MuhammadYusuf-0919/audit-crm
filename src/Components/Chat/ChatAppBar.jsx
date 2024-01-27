import { styled } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(
    ({
        md,
        open,
        theme,
        menuopen,
        appwidth,
        leftwidth,
        rightopen,
        rightwidth,
        fatherwidth,
        drawerwidth
    }) => ({
        position: "fixed",
        top: "60px !important",
        zIndex: "5 !important",
        padding: "25px 10px 5px 5px",
        backgroundColor: "#b0b3b6 !important",
        width: `calc(100% - ${md ? appwidth : 0}px)`,
        right: md ? rightwidth ? drawerwidth : 0 : 0,
        left: `${md ? fatherwidth + leftwidth : 0}px`,
        ...(open && {
            width: `calc(100% - ${md ? appwidth : 0}px)`,
            left: `${md ? fatherwidth + leftwidth : 0}px`,
        }),
        ...(menuopen && {
            width: `calc(100% - ${md ? appwidth : 0}px)`,
            left: `${md ? fatherwidth + leftwidth : 0}px`,
        }),
        ...(rightopen && {
            width: `calc(100% - ${md ? appwidth : 0}px)`,
            right: md ? rightwidth ? drawerwidth : 0 : 0,
        }),
           ...(!menuopen && {
            width: `calc(100% - ${md ? appwidth : 0}px)`,
            left: `${md ? fatherwidth + leftwidth : 0}px`,
        }),
        ...(!open && {
            width: `calc(100% - ${md ? appwidth : 0}px)`,
            left: `${md ? fatherwidth + leftwidth : 0}px`,
        }),
        ...(!rightopen && {
            width: `calc(100% - ${md ? appwidth : 0}px)`,
            right: md ? rightwidth ? drawerwidth : 0 : 0,
        }),
    })
);

export default AppBar;
