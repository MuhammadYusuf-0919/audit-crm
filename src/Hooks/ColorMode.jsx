import { useContext } from "react";
import { ColorModeContext } from "../Context/ColorModeContext";

export function useColorMode() {
    return useContext(ColorModeContext);
}
