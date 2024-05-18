import {ThunkAction} from "redux-thunk";
import {AppState} from "../store/configureStore";
import {Action} from "redux";
import {loginAsync, registerAsync} from "../dao/UserDao";
import {isReader, User} from "../model/User";
import {registered, setUserLoggedOut} from "../actions/user";
import {saveUser} from "../service/LocalStorage";
import {ConnectionResponse} from "../service/connection";
import {onProcess} from "../actions/error";
import {getCurrentChapters} from "./getChapter";

export const register =(username: string, password: string,
                        errorHandler : (e: any)=>void, successHandler : ()=>void =()=>{}, isLogin : boolean = false ): ThunkAction<void, AppState, null, Action> => async (dispatch,getState) => {
    try {
        dispatch(onProcess());
        const user : User = isLogin ? await loginAsync(username,password) : await registerAsync(username,password);
        dispatch(registered(user));
        const newUser = getState().user;
        saveUser(newUser);
        if(isReader(newUser)){
            dispatch(getCurrentChapters());
        }
        successHandler();
    }catch (e) {
        errorHandler(e);
    }
};

export const logout =(): ThunkAction<void, AppState, null, Action> => async (dispatch,getState) => {
    dispatch(setUserLoggedOut());
    saveUser(getState().user);
};