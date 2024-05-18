import {IconName, Intent, MaybeElement} from "@blueprintjs/core";
import {Exception, ExceptionType} from "../actions/error";
import {
    authorization_failure,
    bad_credentials,
    bad_request,
    bad_request_data, check_email,
    conflict,
    contact_administration, data_in_use, duplicated_id, get_access_code,
    interface_label_301, no_data_found,
    no_network, not_found,
    object_missing,
    operation_completed,
    operation_denied,
    operation_error,
    operation_success, operation_time_out,
    permission_required, processing, server_time_out,
    server_unreachable,
    unprocessable_request, waiting_server_response,
    wrong_password,
    wrong_password_confirmation
} from "../vocabulary/Vocabulary";

export interface ExceptionViewInfo {
    title : string;
    message : string;
    intent : Intent,
    icon ?: IconName | MaybeElement;
}

export function getExceptionViewInfo(exception: Exception) : ExceptionViewInfo{
    const intent : Intent = Intent.DANGER;
    const icon : IconName = 'issue';
    switch (exception.type) {
        case ExceptionType.NoNetwork:
            return  {title : server_unreachable, message : no_network, intent};
        case ExceptionType.NoException:
            return {
                title : operation_completed,
                message : operation_success,
                intent :Intent.SUCCESS,
                icon : 'saved'
            };
        case ExceptionType.Unauthorized:
            return {
                title : authorization_failure,
                message : exception.message !== undefined ? exception.message : bad_credentials,
                intent,
                icon : 'lock'};
        case ExceptionType.Forbidden:
            return {
                title : operation_denied,
                message : exception.message !== undefined ? exception.message : permission_required,
                intent,
                icon : 'lock'};
        case ExceptionType.DisabledUser:
            return {
                title : interface_label_301,
                message : exception.message !== undefined ? exception.message : contact_administration,
                intent,
                icon : 'lock'};
        default:
        case ExceptionType.ServerException:
            return {
                title : operation_error,
                message : exception.message !== undefined ? exception.message : unprocessable_request,
                intent,
                icon};
        case ExceptionType.Gone:
            return {
                title : operation_error,
                message : object_missing,
                intent,
                icon};
        case ExceptionType.PasswordsNotTheSame:
            return {
                title : wrong_password,
                message : exception.message !== undefined ? exception.message : wrong_password_confirmation,
                intent,
                icon};
        case ExceptionType.TimeOut:
            return {
                title : operation_time_out,
                message : server_time_out,
                intent,
                icon};
        case ExceptionType.WrongRequest:
            return {
                title : bad_request,
                message : exception.message !== undefined ? exception.message : bad_request_data,
                intent,
                icon: 'error'};
        case ExceptionType.Conflict:
            return {
                title : conflict,
                message : exception.message !== undefined ? exception.message : duplicated_id,
                intent,
                icon};
        case ExceptionType.FailedDependency:
            return {
                title : operation_error,
                message : exception.message !== undefined ? exception.message : data_in_use,
                intent,
                icon};
        case ExceptionType.NotFound:
            return {
                title : not_found,
                message : exception.message !== undefined ? exception.message : no_data_found,
                intent : Intent.WARNING,
                icon : 'warning-sign'};
        case ExceptionType.Processing:
            return {
                title : processing,
                message : waiting_server_response,
                intent : Intent.PRIMARY,
                icon : 'globe-network'};
        case ExceptionType.WaitForEmail:
            return {
                title : check_email,
                message : get_access_code,
                intent : Intent.SUCCESS,
                icon : 'envelope'};
    }
}