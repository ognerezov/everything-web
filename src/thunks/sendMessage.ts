import {ThunkAction} from "redux-thunk";
import {AppState} from "../store/configureStore";
import {Action} from "redux";
import {noException, onProcess} from "../actions/error";
import {DataType} from "../actions/data";
import {post} from "../service/connection";
import {getBaseUrl} from "../api/BackendUrl";

export const sendMessage=(message : string, theme : string| undefined = undefined, onSuccess :()=>void, onError :(e :any)=>void): ThunkAction<void, AppState, null, Action> => async (dispatch,getState) => {
    dispatch(onProcess());
    try {
        await post(getBaseUrl()+DataType.Message,JSON.stringify({message,theme}),getState().user.token);
        onSuccess();
    }catch (e) {
        console.log(e);
        onError(e);
    }
    dispatch(noException());
};

export const pubMessage=(message : string, email : string,  onSuccess :()=>void, onError :(e :any)=>void): ThunkAction<void, AppState, null, Action> => async (dispatch,getState) => {
    dispatch(onProcess());
    try {
        await post(getBaseUrl()+DataType.PubMessage,JSON.stringify({message,email}),undefined);
        onSuccess();
    }catch (e) {
        console.log(e);
        onError(e);
    }
    dispatch(noException());
};