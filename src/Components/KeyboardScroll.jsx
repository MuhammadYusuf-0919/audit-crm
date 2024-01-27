import PropTypes from "prop-types";
import { Box, Fade } from "@mui/material";
import useScrollTrigger from "@mui/material/useScrollTrigger";

const ScrollTop = (props) => {
    const { children, window } = props;
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = (event) => {
        const anchor = (event.target.ownerDocument || document).querySelector(
            "#back-to-top-anchor"
        );

        if (anchor) {
            anchor.scrollIntoView({
                block: "center",
                behavior: "smooth",
            });
        }
    };

    return (
        <Fade in={trigger}>
            <Box
                onClick={handleClick}
                role="presentation"
                sx={{ position: "fixed", bottom: 50, right: 50, zIndex: 5 }}
            >
                {children}
            </Box>
        </Fade>
    );
}

export default ScrollTop;

ScrollTop.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func,
};