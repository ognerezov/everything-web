import LayersViewer from "./LayersViewer";
import React, {useEffect} from "react";
import {match} from "react-router-dom";
import {connect} from "react-redux";
import {selectChapter} from "../../thunks/viewChapter";
import {AppState} from "../../store/configureStore";
import {getData} from "../../thunks/getData";
import {DataType} from "../../actions/data";

interface NumberViewerProps{
    match : match<Identifiable>
    selectChapter : any
    max ?: number
    getData : any
}

export interface Identifiable{
    id ?: string
}

function NumberViewer(props : NumberViewerProps){
    useEffect(()=>{
        if(props.max){
            return
        }
        props.getData(DataType.Max)
    },[props])

    useEffect(()=>{
        if(!props.max){
            return
        }

        if(!props.match.params.id){
            return;
        }

        let num = parseInt(props.match.params.id)

        if(isNaN(num)){
            num = 404
        }

        if(!num){
            return
        }
        props.selectChapter(num)

    },[props])

    return(
        <LayersViewer />
    )
}

const connected = connect((state: AppState)=>({max:state.data.max}),{selectChapter, getData})(NumberViewer)

export default connected;
