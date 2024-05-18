export interface User {
    hasAccess ?: boolean;
    accessCode ?: string;
    token ?: string;
    refreshToken ?: string;
    username ?:string;
    emailStatus ?: string;
    roles ?: string[];
}

export function hasReadAccess(user : User) : boolean {
    return !!user.hasAccess && !!user.accessCode;
}

export const ROLE_READER = "ROLE_READER";

export function isReader(user : User) {
 return user.roles && user.roles.indexOf(ROLE_READER) >=0;
}

export function isLoggedIn(user : User) : boolean {
    return !!(user && user.username);
}
