import {ThunkAction} from "redux-thunk";
import {AppState} from "../store/configureStore";
import {Action} from "redux";
import {Book, buildChapter} from "../model/Book";
import {closeLayer, setChapter, shiftChapter} from "../actions/settings";
import {saveSettings} from "../service/LocalStorage";
import {proceedGetChapter} from "./getChapter";
import {getSelected, getSelectedNumber, Settings} from "../model/Settings";
import {gotChapters} from "../actions/book";

export const nextChapter= (): ThunkAction<void, AppState, null, Action> => async (dispatch,getState) => {
    dispatch(processBook(
        getShifted(getState().settings,1),shiftChapter(1)));
};

export const previousChapter= (): ThunkAction<void, AppState, null, Action> => async (dispatch,getState) => {
    dispatch(processBook(
                getShifted(getState().settings,-1),
                    shiftChapter(-1)
                ));
};

function getShifted(settings : Settings, number :number) : Settings {
    const selected = getSelected(settings);
    const layers = [...settings.layers];
    layers[selected] += number;
    return {
        layers,
        selected
    }
}

export const gotoChapter= (number :number): ThunkAction<void, AppState, null, Action> => async (dispatch,getState) => {
    const selected = getSelected(getState().settings);
    const layers = [...getState().settings.layers];
    layers[selected] = number;
    dispatch(processBook({layers,selected},setChapter(number)));
};

export const processBook= (settings : Settings, action :Action): ThunkAction<void, AppState, null, Action> => async (dispatch,getState) => {
    const number = getSelectedNumber(settings);
    if(number > getState().data.max){
        dispatch(gotChapters([buildChapter(number)]));
        dispatch(action);
        saveSettings(getState().settings);
        return;
    }

    const book : Book = getState().book;
    saveSettings(getState().settings);
    if(!book[number]){
        await proceedGetChapter([number],dispatch,getState,action);
    } else{
        dispatch(action);
    }

};

export const closeChapter= (): ThunkAction<void, AppState, null, Action> => async (dispatch,getState) => {
    dispatch(closeLayer());
    saveSettings(getState().settings);
};
