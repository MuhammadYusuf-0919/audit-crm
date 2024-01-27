import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const siginIn = (newUser, cb) => {
        setUser(newUser);
        cb();
        // const location = useLocation();
        // const fromPage = location.state?.from?.pathname || '/';
        // cb() =  () => navigate(fromPage, { replace: true })
    };

    const signOut = (cb) => {
        setUser(null);
        cb();
        // cb() = () => signOut(() => navigate('/', { replace: true }))
    };

    const value = { user, siginIn, signOut };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
