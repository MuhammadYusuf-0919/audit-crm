import { useState } from "react";

export default function useToken() {
    const getToken = () => {
        const tokenStringSes = sessionStorage.getItem("bank-audit-admin");
        const tokenStringLoc = localStorage.getItem("bank-audit-admin");
        const userToken = JSON.parse(tokenStringSes || tokenStringLoc);
        return userToken;
    };

    const [token, setToken] = useState(getToken());

    const saveToken = (userToken, save) => {
        save
            ? localStorage.setItem(
                  "bank-audit-admin",
                  JSON.stringify(userToken)
              )
            : sessionStorage.setItem(
                  "bank-audit-admin",
                  JSON.stringify(userToken)
              );
        setToken(userToken);
    };

    return {
        setToken: saveToken,
        token,
    };
}
