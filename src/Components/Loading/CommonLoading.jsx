import { Box } from "@mui/material";
import Loading from "../../Assets/Images/Loading.gif";
import "./Loading1.css";
const CommonLoading = () => {
    return (
        <Box className="loading-wrapper">
            <Box component="img" src={Loading} alt="loading" />
        </Box>
    );
};

export default CommonLoading;
