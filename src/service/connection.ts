
export const DEFAULT_CONTENT_TYPE = "application/json; charset=utf8";

export enum Method {
    GET,
    POST,
    PUT,
    DELETE,
    HEAD,
    OPTIONS
}

export interface ConnectionResponse {
    status : number;
    message : string ;
}

export const DEFAULT_TIME_OUT= 60000;

export function get(url : string): Promise<ConnectionResponse>  {
    return sendAsync(Method.GET, url);
}

export function post(url : string, msg : string, auth : string|undefined): Promise<ConnectionResponse>    {
    return sendAsync(Method.POST, url,msg,auth,DEFAULT_CONTENT_TYPE,0);
}

export function request<T>(method : Method, url : string, message : XMLHttpRequestBodyInit | Document | null | undefined = undefined,
                           auth : string|undefined = undefined, contentType : string = DEFAULT_CONTENT_TYPE,
                           timeout : number = DEFAULT_TIME_OUT) : Promise<T> {
    return new Promise<T>(async function (resolve, reject) {
        try {
            const response : ConnectionResponse = await sendAsync(method,url,message,auth,contentType,timeout);
            resolve(JSON.parse(response.message))
        } catch (e) {
            reject(e);
        }
    })
}

export function sendAsync(method : Method, url : string, message : XMLHttpRequestBodyInit | Document | null | undefined = undefined,
                          auth : string|undefined = undefined, contentType : string = DEFAULT_CONTENT_TYPE,
                          timeout : number = DEFAULT_TIME_OUT): Promise<ConnectionResponse> {
    // console.log(url);
    // console.log(message);
    return new Promise(function (resolve, reject) {
        const xhttp = new XMLHttpRequest();
        xhttp.open(Method[method], url, true);
        xhttp.setRequestHeader("Content-type", contentType);
        xhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
        xhttp.setRequestHeader('Access-Control-Allow-Headers', '*');
        xhttp.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
        if (auth) {
            xhttp.setRequestHeader('Authorization', auth as string);
        }
        xhttp.timeout = timeout;
        xhttp.ontimeout = ()=>{
            reject({
                status : 'Timeout',
                message: ''
            });
        };
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState === xhttp.DONE) {
                if (xhttp.status < 200 || xhttp.status >= 400) reject({
                    status: xhttp.status,
                    message: xhttp.responseText
                });
                else resolve({
                    status: xhttp.status,
                    message: xhttp.responseText
                });
            }
        };
        try {
            if (method !== Method.GET && message !== undefined) {
                xhttp.send(message);
            } else {
                xhttp.send();
            }
        } catch (e) {
            console.log(e);
            reject({status: 0, message: ''});
        }
    })
}
