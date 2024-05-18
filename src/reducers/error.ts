import {Exception, ExceptionType, noException} from "../actions/error";

export default function  (error: Exception = noException(), action: Exception) : Exception {
    switch (action.type) {
        case ExceptionType.Unauthorized:
        case ExceptionType.NoException:
        case ExceptionType.Forbidden:
        case ExceptionType.ServerException:
        case ExceptionType.NotFound:
        case ExceptionType.WrongRequest:
        case ExceptionType.DisabledUser:
        case ExceptionType.FailedDependency:
        case ExceptionType.Processing:
        case ExceptionType.Conflict:
        case ExceptionType.PasswordsNotTheSame:
        case ExceptionType.Gone:
        case ExceptionType.WrongTempToken:
        case ExceptionType.TimeOut:
        case ExceptionType.ModificationProhibited:
        case ExceptionType.WaitForEmail:
            return action;
        case ExceptionType.NoNetwork:
            return error.type === ExceptionType.TimeOut ? error : action;
        default:
            return error;
    }
}