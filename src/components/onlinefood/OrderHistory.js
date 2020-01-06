import React, {Component} from 'react';
import AuthenticationService from "./AuthenticationService";
import OrdersService from "../../api/OrdersService";
import OrderHistoryTable from "./OrderHistoryTable";


class OrderHistory extends Component {


    constructor(props) {
        super(props);
        this.state = {
            message: null,
            orders: []
        };
        AuthenticationService.setupAxiosInterceptorsForSavedToken();
    }

    componentDidMount() {
        this.fetchOrderHistory();
    };

    fetchOrderHistory = () => {
        OrdersService.orderHistory(sessionStorage.getItem("authenticatedUser"))
            .then(response => {
                this.setState({orders: response.data});
            });
    };

    render() {
        return (
            <div>
                <OrderHistoryTable rows={this.state.orders}/>
            </div>
        )
    }
}

export default OrderHistory;
