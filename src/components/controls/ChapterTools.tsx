import React, {PureComponent} from "react";
import {Button, Card, Drawer, Elevation, FormGroup, InputGroup, Intent} from "@blueprintjs/core";
import {nextChapter,previousChapter,gotoChapter} from "../../thunks/shiftChapter";
import {connect} from "react-redux";
import {AppState} from "../../store/configureStore";
import {MIN_CHAPTER} from "../../model/Book";
import {Position} from "@blueprintjs/core/lib/esm/common/position";
import {isMobile} from "../../service/MediaInfo";
import {
    goto_start_label, message_support_label,
    no_input_label,
    numberOutOfRange,
    search,
    text_search_label, text_search_placeholder,
    V
} from "../../vocabulary/Vocabulary";
import {toast} from "../../service/toaster";
import RulesViewer from "../viewers/RulesViewer";
import {closeChapter} from "../../thunks/shiftChapter";
import {searchChapters} from "../../thunks/getChapter";
import ProcessInfo from "../common/ProcessInfo";

interface ChapterToolsProps {
    nextChapter : any;
    previousChapter : any;
    gotoChapter : any;
    number : number;
    layerCount : number;
    closeChapter : any;
    searchChapters : any;
}

interface ChapterToolsState {
    extended : boolean;
    searchValue ?:number;
    searchText ?: string;
    processing ?: boolean;
}

class ChapterTools extends PureComponent<ChapterToolsProps,ChapterToolsState>{

    constructor(props: ChapterToolsProps, context: any) {
        super(props, context);
        this.state ={extended : false};
    }
    componentDidMount(){
        document.body.addEventListener('keydown', this.handleKeyDown);
    };

    componentWillUnmount() {
        document.body.removeEventListener('keydown', this.handleKeyDown);
    };

    handleKeyDown=(event :KeyboardEvent) =>{
        if (event.code === 'Enter') {
            this.searchText();
        }
    };

    handleExpandAndCollapse=()=>{
      this.setState({...this.state,extended : !this.state.extended});
    };

    setSearchValue=(searchValue : number)=>{
        this.setState({...this.state,searchValue})
    };

    searchValue=()=>{
        if(this.state.searchValue === undefined ||  MIN_CHAPTER > this.state.searchValue ) {
            toast({message : V[numberOutOfRange],icon : 'hand'});
            return;
        }
        this.props.gotoChapter(this.state.searchValue);
        this.finishJob();
    };

    setSearchText=(val : string)=>{
        const searchText = val.trim();
        const searchValue : number = Number (searchText);
        if(isNaN(searchValue)){
            this.setState({...this.state,searchText,searchValue : undefined})
            return;
        }
        this.setState({...this.state,searchValue, searchText: undefined});
    };

    searchText=()=>{
        if(this.state.searchText === undefined && this.state.searchValue ===undefined) {
            toast({message : V[no_input_label],icon : 'hand'});
            return;
        }
        this.setState({...this.state,processing :true})
        if(this.state.searchText) {
            this.props.searchChapters(this.state.searchText);
        } else {
            this.props.gotoChapter(this.state.searchValue);
        }
        this.finishJob();
    };


    finishJob=()=>{
        if(isMobile()){
            this.setState({...this.state,extended : false, processing : false})
        }
    };

    render() {
        const searchTextTool = (
            <div>
            <Button icon='home' className='tools-home-button' minimal={true} intent={Intent.PRIMARY}
                    onClick={()=>{
                        this.props.gotoChapter(1);
                        this.finishJob();}} >
                {V[goto_start_label]}
            </Button>
            <FormGroup
                label={V[text_search_label]}
            >
                <InputGroup
                    className="login-fields"
                    placeholder={V[text_search_placeholder]}
                    rightElement={<Button icon='search' onClick={this.searchText} minimal={true}>{V[search]} </Button>}
                    onChange={(event : React.FormEvent<HTMLInputElement>)=>
                    {this.setSearchText(event.currentTarget.value)}}
                />
            </FormGroup>
            </div>
        );

        const extension = (
            this.state.extended ?
            ( isMobile()?
                <Drawer position={Position.LEFT} size={'90%'} isOpen={true}
                        canOutsideClickClose={true} onClose={this.handleExpandAndCollapse} >
                    <Card interactive={false} elevation={Elevation.TWO} className='extended-tools-container'>
                        {searchTextTool}
                        {this.state.processing ? <ProcessInfo/> :null }
                        <RulesViewer/>
                        <a href={'/contacts'} target={'_blank'} rel="noopener noreferrer">
                            <Button
                                icon='envelope'
                                minimal={true}
                                intent={Intent.PRIMARY}>
                                {V[message_support_label]}
                            </Button>
                        </a>
                    </Card>
                </Drawer> :
                <Card interactive={false} elevation={Elevation.TWO} className='page-tool-extension'>
                    {searchTextTool}
                    {this.state.processing ? <ProcessInfo/> :null }
                    <RulesViewer/>
                    <a href={'/contacts'} target={'_blank'} rel="noopener noreferrer">
                        <Button
                            icon='envelope'
                            minimal={true}
                            intent={Intent.PRIMARY}>
                            {V[message_support_label]}
                        </Button>
                    </a>
                </Card>)
            :null
        );

        return <div className='page-tool'>
            {extension}
            <Button className='page-tool-menu-button' minimal={true} icon='menu' onClick={this.handleExpandAndCollapse} intent={this.state.extended ? Intent.PRIMARY : undefined}/>
            <Button className='page-tool--button' minimal={true} icon='arrow-left' onClick={this.props.previousChapter}
                    disabled={this.props.number <= MIN_CHAPTER}/>
            <Button className='page-tool--button' minimal={true} icon='arrow-right' onClick={this.props.nextChapter}
                   />
            <Button className='page-tool-menu-button' minimal={true} icon='cross' onClick={this.props.closeChapter}
                    intent={this.props.layerCount ===1 ? Intent.NONE : Intent.DANGER} disabled={this.props.layerCount ===1}/>
        </div>
    }
}

const mapStateToProps =(state : AppState)=>({
    number : state.settings.layers[state.settings.layers.length-1],
    layerCount : state.settings.layers.length});

export default connect(mapStateToProps,{nextChapter,previousChapter,gotoChapter,closeChapter,searchChapters})(ChapterTools);
