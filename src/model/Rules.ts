import {Chapter} from "./Book";

export interface Data {
    rules ?: Rule [];
    quotations ?: Chapter[];
    max : number
}

export interface Rule {
    number : number;
    rule : string[];
}