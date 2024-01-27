import {
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemButton,
} from "@mui/material";

export const ListItemComponent = ({ Icon, text }) => {
    return (
        <ListItem disablePadding>
            <ListItemButton>
                <ListItemIcon>
                    <Icon />
                </ListItemIcon>
                <ListItemText primary={`${text}`} />
            </ListItemButton>
        </ListItem>
    );
};
