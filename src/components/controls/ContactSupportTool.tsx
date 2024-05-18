import React, {FC, PureComponent} from "react";
import {connect} from "react-redux";
import {isLoggedIn, User} from "../../model/User";
import {AppState} from "../../store/configureStore";
import {Button, Card, FormGroup, InputGroup, Intent, TextArea} from "@blueprintjs/core";
import {
    cancel, contact_label, email, message_label,
    message_support_label, message_was_sent,
    send_label, theme_label,
    V
} from "../../vocabulary/Vocabulary";
import {sendMessage,pubMessage} from "../../thunks/sendMessage";
import {isEmailValid} from "../../validators/EmailValidator";

interface ContactSupportToolProps {
    user : User,
    sendMessage : any;
    pubMessage ?: any;
    standalone ?: boolean;
}

interface ContactSupportToolState {
    isExpanded : boolean;
    theme ?: string;
    message ?: string;
    sent ?: boolean;
    valid : boolean;
}

class ContactSupportTool extends PureComponent<ContactSupportToolProps,ContactSupportToolState>{

    constructor(props: ContactSupportToolProps, context: any) {
        super(props, context);
        this.state ={
            isExpanded : !!props.standalone,
            valid : false
        }
    }

    handleExpand = ()=>{
        this.setState({...this.state, isExpanded : true})
    }

    handleCollapse = ()=>{
        this.setState({...this.state, isExpanded : false})
    }

    handleSetTheme =(theme : string) =>{
        const valid : boolean  = !!this.state.message && this.state.message.length > 0 && this.firstFieldValid(theme);
        this.setState({...this.state,theme,valid})
    }

    handleSetMessage =(message : string)=>{
        const valid : boolean  = !!message && message.length > 0 && this.firstFieldValid(this.state.theme)
        this.setState({...this.state,message,valid});
    }

    handleSend=()=>{
        this.props.sendMessage(this.state.message,this.state.theme,()=>{
            this.setState({...this.state,sent :true})
            setTimeout(this.handleSuccess,2000)
        },(e : any)=>{
            console.log(e);
        })
    }

    firstFieldValid :(val : string|undefined)=> boolean = val =>{
        if (val === undefined || val.length === 0) {
            return false;
        }

        return !this.props.standalone || isEmailValid(val);
    }

    handleSuccess=()=>{
        this.setState({isExpanded : false, sent : false, theme : undefined, message : undefined})
    }

    render(){
        let standAlone = !!this.props.standalone;
        let label = standAlone ? contact_label : send_label;
        let show = standAlone || isLoggedIn(this.props.user);
        let firstField = standAlone ? email : theme_label;

        return show ?
            this.state.sent ?
            <Card className='message-button--login-screen message-window--colors'>
                {V[message_was_sent]}
            </Card> :
            this.state.isExpanded ?
                    <Card className='message-button--login-screen message-window--colors'>
                        <FormGroup
                            label={V[label]}
                        >
                                <InputGroup
                                    className='message-window--input-field'
                                    placeholder={V[firstField]}
                                    onChange={(event: React.FormEvent<HTMLInputElement>) => {
                                        this.handleSetTheme(event.currentTarget.value)
                                    }}
                                />
                            {
                                standAlone ?
                                    <TextArea
                                        growVertically={true}
                                        className='message-window--input-field message-window--text-area'
                                        placeholder={V[message_label]}
                                        onChange={(event: React.FormEvent<HTMLTextAreaElement>) => {
                                            this.handleSetMessage(event.currentTarget.value)
                                        }}
                                    /> :
                                    <InputGroup
                                        className='message-window--input-field'
                                        placeholder={V[message_label]}
                                        onChange={(event: React.FormEvent<HTMLInputElement>) => {
                                            this.handleSetMessage(event.currentTarget.value)
                                        }}
                                    />
                            }
                        </FormGroup>
                        <div className='bp3-dialog-footer-actions'>
                            {
                                standAlone ? null :
                                <Button icon='cross'
                                        intent={Intent.DANGER}
                                        minimal={false}
                                        onClick={this.handleCollapse}>
                                    {V[cancel]} </Button>
                            }
                            <Button icon='key-enter'
                                    disabled={!this.state.valid}
                                    intent={Intent.SUCCESS}
                                    minimal={false}
                                    onClick={this.handleSend}>
                                {V[send_label]} </Button>
                        </div>
                    </Card>:
                    <Button
                        className='message-button--login-screen'
                        icon='envelope'
                        onClick={this.handleExpand}
                        minimal={false}
                        intent={Intent.PRIMARY}>
                        {V[message_support_label]}
                    </Button> :
                null
    }
}

const mapStateToProps = (state : AppState)=>({user : state.user})

export default connect(mapStateToProps,{sendMessage})(ContactSupportTool);

const ContactPageView : FC<ContactSupportToolProps>  = props => (
    <ContactSupportTool
        user={props.user}
        sendMessage={props.pubMessage}
        standalone={true}/>
)

export const ContactPage =  connect(mapStateToProps,{pubMessage})(ContactPageView);