import {div, getDividers, getLevel} from "../service/MathService";
import {number_not_found, V} from "../vocabulary/Vocabulary";

export interface Book {
    [key :number] : Chapter;
}
export interface Chapter extends LevelFragment{
    level : number;
    records : Record[];
}

export function getMeta(chapter : Chapter){
        let title = chapter.number + ''
        let description = ''
        for(const record of chapter.records){
            if(record.type === CHAPTER){
                title = record.spans.map(span=>span.text).join('')
                continue
            }
            if(record.type === FORMULA){
                description += record.spans.filter((span, index)=> index >4).map(span=>span.text.replace(/\t+/g,'')).join('')
            }

        }

        return {
            title: title,
            description: description,
            meta: {
                charset: 'utf-8',
                name: {
                    keywords: title.split(/[.,–]/g)
                }
            }
        }
}

export interface Record extends LevelFragment{
    spans : Span [];
}

export type RecordFilter = (chapter :Chapter)=>Record[];


export const quotationRecordFilter : RecordFilter = chapter => {
    const count = chapter.records.length-1;

    if(count < 2){
        return chapter.records;
    }

    const selected = Math.floor(1 + Math.random()*count);

    return [chapter.records[0],chapter.records[selected]]
}

export interface LevelFragment {
    number : number;
    type : string;
}

export interface Span {
    text : string,
    number : boolean
}

export const LEVEL = 'level';
export const CHAPTER = 'chapter';
export const FORMULA = 'formula';
export const RULE = 'rule';
export const RULE_BODY='rule body';
export const QUOTATION = 'quotation';
export const POEM = 'poem';
export const REGULAR = 'regular';
export const RESULT = 'result';

export const MIN_CHAPTER = 1;

export function isNumberDisabled(record : Record, str : string) {
    const number = Number(str);
    return number === record.number || number < MIN_CHAPTER
}

export function buildChapter(number : number) : Chapter {
    const level = getLevel(number);
    const dividers : number [] = getDividers(number);
    let root : number | undefined;

    if (dividers.length % 2 !== 0){
        root = dividers[div(dividers.length,2)];
    }

    const res : Chapter = {
        level,
        number,
        type : CHAPTER,
        records :[]
    }
    res.records.push({
        number,
        type :CHAPTER,
        spans : [
            {
                text : number + '',
                number : true,
            },
            {
                text : '. '+V[number_not_found],
                number : false
            }
        ]
    })


    res.records.push({
        number,
        type :LEVEL,
        spans : [
            {
                text : 'Число находится на уровне ',
                number : false,
            },
            {
                text : level +  ' ',
                number : true
            }
        ]
    })

    if(root){
        res.records.push({
            number,
            type :RULE,
            spans : [
                {
                    text : number + '',
                    number : true,
                },
                {
                    text : ' = ',
                    number : true,
                },
                {
                    text : root + '',
                    number : true,
                },
                {
                    text : ' ^ ',
                    number : false
                },
                {
                    text : 2 + '',
                    number : true,
                }
            ]
        })
    }

    for(let i=0; i< dividers.length/2; i++){
        res.records.push({
            number,
            type :RULE,
            spans : [
                {
                    text : number + '',
                    number : true,
                },
                {
                    text : ' = ',
                    number : true,
                },
                {
                    text : dividers[dividers.length-1-i] + '',
                    number : true,
                },
                {
                    text : ' x ',
                    number : false
                },
                {
                    text : dividers[i] + '',
                    number : true,
                }
            ]
        })
    }
    if(res.records.length === 2){
        res.records.push({
            number,
            type :QUOTATION,
            spans : [
                {
                    text : 'Это простое число - абсолютно новый принцип',
                    number : false,
                },
            ]
        })
    }
    return res;
}
