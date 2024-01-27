import { useContext } from "react";
import { TableContext } from "../Context/TableContext";

export function useTable() {
    return useContext(TableContext);
}
