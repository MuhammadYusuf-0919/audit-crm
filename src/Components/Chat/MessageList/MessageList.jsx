import './Message.css';
import React from "react";
import moment from "moment";
import { Avatar, Box, Typography } from "@mui/material";

export const MessageList = ({
    profile,
    current,
    fakeData,
    messages,
    avatarUrl,
}) => {
    const scroll = React.useRef();
    React.useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
    const handleDate = (arr) => [...new Set(arr?.map(({ date }) => date))];
    return (
        <Box className="chat-body">
            {messages?.length > 0 ? (
                <Typography
                    sx={{ textAlign: "center" }}
                    className="message-not message-month"
                >
                    {moment(messages[0].date).format("ll")}
                </Typography>
            ) : (
                ""
            )}
            {messages?.length > 0 ? (
                messages.map((message, index) => (
                    <>
                        {moment(messages[index ? index - 1 : 0].date).format(
                            "ll"
                        ) !==
                            moment(
                                handleDate(messages).find(
                                    (e) => e === message?.date
                                )
                            ).format("ll") && (
                            <Typography
                                key={message.id}
                                sx={{ textAlign: "center" }}
                                className="message-not message-month"
                            >
                                {moment(
                                    handleDate(messages).find(
                                        (e) => e === message?.date
                                    )
                                ).format("ll")}
                            </Typography>
                        )}
                        <Box
                            sx={{
                                display:
                                    message.messageSender === profile.id
                                        ? "contents"
                                        : "flex",
                            }}
                        >
                            <Box
                                sx={{
                                    display: {
                                        xs: "none",
                                        md: "flex",
                                    },
                                }}
                            >
                                <Avatar
                                    alt={`${current?.userName}`}
                                    src={
                                        current?.photoId !== fakeData
                                            ? avatarUrl(current?.photoId)
                                            : fakeData
                                    }
                                    sx={{
                                        display:
                                            current?.id ===
                                            message.messageSender
                                                ? "flex"
                                                : "none",
                                        width: "45px",
                                        height: "45px",
                                        marginRight: "15px",
                                    }}
                                />
                            </Box>
                            <Box
                                ref={scroll}
                                key={message.id}
                                className={
                                    message.messageSender === profile.id
                                        ? "message own"
                                        : "message"
                                }
                            >
                                <Typography
                                    sx={{ color: " #fff" }}
                                    component="span"
                                >
                                    {message.message}
                                </Typography>{" "}
                                <Typography
                                    sx={{
                                        color: "#455A64",
                                        fontSize: "0.9rem",
                                        marginLeft: "auto",
                                    }}
                                    component="span"
                                >
                                    {message.date !== null
                                        ? moment(message.date).format("LT")
                                        : ""}
                                </Typography>
                            </Box>
                        </Box>
                    </>
                ))
            ) : (
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        textAlign: "center",
                        justifyContent: "center",
                        height: "100%",
                    }}
                >
                    {current == null ? (
                        <Typography className="message-not">
                            Select a chat to start messaging
                        </Typography>
                    ) : (
                        <Typography className="message-not">
                            Start messaging
                        </Typography>
                    )}
                </Box>
            )}
        </Box>
    );
};
