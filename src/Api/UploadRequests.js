import instance from "./Axios";

export const uploadImage = (id, data) => instance.post(
    `api/audit/department/user/uploadUserProfilePhoto/${id}`, data);
