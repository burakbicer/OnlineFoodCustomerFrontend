import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HeaderComponent from "./HeaderComponent";
import AuthenticatedRoute from "./AuthenticatedRoute";
import MealList from "./MealList";
import LogoutComponent from "./LogoutComponent";
import ErrorComponent from "./ErrorComponent";
import WelcomeComponent from "./WelcomeComponent";
import MealComponent from "./MealComponent";
import OrderHistory from "./OrderHistory";

import Login from "./Login";
class OnlineFoodApp extends Component {
    render() {
        return (
            <div className="onlineFoodApp">
                <Router>
                    <>
                        <HeaderComponent/>
                        <Switch>
                            <Route path="/" exact component={Login}/>
                            <Route path="/login" component={Login}/>
                            <AuthenticatedRoute path="/main/:name" component={WelcomeComponent}/>
                            <AuthenticatedRoute path="/meallist/:code" component={MealComponent}/>
                            <AuthenticatedRoute path="/meallist" component={MealList}/>
                            <AuthenticatedRoute path="/orderHistory" component={OrderHistory}/>
                            <AuthenticatedRoute path="/logout" component={LogoutComponent}/>
                            <Route component={ErrorComponent}/>
                        </Switch>
                    </>
                </Router>
            </div>
        )
    }
}

export default OnlineFoodApp;
