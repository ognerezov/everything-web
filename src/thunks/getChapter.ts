import {ThunkAction} from "redux-thunk";
import {AppState} from "../store/configureStore";
import {Action} from "redux";
import {foundChapters, gotChapters} from "../actions/book";
import {getChaptersAsync} from "../dao/BookRepository";
import {deleteAccessCode, setTemporalPassword, setUserLoggedIn} from "../actions/user";
import {noException, onException, onProcess} from "../actions/error";
import {saveSettings, saveUser} from "../service/LocalStorage";
import {isReader, User} from "../model/User";
import {refresh} from "./refresh";
import {getCloudDataAsync} from "../dao/DataRepository";
import {DataType} from "../actions/data";
import {Method} from "../service/connection";
import {buildChapter} from "../model/Book";

export const getChapters =(numbers : number[]): ThunkAction<void, AppState, null, Action> => async (dispatch,getState) => {
    const filtered = filterAndBuild(numbers,getState,dispatch);
    await proceedGetChapter(filtered,dispatch,getState);
};

export const getCurrentChapters =(): ThunkAction<void, AppState, null, Action> => async (dispatch,getState) => {
    const filtered = filterAndBuild(getState().settings.layers,getState,dispatch);
    await proceedGetChapter(filtered,dispatch,getState);
};

export const enterCodeAndGetChapters =(accessCode : string): ThunkAction<void, AppState, null, Action> => async (dispatch,getState) => {
    dispatch(setTemporalPassword(accessCode));
    const filtered = filterAndBuild(getState().settings.layers,getState,dispatch);
    await proceedGetChapter(filtered,dispatch,getState);
    if(getState().user.accessCode) {
        dispatch(setUserLoggedIn());
        saveUser(getState().user);
    }
};

interface FilteredLayers {
    toGet : number[],
    toBuild : number[]
}

function filterLayers(numbers : number [], getState : any) :FilteredLayers {
    return {
        toGet : numbers.filter(n => !getState().book[n] && n <= getState().data.max),
        toBuild : numbers.filter(n => n >getState().data.max)
    }
}

function filterAndBuild(numbers : number [], getState : any, dispatch :any) : number []{
    const layers : FilteredLayers = filterLayers(numbers,getState);
    dispatch(gotChapters(layers.toBuild.map(n => buildChapter(n))));
    return layers.toGet;
}

function handleException(e :any, getState: any, dispatch: any, onRefresh :()=>void,  errorHandler ?:(e: any)=>void ) {
    if (e.status === 401) {
        const user: User = getState().user;
        if (isReader(user)) {
            refresh(() => {
                dispatch(noException());
                onRefresh();
            });
            return;
        } else {
            dispatch(deleteAccessCode());
            saveUser(getState().user);
        }
    } else {
        errorHandler && errorHandler(e);
        console.log(e);
    }
    dispatch(onException(e.status, e.message));
}

export async function proceedGetChapter(numbers : number [],dispatch : any, getState : any, action ?:Action) {
    dispatch(onProcess());
    try {
        dispatch(gotChapters(await getChaptersAsync(numbers,getState().user.accessCode)));
        if(action) {
            dispatch(action);
            saveSettings(getState().settings);
        }
        dispatch(noException());
    }catch (e) {
        handleException(e, getState, dispatch,() =>proceedGetChapter(numbers, dispatch, getState,action));
    }
}

export const searchChapters =(text: string): ThunkAction<void, AppState, null, Action> => async (dispatch,getState) => {
    dispatch(onProcess());
    try {
        dispatch(foundChapters(JSON.parse(await getCloudDataAsync(DataType.Search +text,getState().user.accessCode,Method.GET))));
        saveSettings(getState().settings);
        dispatch(noException());
    }catch (e) {
        handleException(e, getState, dispatch,() =>searchChapters(text));
    }
};