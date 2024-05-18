import {getUrl} from "../api/BackendUrl";
import {User} from "../model/User";
import {Method, request} from "../service/connection";

export const BASE_RUL=getUrl('pub/');

export function registerAsync(username: string, password: string) : Promise<User> {
    const msg = JSON.stringify({
        username,
        password,
        'app' : 'web'
    });
    return request<User>(Method.POST, BASE_RUL +'register',msg);
}
export function loginAsync(username: string, password: string) : Promise<User> {
    const msg = JSON.stringify({
        username,
        password
    });
    return request<User>(Method.PUT, BASE_RUL +'login',msg);
}


export function refreshAsync(token: string) : Promise<User> {
    const msg = JSON.stringify({token});
    return request<User>(Method.PUT, BASE_RUL +'refresh',msg);
}