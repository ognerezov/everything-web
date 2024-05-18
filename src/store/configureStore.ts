import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import bookReducer from '../reducers/book';
import settingsReducer from "../reducers/settings";
import userReducer from "../reducers/user";
import errorReducer from "../reducers/error";
import dataReducer from "../reducers/data";
import {thunk} from "redux-thunk";
import {STORED_SETTINGS, STORED_USER} from "../utils/Literals";
import {Settings} from "../model/Settings";
import {noException} from "../actions/error";
import {User} from "../model/User";

const rootReducer = combineReducers({
    book : bookReducer,
    settings :settingsReducer,
    user : userReducer,
    error : errorReducer,
    data : dataReducer
});

export type AppState = ReturnType<typeof rootReducer>;

function init() :any {
    const settingsStr = localStorage.getItem(STORED_SETTINGS);
    const settings : Settings = settingsStr ? JSON.parse(settingsStr) : {layers: [1]};
    const userStr = localStorage.getItem(STORED_USER);
    const user : User = userStr ? JSON.parse(userStr) : {};
    return {
        settings,
        book : {},
        error : noException(),
        user,
        data :{'max': 0}
    }
}

export function configureStore() {
    return legacy_createStore(
        rootReducer,
        init(),
        applyMiddleware(thunk)
    );
}

export const store = configureStore();
