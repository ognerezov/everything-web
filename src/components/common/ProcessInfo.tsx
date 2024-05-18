import React, {FC} from "react";
import {Card, Intent, OverlayToaster, Position, Spinner, Toast2} from "@blueprintjs/core";
import {Exception, ExceptionType} from "../../actions/error";
import {AppState} from "../../store/configureStore";
import {connect} from "react-redux";
import {V} from "../../vocabulary/Vocabulary";
import {ExceptionViewInfo, getExceptionViewInfo} from "../../model/ExceptionViewInfo";
import {Elevation} from "@blueprintjs/core/lib/esm/common/elevation";
import {noException} from "../../actions/error";

interface ProcessInfoProps {
   error : Exception;
   className ?: string;
   noException : any;
}

const ProcessInfo :FC<ProcessInfoProps> = props => {
    function getProgressBar() {
        return  <Card elevation={Elevation.ZERO} interactive={true} className={props.className}>
            <Spinner size={16} intent={Intent.PRIMARY} />
        </Card>
    }

    function getError(error: Exception) {
        const viewInfo : ExceptionViewInfo = getExceptionViewInfo(error);
        let content : string =  V[viewInfo.title];
        if(V[viewInfo.message] ){
            content +=': ' +V[viewInfo.message];
        }
        return <OverlayToaster position={Position.TOP} >
            <Toast2  icon={viewInfo.icon} message={content} intent={viewInfo.intent} onDismiss={()=>{props.noException()}} />
        </OverlayToaster>
    }
    return props.error.type === ExceptionType.NoException ? null :
        props.error.type === ExceptionType.Processing ? getProgressBar(): getError(props.error)
};

const mapStateToProps = (state : AppState) =>({
    error : state.error
});

export default connect(mapStateToProps,{noException})(ProcessInfo);