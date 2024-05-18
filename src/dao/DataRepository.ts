import { Method, sendAsync} from "../service/connection";
import {getBaseUrl} from "../api/BackendUrl";

export const BASE_URL =getBaseUrl();


export function getCloudDataAsync(path : string, auth : string| undefined = undefined,  method : Method = Method.GET, object : any=undefined): Promise<string> {
    const url = BASE_URL + path;
    const msg = object ? JSON.stringify(object) : undefined;
    return new Promise<string>(async (resolve,reject)=>{
        try {
            resolve((await sendAsync(method,url,msg,auth)).message);
        }catch (e) {
            reject(e);
        }
    })
}