import {withRouter} from "react-router-dom";
import React, {Component} from 'react';

class WelcomeComponent extends Component {
    render() {
        return <div>You have logged in successfully, {sessionStorage.getItem("authenticatedUser")}.</div>;
    }
}

export default withRouter(WelcomeComponent);
