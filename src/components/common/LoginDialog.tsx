import React,{PureComponent} from "react";
import {
    Button,
    Dialog,
    FormGroup,
    Icon,
    InputGroup,
    Position,
    Toast2,
    OverlayToaster,
    Tooltip
} from "@blueprintjs/core";
import {hasReadAccess, User} from "../../model/User";
import {AppState} from "../../store/configureStore";
import {ExceptionType, noException} from "../../actions/error";
import {connect} from "react-redux";
import {enterCodeAndGetChapters} from "../../thunks/getChapter";
import ProcessInfo from "./ProcessInfo";
import {
    accessCode,
    cancel, email, email_delivered, email_error, email_is_processed, email_was_sent,
    enter_code, input_password,
    inputAccessCode, login_caption, logout_label, password, password_not_matches,
    register_caption, register_terms, registered_user_caption,
    registration, repeat_password,
    V, wrong_email_format
} from "../../vocabulary/Vocabulary";
import QuotationViewer from "../viewers/QuotationViewer";
import {Intent} from "@blueprintjs/core/lib/esm/common/intent";
import {isEmailValid} from "../../validators/EmailValidator";
import {register,logout} from "../../thunks/register";
import {ConnectionResponse} from "../../service/connection";
import {getErrorMessage} from "../../errors/ErrorMapper";
import {getCurrentChapters} from "../../thunks/getChapter";
import {refresh} from "../../thunks/refresh";
import {IconName} from "@blueprintjs/icons";
import {MaybeElement} from "@blueprintjs/core/src/common/props";
import ContactSupportTool from "../controls/ContactSupportTool";
import {isMobile} from "../../service/MediaInfo";
import {getData} from "../../thunks/getData";
import {DataType} from "../../actions/data";

interface LoginDialogProps {
    user : User;
    noException : any;
    enterCodeAndGetChapters :any;
    register : any;
    getCurrentChapters :any;
    refresh : any;
    logout : any;
    getData : any;
}

interface LoginDialogState {
    accessCode : string;
    showRegistration: boolean;
    showLogin : boolean;
    showPassword : boolean;
    inputFocused : boolean;
    username ?: string;
    invalidEmail : boolean;
    password ?: string;
    repeatPassword ?: string;
    notSamePasswords: boolean;
    errorMessage ?: string;
}

class LoginDialog extends PureComponent<LoginDialogProps,LoginDialogState>{

    constructor(props: LoginDialogProps, context: any) {
        super(props, context);
        this.state = {
            accessCode : '',
            showRegistration : false,
            showLogin : false,
            showPassword : false,
            invalidEmail : false,
            notSamePasswords : false,
            inputFocused : false
        }
        this.props.getData(DataType.Max);
        this.props.refresh(this.props.getCurrentChapters);
    }

    setAccessCode =(accessCode: string) =>{
        this.setState({...this.state, accessCode: accessCode})
    };

    handleShowRegistration =()=>{
        this.props.noException();
        this.setState({...this.state,showRegistration :true, errorMessage : undefined});
    }

    handleCloseRegistration =()=>{
        this.setState({...this.state,showRegistration :false, errorMessage : undefined});
    }

    handleShowLogin =()=>{
        this.props.noException();
        this.setState({...this.state,showLogin :true, errorMessage : undefined});
    }

    handleCloseLogin =()=>{
        this.props.noException();
        this.setState({...this.state,showLogin :false, errorMessage : undefined});
    }

    handleSuccessRegistration = ()=>{
        this.props.noException(ExceptionType.WaitForEmail);
        this.handleCloseRegistration();
    }

    toggleShowPassword=()=>{
        this.setState({...this.state,showPassword : !this.state.showPassword})
    }

    setFocused=()=>{
        this.props.noException();
        this.setState({...this.state, inputFocused : true})
    }

    setNotFocused=()=>{
        this.setState({...this.state, inputFocused : false})
    }

    setUsername=(username : string)=>{
        const invalidEmail = username !== undefined && !isEmailValid(username);
        this.setState({...this.state,
                                invalidEmail,
                                username,
                                errorMessage : undefined
        });
    }

    setPassword=(password : string)=>{
        const notSamePasswords = password !== this.state.repeatPassword;
        this.setState({...this.state,
            password,
            notSamePasswords,
            errorMessage : undefined
        });
    }

