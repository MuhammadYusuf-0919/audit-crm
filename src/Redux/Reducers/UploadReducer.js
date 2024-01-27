const imagesReducer = (
    state = {
        imagesData: null,
        loading: false,
        error: false,
        uploading: false
    },
    action
) => {
    switch (action.type) {
        // belongs to PostShare.jsx
        case "UPLOAD_START":
            return {
                ...state, error: false, uploading: true
            };
        case "UPLOAD_SUCCESS":
            return {
                ...state, imagesData: action.data, uploading: false, error:
                    false
            };
        case "UPLOAD_FAIL":
            return {
                ...state, uploading: false, error: true
            };
            // belongs to Posts.jsx
            // case "RETREIVING_START":
            //   return { ...state, loading: true, error: false };
            // case "RETREIVING_SUCCESS":
            //   return { ...state, files: action.data, loading: false, error: false };
            // case "RETREIVING_FAIL":
            //   return { ...state, loading: false, error: true };
        default:
            return state;
    }
};
export default imagesReducer;