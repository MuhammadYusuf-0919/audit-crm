import * as UploadApi from "../Api/UploadRequests";
export const uploadImage = (id, data) => async (dispatch) => {
    dispatch({
        type: "UPLOAD_START",
    });
    try {
        console.log("Image upload Action start ho gya hy")
        await UploadApi.uploadImage(id, data);
        dispatch({
            type: "UPLOAD_SUCCESS",
            imagesData: id,
            data
        })
    } catch (error) {
        console.log(error);
         dispatch({
            type: "UPLOAD_FAIL",
        });
    }
};
