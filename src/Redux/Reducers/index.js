import {
    combineReducers
} from "redux";

import authReducer from "./AuthReducer";
import userReducer from "./UserReducer";
import menuReducer from "./MenuReducer";
import imagesReducer from "./UploadReducer";

export const reducers = combineReducers({
    authReducer,
    imagesReducer,
    userReducer,
    menuReducer
})
