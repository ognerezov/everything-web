import {ThunkAction} from "redux-thunk";
import {AppState} from "../store/configureStore";
import {Action} from "redux";
import {DataType, gotData} from "../actions/data";
import {getCloudDataAsync} from "../dao/DataRepository";
import {Method} from "../service/connection";

export const getData =(type : DataType): ThunkAction<void, AppState, null, Action> => async (dispatch,getState) => {
    const accessCode = getState().user ? getState().user.accessCode : undefined;
    dispatch(gotData(type,await getCloudDataAsync(type,accessCode, Method.GET)));
};