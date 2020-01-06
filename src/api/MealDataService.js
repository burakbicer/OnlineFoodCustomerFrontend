import axios from 'axios';

class MealDataService{
    retrieveAllMeals(){
        console.log('execute started');
        return axios.get('http://localhost:8034/meals/all');
    };

    deleteMeal(code){
        console.log('execute started');
        return axios.delete(`http://localhost:8034/meals/${code}`);
    };

    retrieveMeal(code){
        console.log('execute started');
        return axios.get(`http://localhost:8034/meals/${code}`);
    };

    updateMeal(code, meal){
        console.log('execute started');
        return axios.put(`http://localhost:8034/meals/${code}`, meal);
    };

    createMeal(meal){
        console.log('execute started');
        return axios.post(`http://localhost:8034/meals/create`, meal);
    };
}

export default new MealDataService();