import { Button, Result } from "antd";
import ThemeProvider from "../Themes";
import Login from "../Auth/Login/Login";
import useToken from "../Hooks/UseToken";
import RoutesPage from "../Routes/Routes";
import useNetwork from "../Hooks/UseNetwork";
import { AxiosInterceptor } from "../Api/Axios";
import ScrollTop from "../Components/ScrollTop";
import { DataProvider } from "../Context/DataContext";
import { TableProvider } from "../Context/TableContext";
import { Navigate, Route, Routes } from "react-router-dom";
import { ColorModeProvider } from "../Context/ColorModeContext";

function App() {
    const { token } = useToken();
    const { isOnline: isNetwork } = useNetwork();

    return (
        <>
            {!isNetwork ? (
                <>
                    <Result
                        status="404"
                        title="No Internet Connection"
                        subTitle="Check your Internet Connection or your network."
                        extra={
                            <Button href="/" type="primary">
                                Try Again
                            </Button>
                        }
                    />
                </>
           ) :  ( 
                    <>
                        {!token ? (
                            <AxiosInterceptor>
                                <ColorModeProvider>
                                    <ThemeProvider>
                                        <ScrollTop>
                                            <DataProvider>
                                                <TableProvider>
                                                    <RoutesPage />
                                                </TableProvider>
                                            </DataProvider>
                                        </ScrollTop>
                                    </ThemeProvider>
                                </ColorModeProvider>
                            </AxiosInterceptor>
                        ) : (
                            <Routes>
                                <Route path="login" element={<Login />} />
                                <Route
                                    path="*"
                                    element={<Navigate to="/login" replace />}
                                />
                            </Routes>
                        )}
                    </>
                )
            }
        </>
    );
}

export default App;
