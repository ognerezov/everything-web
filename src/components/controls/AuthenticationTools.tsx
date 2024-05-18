import React,{PureComponent} from "react";
import {User} from "../../model/User";
import {AppState} from "../../store/configureStore";
import {connect} from "react-redux";

interface AuthenticationToolsProps {
    user : User
}

interface AuthenticationToolsState {

}

class AuthenticationTools extends PureComponent<AuthenticationToolsProps,AuthenticationToolsState>{
    render(){
        return <div>

        </div>
    }
}

const mapStateToProps = (state : AppState) =>({user : state.user})

export default connect(mapStateToProps,{})(AuthenticationTools);