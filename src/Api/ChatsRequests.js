import instance from './Axios';

export const getResponseChats = (name) => instance.get(`api/chat?username=${name}`);