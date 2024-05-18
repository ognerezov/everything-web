import {ThunkAction} from "redux-thunk";
import {AppState} from "../store/configureStore";
import {Action} from "redux";
import {isReader, User} from "../model/User";

import {registered} from "../actions/user";
import {saveUser} from "../service/LocalStorage";
import {refreshAsync} from "../dao/UserDao";
import {logout} from "./register";

export const refresh =(after : ()=>void): ThunkAction<void, AppState, null, Action> => async (dispatch,getState) => {
    const currentUser : User = getState().user;
    if(!currentUser) return;
    try {
        const token = currentUser.refreshToken;
        if(!token){
            dispatch(logout());
            after();
            return;
        }
        const user : User = await refreshAsync(token);
        if(!isReader(user)) {
            user.accessCode = currentUser.accessCode;
        }
        dispatch(registered(user));
        saveUser(getState().user);
    }catch (e) {
        currentUser.token = undefined;
        currentUser.refreshToken = undefined;
        currentUser.username = undefined;
        dispatch(registered(currentUser));
        saveUser(getState().user);
    }

    after();

};