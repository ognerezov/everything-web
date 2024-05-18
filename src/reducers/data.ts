import {Data, Rule} from "../model/Rules";
import {DataAction, DataType} from "../actions/data";
import {Chapter} from "../model/Book";

export default function(data : Data={'max':0},action: DataAction):Data {
    let rules : Rule[];
    let quotations : Chapter[];
    let max : number;
    switch (action.type) {
        case DataType.Rules:
            rules = JSON.parse(action.data);
            return {...data,rules};
        case DataType.Quotations:
            quotations = JSON.parse(action.data);
            return {...data,quotations};
        case DataType.Max:
            max = JSON.parse(action.data).value;
            return {...data,max};
        default:
            return data;
    }
}
