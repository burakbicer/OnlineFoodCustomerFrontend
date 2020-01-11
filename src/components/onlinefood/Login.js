import React from 'react'
import {Component} from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import AuthenticationService from "./AuthenticationService";
import MealDataService from "../../api/MealDataService";
import Cookies from 'universal-cookie';
import { withRouter } from 'react-router';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: "test",
            password: "",
            remember: "false",
            isLoggedIn: null
        };
    }
    componentDidMount() {
        this.tokenCheck();
    }

    tokenCheck = () => {
        const cookies = new Cookies();
        if (cookies.get('rememberLoginInfo') != null) { // bu kısımda cookie kontrolu yapıyor varsa alıyor
            AuthenticationService.refreshJwtAuthentication(cookies.get('rememberLoginInfo')) // token geçerli mi kontrolu
                .then(response => {
                    AuthenticationService.registerSuccessfullLoginJwt(cookies.get('userName'), cookies.get('rememberLoginInfo'))
                    this.props.history.push(`/meallist`);
                })
                .catch(error => { // token geçerli değilse login sayfasına git
                    console.log("FAILED");
                    AuthenticationService.logout();
                    this.props.history.push(`/login`);
                });
        }
    };

    render() {
        return (
                <MuiThemeProvider>
                    <div>
                        <AppBar
                            title="Login"
                        />
                        <TextField
                            hintText="Enter your Username"
                            floatingLabelText="Username"
                            onChange = {(event,newValue) => this.setState({username:newValue})}
                        />
                        <br/>
                        <TextField
                            type="password"
                            hintText="Enter your Password"
                            floatingLabelText="Password"
                            onChange = {(event,newValue) => this.setState({password:newValue})}
                        />
                        <br/>

                    </div>
                    <div className="form-group">
                        <input type="checkbox" name="remember"
                               value={this.state.remember}
                               onChange={this.rememberChanges}/> Remember me
                    </div>
                    <div>
                        <RaisedButton label="Log In" primary={true} style={style} onClick={(event) => this.loginClicked(event)}/>
                    </div>
                </MuiThemeProvider>
        );
    }

    rememberChanges = () => {
        this.setState({remember: true});
    };

    loginClicked(event) {
        AuthenticationService.executeJwtAuthentication(this.state.username, this.state.password)
            .then(response => {
                AuthenticationService.registerSuccessfullLoginJwt(this.state.username, response.data.token, this.state.password, this.state.remember);
                this.props.history.push(`/main/${this.state.username}`);
            })
            .catch(error => {
                this.setState({isLoggedIn: false});
                console.log("FAILED");
            })
    }
}
const style = {
    margin: 15,
};
export default withRouter(Login);
