import { useColorMode } from "../../../Hooks/ColorMode";
import { Box, IconButton, useTheme } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

export const ColorMode = () => {
    const theme = useTheme();
    const { colorMode } = useColorMode();
    return (
        <Box
            sx={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "background.default",
                color: "text.primary",
                borderRadius: 1,
                p: 3,
            }}
        >
            {theme.palette.mode}
            <IconButton
                sx={{ ml: 1 }}
                onClick={colorMode.toggleColorMode}
                color="inherit"
            >
                {theme.palette.mode === "dark" ? (
                    <Brightness7Icon />
                ) : (
                    <Brightness4Icon />
                )}
            </IconButton>
        </Box>
    );
};