    setRepeatPassword=(repeatPassword : string)=>{
        const notSamePasswords = repeatPassword !== this.state.password;
        this.setState({...this.state,
            repeatPassword,
            notSamePasswords,
            errorMessage : undefined
        });
    }
    getRegistrationStatus=()=>{
        let icon : IconName | MaybeElement = 'error';
        let intent : Intent = Intent.DANGER;
        let content : string = '';
        if(!this.state.errorMessage && !this.state.invalidEmail && !this.state.notSamePasswords){
            if(this.state.inputFocused && isMobile()){
                return null;
            }
            intent = Intent.PRIMARY;
            icon  ='info-sign'
            content = V[register_terms]
        } else{
            content = this.state.errorMessage ? this.state.errorMessage :
                      this.state.invalidEmail ? V[wrong_email_format] :V[password_not_matches]
        }
        return (
            <OverlayToaster position={Position.TOP} >
                <Toast2 intent={intent} icon={icon} message={content} />
            </OverlayToaster>
        )
    }
    getLoginErrorStatus=()=>{
        return (this.state.errorMessage ?
            <OverlayToaster position={Position.TOP} >
                <Toast2 intent={Intent.DANGER} icon='error' message={this.state.errorMessage} />
            </OverlayToaster> : null)
    }

    registrationErrorHandler=(e: ConnectionResponse)=>{
        this.props.noException();
        this.setState({...this.state, errorMessage : getErrorMessage(e)})
    }

    register =()=>{this.props.register(
        this.state.username,
        this.state.password,
        this.registrationErrorHandler,
        this.handleSuccessRegistration
    )};

    login = ()=>{
        this.props.register(
            this.state.username,
            this.state.password,
            this.registrationErrorHandler,
            this.handleCloseLogin,
            true
        )
    }

    handleLogout = ()=>{
        this.props.logout();
    }

    getLockButton=()=>{
        return <Button
                    icon={this.state.showPassword  ? "unlock" : "lock"}
                    minimal={true}
                    onClick={this.toggleShowPassword}/>
    }

    getRegistrationForm = ()=>{
        return (
            <Dialog
                className='process-container--holder'
                isOpen={this.state.showRegistration }
                transitionDuration={0}
            >
                {this.getRegistrationStatus()}
                <ProcessInfo/>
                <div className="bp3-dialog-body">

                    {this.getEmailField()}
                    {this.getPasswordField()}
                    <FormGroup
                        label={V[repeat_password]}
                    >
                        <InputGroup
                            className="login-fields"
                            placeholder={V[repeat_password]}
                            type={this.state.showPassword ? "text" : "password"}
                            rightElement={this.getLockButton()}
                            onChange={(event : React.FormEvent<HTMLInputElement>)=>
                            {this.setRepeatPassword(event.currentTarget.value);
                                this.props.noException()}}
                            onFocus={this.setFocused}
                            onBlur={this.setNotFocused}
                        />
                    </FormGroup>
                </div>
                {this.getLoginFormFooter(this.register,this.handleCloseRegistration,this.getRegisterButton())}
            </Dialog> )

    }

    getRegisterButton =()=>{
        return <Button icon='user'
                   onClick={this.register}
                   minimal={true}
                   disabled={!this.state.username || !this.state.password || this.state.invalidEmail || this.state.notSamePasswords}>{V[register_caption]} </Button>
    }
    getLoginButton =()=>{
        return <Button icon='log-in'
                       onClick={this.login}
                       minimal={true}
                       disabled={!this.state.username || !this.state.password }>{V[login_caption]} </Button>
    }


    getLoginFormFooter=(onClick :()=>void,onCancel :()=>void, button : React.ReactNode)=>{
       return <div className='bp3-dialog-footer'>
            <div className='bp3-dialog-footer-actions'>
                <Button icon='cross' onClick={onCancel} minimal={true} intent={Intent.DANGER}>{V[cancel]} </Button>
                {button}
            </div>
        </div>
    }
    getEmailField=()=>{
        return                 <FormGroup
            label={V[registration]}
        >
            <InputGroup
                type="email"
                className="login-fields"
                placeholder={V[email]}
                onChange={(event : React.FormEvent<HTMLInputElement>)=> this.setUsername(event.currentTarget.value)}
                onFocus={this.setFocused}
                onBlur={this.setNotFocused}
            />
        </FormGroup>
    }

