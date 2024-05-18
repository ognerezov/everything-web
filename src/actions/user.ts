import {Action} from "redux";
import {User} from "../model/User";

export enum UserActionType {
    SetAccessCode ='set access code',
    DeleteAccessCode = 'delete access code',
    SetLoggedIn = 'set logged in',
    SetLoggedOut = 'set logged out',
    Registered = 'registered'
}

export interface UserAction extends Action<UserActionType>{
    value ?: string;
}

export interface UserObjectAction extends  UserAction{
    user : User
}

export function setTemporalPassword(value : string) : UserAction{
    return {
        type : UserActionType.SetAccessCode,
        value
    }
}

export function setUserLoggedIn() {
    return {
        type : UserActionType.SetLoggedIn
    }
}

export function setUserLoggedOut() {
    return {
        type : UserActionType.SetLoggedOut
    }
}

export function deleteAccessCode() {
    return {
        type : UserActionType.DeleteAccessCode
    }
}


export function registered(user : User): UserObjectAction {
 return {
     type : UserActionType.Registered,
     user
 }
}