import {Action} from "redux";


export enum ExceptionType {
    WaitForEmail = '-3',
    TimeOut = '-2',
    Processing = '-1',
    NoNetwork = '0',
    PasswordsNotTheSame = '77',
    NoException = '200',
    WrongRequest = '400',
    Unauthorized = '401',
    Forbidden = '403',
    NotFound = '404',
    Conflict = '409',
    Gone = '410',
    DisabledUser = '418',
    WrongTempToken = '422',
    FailedDependency = '424',
    ModificationProhibited = '451',
    ServerException = '500'
}

export interface Exception extends Action<ExceptionType>{
    message ?: string;
}


export function noException() : Exception {
    return {
        type : ExceptionType.NoException
    }
}

export function onProcess() : Exception {
    return {
        type : ExceptionType.Processing
    }
}

export function onException(type : ExceptionType, message ?: string):Exception {
    return {type,message}
}