    getPasswordField=()=>{
        return <FormGroup
            label={V[password]}
        >
            <InputGroup
                className="login-fields"
                placeholder={V[input_password]}
                type={this.state.showPassword ? "text" : "password"}
                rightElement={this.getLockButton()}
                onChange={(event : React.FormEvent<HTMLInputElement>)=>
                {this.setPassword(event.currentTarget.value);
                    this.props.noException()}}
                onFocus={this.setFocused}
                onBlur={this.setNotFocused}
            />
        </FormGroup>
    }

    getLoginForm=()=>{
        return <Dialog
            className='process-container--holder'
            isOpen={this.state.showLogin}
            transitionDuration={0}
        >
            {this.getLoginErrorStatus()}
            <ProcessInfo/>
            <div className="bp3-dialog-body">
                {this.getEmailField()}
                {this.getPasswordField()}
            </div>
            {this.getLoginFormFooter(this.login,this.handleCloseLogin,this.getLoginButton())}
        </Dialog>
    }
    getEmailStatus=()=>{
        let icon : IconName | MaybeElement = null;
        let intent : Intent = Intent.NONE;
        let content : string = '';
        switch (this.props.user.emailStatus) {
            case 'deferred':
            case 'blocked':
            case 'bounce':
                icon = 'error';
                intent = Intent.DANGER;
                content = V[email_error];
                break;
            case 'sent':
            case 'not sent':
                icon = 'warning-sign';
                intent = Intent.WARNING;
                content = V[email_was_sent];
                break;
            case 'processed':
                icon = 'time';
                intent = Intent.PRIMARY;
                content = V[email_is_processed];
                break;
            case 'delivered':
                icon = 'tick';
                intent = Intent.SUCCESS;
                content = V[email_delivered];
                break;
        }

        return <div className='login-icon'>
            <div className='login-username-text--container' >
                <Tooltip className='login-username-text' content={content} intent={intent}>
                    <Icon icon={icon} intent={intent} className='login-username-text' size={16}/>
                </Tooltip>
            </div>
        </div>

    }

    render(){
        return<div>
            <Dialog
                transitionDuration={0}
                className='process-container--holder'
                isOpen={!hasReadAccess(this.props.user)}
                canEscapeKeyClose={false}
                canOutsideClickClose={false}>
                {this.state.showRegistration || this.state.showLogin ? null : <ProcessInfo className='process-container'/>}
                {this.state.inputFocused ? null :<QuotationViewer /> }
                {this.getRegistrationForm()}
                {this.getLoginForm()}
                <div className="bp3-dialog-body">
                    <h6>

                    </h6>
                    <FormGroup
                        label={V[accessCode]}
                    >
                        <InputGroup
                            className="login-fields"
                            placeholder={V[inputAccessCode]}
                            rightElement={<Button icon='log-in' onClick={this.handleLoginAttempt} minimal={true}>{V[enter_code]} </Button>}
                            onChange={(event : React.FormEvent<HTMLInputElement>)=>
                            {this.setAccessCode(event.currentTarget.value);
                                this.props.noException()}}
                            onFocus={this.setFocused}
                            onBlur={this.setNotFocused}
                        />
                    </FormGroup>
                </div>
                <div className='bp3-dialog-footer'>
                    { this.props.user && this.props.user.username ?
                    <div className='bottom-container'>
                        {this.getEmailStatus()}
                        <div className='login-username'>
                            <span className='login-username-text--container'>
                                <span className='login-username-text'>
                                    {V[registered_user_caption] + this.props.user.username}
                                </span>
                            </span>
                        </div>
                        <Button className='login-button' icon='log-out' onClick={this.handleLogout} minimal={true}>{V[logout_label]} </Button>

                    </div> :
                    <div className='bp3-dialog-footer-actions'>
                        <Button icon='log-in' onClick={this.handleShowLogin} minimal={true}>{V[login_caption]} </Button>
                        <Button icon='user' onClick={this.handleShowRegistration} minimal={true}>{V[register_caption]} </Button>
                    </div>}

                </div>
                <ContactSupportTool/>
            </Dialog>
        </div>
    }
    private handleLoginAttempt =()=>{
       this.props.enterCodeAndGetChapters(this.state.accessCode);
    }
}

const mapStateToProps =(state : AppState)=>({
    user : state.user
});

export default connect(mapStateToProps,{noException,enterCodeAndGetChapters,register,getCurrentChapters,refresh,logout,getData})(LoginDialog)