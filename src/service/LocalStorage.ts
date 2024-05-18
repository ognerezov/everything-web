import {STORED_SETTINGS, STORED_USER} from "../utils/Literals";
import {Settings} from "../model/Settings";
import {User} from "../model/User";


export function saveSettings(settings : Settings) {
    localStorage.setItem(STORED_SETTINGS,JSON.stringify(settings));
}

export function saveUser(user: User) {
    localStorage.setItem(STORED_USER,JSON.stringify(user));
}