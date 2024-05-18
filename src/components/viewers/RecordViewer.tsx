import React, {FC} from "react";
import {
    CHAPTER,
    FORMULA,
    isNumberDisabled,
    LEVEL,
    POEM,
    QUOTATION,
    Record,
    RESULT,
    RULE,
    RULE_BODY
} from "../../model/Book";
import N from "../elements/N";
import {H6, H4, H5, Callout} from "@blueprintjs/core";



interface RecordViewerProps {
    record : Record;
}

export const RecordViewer : FC<RecordViewerProps> = props => {
    function getSpans() {
        return props.record.spans
            .map((span,index)=>span.number ?
                <N  number={span.text} disabled={isNumberDisabled(props.record,span.text)} key={index}/> :
                <span key={index}>{span.text.replace(/\t+/g,'')}</span> )
    }

    switch (props.record.type) {
        case LEVEL:
            return <Callout><H4 className='bp3-heading'>
                {getSpans()}
            </H4></Callout>;
        case CHAPTER:
            return <Callout><H5 className='bp3-heading'>
                {getSpans()}
            </H5></Callout>;
        case FORMULA:
        case RESULT:
            return <Callout><H6 className='bp3-heading'>
                {getSpans()}
            </H6></Callout>;
        case RULE:
            return <div className='rule'>
                {getSpans()}
            </div>;
        case RULE_BODY:
            return <div className='rule-body'>
                {getSpans()}
            </div>;
        case QUOTATION:
            return <Callout className='bp3-text-muted'>
                {getSpans()}
            </Callout>;
        case POEM:
            return <Callout className='poem bp3-text-muted'>
                {getSpans()}
            </Callout>;
        default:
            return <div className='bp3-ui-text'>
                {getSpans()}
            </div>;
    }

};
