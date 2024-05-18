import {isReader, User} from "../model/User";
import {UserAction, UserActionType, UserObjectAction} from "../actions/user";

export default function (user : User={}, action : UserAction ) : User {
    let objAction : UserObjectAction;
    switch (action.type) {
        case UserActionType.SetAccessCode:
         return {...user, accessCode : action.value};
        case UserActionType.DeleteAccessCode:
            return {...user,accessCode : undefined,hasAccess :false};
        case UserActionType.SetLoggedIn:
            return {...user,hasAccess : true};
        case UserActionType.SetLoggedOut:
            return {...user,username : undefined,token :undefined,refreshToken : undefined, roles :[]};
        case UserActionType.Registered:
            objAction = action as UserObjectAction;
            if(isReader(objAction.user)){
                objAction.user.accessCode = objAction.user.token;
            }
            return {...objAction.user, hasAccess : !!objAction.user.accessCode}
        default:
            return user;
    }
}