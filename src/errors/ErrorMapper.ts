import {ConnectionResponse} from "../service/connection";
import {ExceptionType} from "../actions/error";
import {
    bad_request_data,
    operation_error,
    user_exists,
    V,
    wrong_username_password
} from "../vocabulary/Vocabulary";

export function getErrorMessage(response : ConnectionResponse) : string {
     switch (response.status +'') {
         case ExceptionType.Conflict:
             return V[user_exists];
         case ExceptionType.Unauthorized:
             return V[wrong_username_password];
         case ExceptionType.WrongRequest:
             return V[bad_request_data];
         default:
             return V[operation_error];
     }
}