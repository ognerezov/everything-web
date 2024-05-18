import {ConnectionResponse, post} from "../service/connection";
import {Chapter} from "../model/Book";
import {getUrl} from "../api/BackendUrl";

const GET_CHAPTER_URL=getUrl('book/read');

export function getChaptersAsync(values:number[], password ?: string) : Promise<Chapter[]> {
    const url = GET_CHAPTER_URL;
    const distinct = new Set<number>(values)
    const numbers : number[] =[];
    distinct.forEach(val=>numbers.push(val));
    const msg = JSON.stringify({numbers});
    return new Promise<Chapter[]>(async function (resolve, reject) {
        try {
            const response : ConnectionResponse = await post(url,msg,password);
            resolve(JSON.parse(response.message))
        }catch (e) {
            reject(e);
        }
    })
}