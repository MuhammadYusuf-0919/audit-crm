import instance from './Axios';

export const logInUser = (formData) => instance.get(
    `api/audit/department/user/getProfile/${formData}`);
