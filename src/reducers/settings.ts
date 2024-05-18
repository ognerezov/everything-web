import {getSelected, Settings} from "../model/Settings";
import {RestoreSettingsAction, SettingsAction, SettingsOperation} from "../actions/settings";
import {BookAction, BookOperation} from "../actions/book";


export default function (settings : Settings = {layers: [1]}, action: SettingsAction | BookAction) : Settings {
    let layers : number[]= [...settings.layers];
    let selected : number | undefined;
    switch (action.type) {
        default:
            return settings;
        case SettingsOperation.View:
            layers.push(action.number);
            return {...settings,layers, selected : undefined};
        case SettingsOperation.Select:
            return {...settings,selected :action.number};
        case SettingsOperation.Shift:
            selected = getSelected(settings);
            layers[selected] += action.number;
            return {...settings,layers};
        case SettingsOperation.Set:
            return {...settings,layers : [action.number], selected : undefined};
        case SettingsOperation.Close:
            if(layers.length <= 1){
               return settings;
            }
            if(settings.selected === undefined) {
                layers.pop();
                return {...settings, layers};
            }
            selected = settings.selected === 0 ? 0 :settings.selected -1;
            layers = [...settings.layers];
            layers.splice(settings.selected,1);
            console.log(layers);
            return {...settings,layers,selected};
        case SettingsOperation.Collapse:
            return {...settings,layers : [layers[0]], selected : undefined};
        case BookOperation.Found:
            const  ba : BookAction = action as BookAction;
            return {...settings, layers : ba.chapters.map(chapter => chapter.number), selected : undefined}
        case SettingsOperation.Restore:
            const ra :RestoreSettingsAction = action as RestoreSettingsAction;
            return {...ra.settings}
    }
}