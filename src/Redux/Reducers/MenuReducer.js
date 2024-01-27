const menuReducer = (
    state = {
        menuOpen: true,
        error: false,
        loading: false,
        updateLoading: false,
    },
    action
) => {
    switch (action.type) {
        case "MENU_START":
            return { ...state, error: false, loading: true };
        case "MENU_SUCCESS":
            return { ...state, menuOpen: action?.menuOpen, loading : false, error: false };
        case "MENU_FAIL":
            return { ...state, loading: false, error: true };
        default:
            return state;
    }
};

export default menuReducer;
