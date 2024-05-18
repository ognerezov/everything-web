import LayersViewer from "./LayersViewer";
import React, {useEffect} from "react";
import {connect} from "react-redux";
import {AppState} from "../../store/configureStore";
import {getData} from "../../thunks/getData";
import {DataType} from "../../actions/data";
import {getCurrentChapters} from "../../thunks/getChapter";

interface NumberViewerProps{
    getCurrentChapters : any
    max ?: number
    getData : any
}

function BookViewer(props : NumberViewerProps){
    useEffect(()=>{
        if(props.max){
            return
        }
        props.getData(DataType.Max)
    },[props])

    useEffect(()=>{
        if(!props.max){
            return;
        }
        props.getCurrentChapters()

    },[props])

    return(
        <LayersViewer defaultMeta />
    )
}

const connected = connect((state: AppState)=>({max:state.data.max}),{getCurrentChapters, getData})(BookViewer)

export default connected;
