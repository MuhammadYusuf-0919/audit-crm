import Chat from "../Pages/Chat/Chat";
import Login from "../Auth/Login/Login";
import ActAudit from "../Pages/Act/Act";
import Users from "../Pages/Users/Users";
import LayoutMenu from "../Layout/Layout";
import { useSelector } from "react-redux";
import Profile from "../Pages/Profile/Profile";
import MailApp from "../Pages/MailApp/MailApp";
import BranchComp from "../Pages/Branch/Branch";
import { Route, Routes } from "react-router-dom";
import Byudject from "../Pages/Category/Byudjet";
import Error404 from "../Modules/ErrorPages/Error404";
import Error500 from "../Modules/ErrorPages/Error500";
import AuditingComp from "../Pages/Auditing/Auditing";
import CategoryComp from "../Pages/Category/Category";
import Jadval from "../Pages/Category/Byudjet/Jadval";
import Statistic from "../Pages/Category/Statistic/Statistic";
import Dastur from "../Pages/Category/Audittekshiruvi/Dastur";
import YakJadval from "../Pages/Category/YillikReja/YakJadval";
import Sorovnoma from "../Pages/Category/YillikReja/Sorovnoma";
import Monitoring from "../Pages/Category/Monitoring/Monitoring";
import Bildirishnoma from "../Pages/Category/Audittekshiruvi/Bildirishnoma";
import SorovnomaNatijasi from "../Pages/Category/YillikReja/Sorovnoma/SorovnomaNatijasi";
import TekshiruvNatijalari from "../Pages/Category/TekshiruvNatijalari/TekshiruvNatijalari";
// import Template from "./Pages/Template";

const RoutesPage = () => {
    let authData = useSelector((state) => state.authReducer?.authData?.data);
    return (
        <Routes>
            <Route element={<LayoutMenu />}>
                <Route index element={<Monitoring />} />
                {authData?.roleId === 1 || authData?.roleId === 2 ? (
                    <>
                        <Route path="auditing" element={<AuditingComp />} />
                        <Route path="category" element={<CategoryComp />} />
                        <Route path="branchs" element={<BranchComp />} />
                        <Route path="xodimlar" element={<Users />} />
                        <Route
                            path="yillikReja/surovnomalar"
                            element={<Sorovnoma />}
                        />
                        <Route
                            path="yillikReja/surovnoma-natijasi"
                            element={<SorovnomaNatijasi />}
                        />
                        <Route path="budjet" element={<Byudject />} />
                        <Route path="budjet/jadval" element={<Jadval />} />
                        <Route
                            path="yakuniy-reja/jadval"
                            element={<YakJadval />}
                        />
                        <Route path="audit-check/app" element={<Dastur />} />
                        <Route
                            path="audit-check/notification"
                            element={<Bildirishnoma />}
                        />
                        <Route
                            path="result"
                            element={<TekshiruvNatijalari />}
                        />
                        <Route path="monitoring" element={<Monitoring />} />
                        <Route path="statistic" element={<Statistic />} />
                        <Route path="maill-app" element={<MailApp />} />
                        <Route path="act-audit" element={<ActAudit />} />
                        <Route path="chat" element={<Chat />} />
                        <Route path="profile" element={<Profile />} />
                        {/* <Route path="example" element={<Template />} /> */}
                    </>
                ) : (
                    <>
                        <Route path="chat" element={<Chat />} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="maill-app" element={<MailApp />} />
                        <Route path="act-audit" element={<ActAudit />} />
                        <Route path="monitoring" element={<Monitoring />} />
                    </>
                )}
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Error404 />} />
            <Route path="server-error" element={<Error500 />} />
        </Routes>
    );
};

export default RoutesPage;
