import React, {FC} from "react";
import viewChapter from "../../thunks/viewChapter";
import {connect} from "react-redux";

interface NProps {
    number : string;
    disabled ?: boolean;
    viewChapter :any;
}

const N : FC<NProps> = props => {
    function click() {
        if(props.disabled) return;

        props.viewChapter(Number(props.number));
    }

    return <span className={props.disabled ? 'n-disabled' : 'n'} onClick={click}>
        {props.number}
    </span>
};

export default connect(undefined,{viewChapter})(N);