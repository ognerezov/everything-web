import React,{PureComponent} from "react";
import {getData} from "../../thunks/getData";
import {connect} from "react-redux";
import {Rule} from "../../model/Rules";
import {AppState} from "../../store/configureStore";
import {DataType} from "../../actions/data";
import ProcessInfo from "../common/ProcessInfo";
import {Card, Collapse} from "@blueprintjs/core";

export interface RulesViewerProps {
    getData : any;
    rules ?: Rule [];
}

interface extendedIndexes {
    [key :number] : boolean;
}

export interface RulesViewerState {
    expandedRules : extendedIndexes;
}

class RulesViewer extends PureComponent<RulesViewerProps,RulesViewerState>{

    constructor(props: RulesViewerProps, context: any) {
        super(props, context);
        if(!props.rules){
            props.getData(DataType.Rules);
        }
        this.state = {expandedRules :{}}
    }

    handleExpandRule=(index :number)=>{
        const expandedRules = {...this.state.expandedRules};
        expandedRules[index] = !expandedRules[index];
        this.setState({...this.state,expandedRules})
    };

    render(){
        return <Card className='rules-container'>
            {this.props.rules ? this.props.rules
                    .map((rule,index)=>
                        <div key={index}>
                                {rule.rule.map((val,index2)=> index2 ===0 ?
                                    <div className={'rule active-rule'} key={index2} onClick={()=>this.handleExpandRule(index)}>
                                        {val}
                                    </div> :
                                        <Collapse isOpen={this.state.expandedRules[index]} key={index2} >
                                        <div className={'rule-body active-rule'} onClick={()=>this.handleExpandRule(index)}>
                                            {val}
                                        </div>
                                    </Collapse>

                                )}
                    </div>)
                : <ProcessInfo/>}
        </Card>
    }
}

const mapStateToProps= (state : AppState)=>({
    rules : state.data.rules
});

export default connect(mapStateToProps,{getData})(RulesViewer);