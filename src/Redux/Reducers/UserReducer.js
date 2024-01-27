const userReducer = (
    state = {
        currentUser: null,
        error: false,
        loading: false,
        updateLoading: false,
    },
    action
) => {
    switch (action.type) {
        case "USER_START":
            return { ...state, error: false, loading: true };
        case "USER_SUCCESS":
            return { ...state, currentUser: action?.currentUser, loading : false, error: false };
        case "USER_FAIL":
            return { ...state, loading: false, error: true };
        default:
            return state;
    }
};

export default userReducer;
