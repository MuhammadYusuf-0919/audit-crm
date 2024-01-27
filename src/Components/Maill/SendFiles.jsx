import {
    Box,
    Typography,
    styled,
    Avatar,
    CardMedia,
    Card,
    CardContent,
    CardHeader,
    IconButton,
    CardActions,
    Collapse,
} from "@mui/material";
import moment from "moment";
import * as React from "react";
import { useData } from "../../Hooks/UseData";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { SvgEmptyImages } from "../../Assets/Svg/SvgImages";

const SendFiles = () => {
    const [expanded, setExpanded] = React.useState(false);
    const { emailSendData } = useData();
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const StyledGridOverlay = styled("div")(({ theme }) => ({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        "& .ant-empty-img-1": {
            fill: theme.palette.mode === "light" ? "#aeb8c2" : "#262626",
        },
        "& .ant-empty-img-2": {
            fill: theme.palette.mode === "light" ? "#f5f5f7" : "#595959",
        },
        "& .ant-empty-img-3": {
            fill: theme.palette.mode === "light" ? "#dce0e6" : "#434343",
        },
        "& .ant-empty-img-4": {
            fill: theme.palette.mode === "light" ? "#fff" : "#1c1c1c",
        },
        "& .ant-empty-img-5": {
            fillOpacity: theme.palette.mode === "light" ? "0.8" : "0.08",
            fill: theme.palette.mode === "light" ? "#f5f5f5" : "#fff",
        },
    }));
    function CustomNoRowsOverlay() {
        return (
            <StyledGridOverlay>
                <SvgEmptyImages />
                <Box sx={{ mt: 1 }}>No Columns</Box>
            </StyledGridOverlay>
        );
    }
    const ExpandMore = styled((props) => {
        const { expand, ...other } = props;
        return <IconButton {...other} />;
    })(({ theme, expand }) => ({
        transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest,
        }),
    }));

    return (
        <Box
            sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: "30px",
                justifyContent: "center",
            }}
        >
            {emailSendData?.length > 0 ? (
                emailSendData.map((item) => (
                    <Card
                        key={item.fileId}
                        sx={{
                            width: {
                                xs: "100%",
                                sm: "40%",
                                md: "45%",
                                lg: "30%",
                            },
                            height: "280px",
                            borderRadius: "20px",
                        }}
                    >
                        <CardHeader
                            avatar={<Avatar aria-label="recipe">R</Avatar>}
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title={`Kimga:${
                                item.emailTo.split("").slice(0, 15).join("") +
                                "..."
                            }`}
                            subheader={moment(item.date).format("ll")}
                        />
                        <CardMedia
                            component="img"
                            height="160"
                            alt="Fayl"
                            image={`https://project2-java.herokuapp.com/api/audit/department/attachment/download/${item.fileId}`}
                        />
                        <CardContent>
                            <Typography paragraph>{item?.fileID}</Typography>
                        </CardContent>
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                {item.subject}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <ExpandMore
                                expand={expanded}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="show more"
                            >
                                <ExpandMoreIcon />
                            </ExpandMore>
                        </CardActions>
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <CardContent>
                                <Typography paragraph>Method:</Typography>
                                <Typography paragraph>
                                    {item.content}
                                </Typography>
                            </CardContent>
                        </Collapse>
                    </Card>
                ))
            ) : (
                <Box sx={{ height: "100%" }} component={CustomNoRowsOverlay} />
            )}
        </Box>
    );
};

export default SendFiles;
