import React, {Component} from 'react';
import MealDataService from "../../api/MealDataService";
import AuthenticationService from "./AuthenticationService";
import OrdersService from "../../api/OrdersService";

class MealList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: null,
            selectableMeals: [],
            selectedMeals: []

        };
        AuthenticationService.setupAxiosInterceptorsForSavedToken();
    }

    componentDidMount() {
        this.refreshMeals();
    };

    refreshMeals = () => {
        MealDataService.retrieveAllMeals()
            .then(response => {
                this.setState({selectableMeals: response.data});
            })
    };

    render() {
        return (
            <div>
                <h1>SELECTABLE MEALS</h1>
                {this.state.message != null && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>CODE</th>
                            <th>NAME</th>
                            <th>PHOTO</th>
                            <th>PRICE</th>
                            <th>DETAIL</th>
                            <th>ADD</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.selectableMeals.map(
                                meal =>
                                    <tr key={meal.code}>
                                        <td>{meal.code}</td>
                                        <td>{meal.name}</td>
                                        <td><img src={meal.photo} width="200" height="100"/></td>
                                        <td>{meal.price.toString()}</td>
                                        <td>{meal.detail}</td>
                                        <td>
                                            <button onClick={() => this.addSelectedMeals(meal.code)}
                                                    className="btn btn-success">ADD
                                            </button>
                                        </td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>

                <br/>
                <h1>SELECTED MEALS</h1>
                {this.state.message != null && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>CODE</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>DETAIL</th>

                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.selectedMeals.map(
                                meal =>
                                    <tr key={meal.code}>
                                        <td>{meal.code}</td>
                                        <td>{meal.name}</td>
                                        <td>{meal.price.toString()}</td>
                                        <td>{meal.detail}</td>
                                        <td>
                                            <button onClick={() => this.removeFromSelectedMeals(meal.code)}
                                                    className="btn btn-danger">REMOVE
                                            </button>
                                        </td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>


                <div>
                    <button onClick={() => this.saveSelectedMeals()}
                            className="btn btn-success">Save Changes
                    </button>
                </div>
            </div>
        );
    }


    addSelectedMeals = (code) => {
        let selectedMeals = this.state.selectedMeals;
        let selectableMeals = this.state.selectableMeals;
        for (let i = 0; i < selectableMeals.length; i++) {
            if (selectableMeals[i].code === code) {
                selectedMeals.push(selectableMeals[i]);
                selectableMeals.splice(i, 1);
            }
        }
        this.setState({selectedMeals: selectedMeals, selectableMeals: selectableMeals});
    };


    removeFromSelectedMeals = (code) => {
        let selectedMeals = this.state.selectedMeals;
        let selectableMeals = this.state.selectableMeals;
        for (let i = 0; i < selectedMeals.length; i++) {
            if (selectedMeals[i].code === code) {
                selectableMeals.push(selectedMeals[i]);
                selectedMeals.splice(i, 1);
            }
        }
        this.setState({selectedMeals: selectedMeals, selectableMeals: selectableMeals});
    };


    saveSelectedMeals = () => {
        let selectedMeals = this.state.selectedMeals;
        let selectedMealsCodes = [];


        for (let i = 0; i < selectedMeals.length; i++) {
            selectedMealsCodes.push(selectedMeals[i].code);
        }

        if(selectedMealsCodes.length===0){
            alert("You must select at least one item...");
        }else{
            let postOrderObject = {
                "username": sessionStorage.getItem("authenticatedUser"),
                "mealId": selectedMealsCodes
            };

            OrdersService.createOrder(postOrderObject).then(response => {
                this.props.history.push(`/orderHistory`);
            });
        }
    };
}

export default MealList;
