import InputEmoji from "react-input-emoji";
import { Box, IconButton } from "@mui/material";
import sendIcon from "../../Assets/Images/sendIcon.png";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import KeyboardVoiceOutlinedIcon from "@mui/icons-material/KeyboardVoiceOutlined";

export const ChatFormFooter = ({
    messages,
    appWidth,
    leftWidth,
    rightWidth,
    fatherWidth,
    handleChangeFile,
    handleChatSubmit,
    handleChangeSubmit,
}) => {
    return (
        <Box
            justifyContent="space-around"
            position="fixed"
            sx={{
                width: {
                    md: `calc(100% - ${appWidth}px)`,
                    xs: "100%",
                },
                ml: { md: `${fatherWidth + leftWidth}px` },
                bottom: 0,
                right: { md: rightWidth, xs: 0 },
                zIndex: "1 !important",
                padding: "10px",
                backgroundColor: "#fff !important",
                display: "flex",
                alignItems: "center",
            }}
        >
            <IconButton
                aria-label="upload picture"
                component="label"
                color="inherit"
            >
                <AttachFileIcon
                    sx={{
                        color: "grey",
                        fontSize: "30px",
                        cursor: "pointer",
                        transform: "rotate(220deg)",
                    }}
                />
                <Box
                    hidden
                    type="file"
                    component="input"
                    onChange={handleChangeFile}
                />
            </IconButton>
            <InputEmoji
                type="submit"
                value={messages}
                onChange={handleChangeSubmit}
            />
            {messages ? (
                <Box onClick={handleChatSubmit}>
                    <IconButton
                        color="inherit"
                        aria-label="send"
                        sx={{ p: 1, display: "initial" }}
                    >
                        <Box
                            className="send-icon"
                            component="img"
                            src={sendIcon}
                            sx={{
                                width: "30px",
                                height: "30px",
                                borderRadius: "50%",
                            }}
                        />
                    </IconButton>
                </Box>
            ) : (
                <IconButton
                    aria-label="voice"
                    color="inherit"
                    sx={{ display: "initial" }}
                >
                    <KeyboardVoiceOutlinedIcon
                        sx={{
                            cursor: "pointer",
                            color: "grey",
                            fontSize: "30px",
                        }}
                    />
                </IconButton>
            )}
        </Box>
    );
};
