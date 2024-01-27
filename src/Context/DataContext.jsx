import React, { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import instance from "../Api/Axios";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {

    const [branchData, setBranchData] = React.useState([]);
    const [usersData, setUsersData] = React.useState([]);
    const [userData, setUserData] = React.useState(null);
    const [auditingData, setAuditingData] = React.useState([]);
    const [filesData, setAllFilesData] = React.useState([]);
    const [roleData, setRoleData] = React.useState([]);
    const [emailSendData, setEmailSendData] = React.useState([]);
    const [chatsData, setChatsData] = React.useState([]);
    const [provinceData, setProvinceData] = React.useState([]);
    const [auditingCategoryData, setAuditingCategoryData] = React.useState([]);
    let authData = useSelector((state) => state.authReducer?.authData?.data);

    const getAuditingData = () => {
        instance
            .get("api/audit/department/api/audit/department/category")
            .then((data) => {
                setAuditingData(data.data?.data);
            })
            .catch((err) => console.error(err));
    };

    const getAuditingCategoryData = () => {
        instance
            .get("api/audit/department/auditingCategory/getAll")
            .then((data) => {
                setAuditingCategoryData(data.data?.data);
            })
            .catch((err) => console.error(err));
    };

    const getAllFilesData = () => {
        instance
            .get("api/audit/department/attachment/")
            .then((data) => {
                setAllFilesData(data.data.data);
            })
            .catch((err) => console.error(err));
    };

    const getUsersData = () => {
        instance
            .get("api/audit/department/user")
            .then((data) => {
                const userData = data.data.data.filter((item) => (
                    item.id !== authData?.id
                ))
                setUsersData(userData);
            })
            .catch((err) => console.error(err));
    };

    const getChatsData = () => {
        instance
            .get(`api/chat?username=${authData?.userName}`)
            .then((data) => {
                setChatsData(data.data?.data);
            })
            .catch((err) => console.error(err));
    };

    const getEmailSendData = () => {
        instance
            .get("api/audit/department/emailSendHistory/getAllEmailSendHistory")
            .then((data) => {
                setEmailSendData(data.data.data);
            })
            .catch((err) => console.error(err));
    };

    const getRoleData = () => {
        instance
            .get("role/list")
            .then((data) => {
                setRoleData(data.data.data);
            })
            .catch((err) => console.error(err));
    };

    const getBranchData = () => {
        instance
            .get("api/audit/department/api/audit/department/branch/getAll")
            .then((data) => {
                setBranchData(data.data?.data);
            })
            .catch((err) => console.error(err));
    };

    
    const getUserData = () => {
        instance
            .get(`api/audit/department/user/getProfile/${authData?.fio}`)
            .then((data) => {
                setUserData(data.data?.data);
            })
            .catch((err) => console.error(err));
    };

    const getProvinceData = () => {
        instance
            .get("api/audit/department/provinces/province")
            .then((data) => {
                setProvinceData(data.data?.data);
            })
            .catch((err) => console.error(err));
    };

    React.useEffect(() => {
        getUserData();
        getProvinceData();
        getAuditingCategoryData();
        getBranchData();
        getEmailSendData();
        getUsersData();
        getRoleData();
        getAuditingData();
        getAllFilesData();
    }, []);

    const value = {
        getUserData,
        getProvinceData,
        getAuditingCategoryData,
        getChatsData,
        getUsersData,
        getAllFilesData,
        getEmailSendData,
        setRoleData,
        auditingData,
        roleData,
        filesData,
        usersData,
        emailSendData,
        chatsData,
        branchData,
        auditingCategoryData,
        provinceData,
        userData
    };

    return (
        <DataContext.Provider value={value}>{children}</DataContext.Provider>
    );
};
