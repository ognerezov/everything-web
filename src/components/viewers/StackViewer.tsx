import React, {FC} from "react";
import {AppState} from "../../store/configureStore";
import {connect} from "react-redux";
import {Intent, Tag} from "@blueprintjs/core";
import {selectChapter} from "../../actions/settings";
import {Settings} from "../../model/Settings";

interface StackViewerProps {
    layers : number[],
    limit ?: number;
    className ?: string;
    intent ?: Intent;
    selectChapter : any;
    selected ?:number;
    settings : Settings
}

const StackViewer: FC<StackViewerProps> = props => {
    const layers = props.layers;
    const selected = props.selected !== undefined ? -1 : layers.length-1;
    return <span className={props.className}>
        {layers.map((layer,index)=>
            <Tag
                className='n-tag'
                round={true}
                key={index}
                intent={index === selected || index === props.selected ? props.intent: undefined}
                minimal={true}
                interactive={true}
                onClick={()=>{props.selectChapter(index)}}
            >
            {layer}
        </Tag>)
        }
    </span>;
}

const mapStateToProps = (state :AppState)=>({layers :state.settings.layers, selected : state.settings.selected, settings : state.settings});

export default connect(mapStateToProps,{selectChapter})(StackViewer);