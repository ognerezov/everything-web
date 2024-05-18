import React,{PureComponent} from "react";
import {Chapter} from "../../model/Book";
import {AppState} from "../../store/configureStore";
import {connect} from "react-redux";
import {getData} from "../../thunks/getData";
import {DataType} from "../../actions/data";
import {Quotation, QuotationFullScreen} from "./ChapterViewer";
import {Drawer} from "@blueprintjs/core";
import {Position} from "@blueprintjs/core/lib/esm/common/position";
import {quotations_label, V} from "../../vocabulary/Vocabulary";
import {isMobile} from "../../service/MediaInfo";

interface QuotationViewerProps {
    quotations ?: Chapter[],
    getData : any
}

interface QuotationViewerState {
    index : number,
    fullScreen : boolean
}

class QuotationViewer extends PureComponent<QuotationViewerProps, QuotationViewerState>{

    constructor(props: QuotationViewerProps, context: any) {
        super(props, context);
        if(!props.quotations){
            props.getData(DataType.Quotations);
        }
        this.state = {index : 0, fullScreen : false};
    }

    handleCloseQuotation=()=>{
        this.setState({...this.state,
            index : !this.props.quotations || this.state.index >= this.props.quotations.length-1 ? 0 : this.state.index +1})
    }
    handleExpand = ()=>{
        this.setState({...this.state,fullScreen : true})
    }
    handleCollapse = ()=>{
        this.setState({...this.state,fullScreen : false})
    }

    render(){
        return this.props.quotations?
            this.state.fullScreen ?
            <Drawer
                onClose={this.handleCollapse}
                position={Position.BOTTOM} size={ '90%'}
                isOpen={true}
                canOutsideClickClose={true}
                isCloseButtonShown={true}
                title={V[quotations_label]}
            >
                <div className={isMobile() ? '' : 'quotation--fullscreen'}>
                    <QuotationFullScreen chapter={this.props.quotations[this.state.index]} closable={true} closeChapter={this.handleCloseQuotation} />
                </div>
            </Drawer> :
            <div className='quotation-container--holder'>
                <Quotation chapter={this.props.quotations[this.state.index]} closable={true} closeChapter={this.handleCloseQuotation} expandView={this.handleExpand}/>
            </div>:null
    }
}

const mapStateToProps = (state: AppState)=>({
    quotations : state.data.quotations
})

export default connect(mapStateToProps,{getData})(QuotationViewer);