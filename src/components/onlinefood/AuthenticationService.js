import axios from 'axios';
import Cookies from 'universal-cookie';

class AuthenticationService{
    executeJwtAuthentication(username,password){
        return axios.post('http://localhost:8034/customer2/authenticate2',{username,password});
    };

    // executeJwtAuthentication(username,password){
    //     return axios.post('http://localhost:8034/admin/authenticate',{username,password});
    // };

    registerSuccessfullLogin(username, password) {
        sessionStorage.setItem('authenticatedUser', username);
        this.setupAxiosInterceptors(username, password);
    }

    refreshJwtAuthentication(token){
        return axios.post('http://localhost:8034/customer2/refresh2',{token});
    }

    registerSuccessfullLoginJwt(username,token, password, remember){
        sessionStorage.setItem('authenticatedUser',username);
        sessionStorage.setItem('authenticatedPassword', password);
        localStorage.setItem('token',token);

        if (remember) {
            const cookies = new Cookies();
            cookies.set('userName', username);
            cookies.set('pass', password);
            cookies.set('rememberLoginInfo', token);
        }
        this.setupAxiosInterceptorsJwt(token);
    }

    logout(){
        sessionStorage.removeItem('authenticatedUser');
        sessionStorage.removeItem('authenticatedPassword');

        localStorage.removeItem('token');
        const cookies = new Cookies();
        cookies.remove('userName');
        cookies.remove('pass');
        cookies.remove('rememberLoginInfo');

        window.location.reload(); // oturum çıktıktan sonra login sayfası yenilenmeli verileri update ediliyor
    }

    isUserLoggedIn(){
        let user = sessionStorage.getItem('authenticatedUser');
        if(user === null) return false;
        return true;
    }

    setupAxiosInterceptorsJwt = (token) =>{
        axios.interceptors.request.use((config)=>{
            if(this.isUserLoggedIn())
                config.headers.authorization = this.createJwtAuthentication(token);
            return config;
        })
    }

    setupAxiosInterceptorsForSavedToken(){
            if(this.isUserLoggedIn())
                this.setupAxiosInterceptorsJwt(localStorage.getItem('token'));
    }

    createJwtAuthentication(token){
        return 'Bearer '+ token;
    };
}

export default new AuthenticationService()
