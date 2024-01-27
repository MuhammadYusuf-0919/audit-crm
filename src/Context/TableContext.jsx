import { Input } from "antd";
import { createContext } from "react";
import { useData } from "../Hooks/UseData";
import { useLocation } from "react-router-dom";
import CustomSelect from "../Modules/Select/Select";

export const TableContext = createContext();

export const TableProvider = ({ children }) => {
    let location = useLocation();
    const { roleData } = useData();

    const categoryFormData = [
        {
            name: "name",
            label: "Kategoriya nomi",
            required: true,
            input: <Input placeholder="Kategoriya nomini kiriting" />,
        },
        {
            name: "code",
            label: "Kategoriya kodi",
            required: true,
            input: <Input placeholder="Kategoriya kodini kiriting" />,
        }
    ];

    const branchFormData = [
        {
            name: "name",
            label: "Filial nomi",
            required: true,
            input: <Input placeholder="Filial nomini kiriting" />,
        },
        {
            name: "code",
            label: "Filial kodi",
            required: true,
            input: <Input placeholder="Filial kodini kiriting" />,
        },
        {
            name: "address",
            label: "Manzili",
            required: true,
            input: <Input placeholder="Filial manzilini kiriting" />,
        },
    ];

    const usersFormData = [
        {
            name: "fio",
            label: "Xodim ismi sharifi",
            required: true,
            input: <Input placeholder="Ism sharifini kiriting" />,
        },
        {
            name: "userName",
            label: "User name",
            required: true,
            input: <Input placeholder="User nameni kiriting" />,
        },
        {
            name: "email",
            label: "Xodim emaili",
            required: true,
            input: <Input placeholder="Emailni kiriting" />,
        },
        {
            name: "password",
            label: "Xodim passwordi",
            required: true,
            input: <Input placeholder="Passwordni kiriting" />,
        },
        {
            name: "phoneNumber",
            label: "Xodim nomeri",
            required: true,
            input: <Input placeholder="Nomerini kiriting" />,
        },
        {
            name: "roleId",
            label: "Role",
            required: true,
            input: (
                <CustomSelect
                    backValue={"id"}
                    placeholder={"Role tanlang"}
                    selectData={roleData?.map((item) => ({
                        ...item,
                        name: item.name,
                    }))}
                />
            ),
        },
    ];

    const editUsersFormData = [
        {
            name: "fio",
            label: "Ismi sharifi",
            required: true,
            input: <Input placeholder="Ism sharifini kiriting" />,
        },
        {
            name: "userName",
            label: "User name",
            required: true,
            input: <Input placeholder="User nameni kiriting" />,
        },
        {
            name: "email",
            label: "User emaili",
            required: true,
            input: <Input placeholder="Emailni kiriting" />,
        },
        {
            name: "password",
            label: "User passwordi",
            required: true,
            input: <Input placeholder="Passwordni kiriting" />,
        },
        {
            name: "phoneNumber",
            label: "User nomeri",
            required: true,
            input: <Input placeholder="User nomerini kiriting" />,
        },
        {
            name: "roleId",
            label: "Role",
            required: true,
            inputSelect: (defaultId = null) => (
                <CustomSelect
                    DValue={defaultId}
                    backValue={"id"}
                    placeholder={"Role tanlang"}
                    selectData={roleData?.map((item) => ({
                        ...item,
                        name: item.name,
                    }))}
                />
            ),
        },
    ];

    let formData = {};

    switch (location.pathname) {
        case "/auditing": {
            formData = {
                formData: categoryFormData,
                editFormData: categoryFormData,
                branchData: false,
                timeFilterInfo: false,
                deleteInfo: true,
                createInfo: true,
                editInfo: true,
                timelyInfo: false,
                auditInfo: true,
                editModalTitle: "Auditing",
                modalTitle: "Yoqilg'i qo'shish",
            };
            break;
        }
        case "/category": {
            formData = {
                formData: categoryFormData,
                editFormData: categoryFormData,
                branchData: false,
                timeFilterInfo: false,
                deleteInfo: true,
                createInfo: true,
                editInfo: true,
                timelyInfo: false,
                editModalTitle: "Auditing",
                modalTitle: "Yoqilg'i qo'shish",
            };
            break;
        }
        case "/branchs": {
            formData = {
                formData: branchFormData,
                editFormData: branchFormData,
                branchData: false,
                timeFilterInfo: false,
                deleteInfo: true,
                createInfo: true,
                editInfo: true,
                timelyInfo: false,
                editModalTitle: "Filial malumotlarini taxrirlash",
                modalTitle: "Filial qo'shish",
            };
            break;
        }
        case "/xodimlar": {
            formData = {
                formData: usersFormData,
                editFormData: editUsersFormData,
                branchData: false,
                timeFilterInfo: false,
                deleteInfo: true,
                createInfo: true,
                editInfo: true,
                timelyInfo: false,
                editModalTitle: "User malumotlarini taxrirlash",
                modalTitle: "User qo'shish",
            };
            break;
        }
        default: {
            formData = { ...formData };
        }
    }

    const value = { formData };

    return (
        <TableContext.Provider value={value}>{children}</TableContext.Provider>
    );
};
