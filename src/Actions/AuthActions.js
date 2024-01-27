import * as AuthApi from "../Api/AuthRequests";
export const logInUser = (formData, navigate) => async (dispatch) => {
    dispatch({
        type: "AUTH_START",
    });
    try {
        const { data } = await AuthApi.logInUser(formData);
        dispatch({
            type: "AUTH_SUCCESS",
            authData: data,
        });
        navigate("/", {
            replace: true,
        });
    } catch (error) {
        console.error(error);
        dispatch({
            type: "AUTH_FAIL",
        });
    }
};

export const logout = () => async (dispatch) => {
    dispatch({
        type: "LOG_OUT",
    });
};

