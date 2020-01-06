import axios from 'axios';

class OrdersService {
    orderHistory(customerUsername) {
        return axios.get(`http://localhost:8034/orders/history/${customerUsername}`);
    };

    createOrder(createOrderObject) {
        return axios.post(`http://localhost:8034/orders/create`,createOrderObject);
    };
}

export default new OrdersService();
