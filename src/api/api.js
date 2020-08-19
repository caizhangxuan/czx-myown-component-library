import axios from "axios";
import {ApiConfig} from "../../static/HttpConfig";

let base = ApiConfig.BaseUrl;

const getFetch = (url,params) => {
    return axios.get(`${base}/${url}`, {params:params})
};

const postFetch = (url,params) => {
    return axios.post(`${base}/${url}`, params, {
        headers: {
            "Content-Type": "application/json"
        }
    })
};


// 登录
export const Login = params => postFetch('login',params);

// 发送短信验证码
export const getMessageCode = (params) => getFetch('account/login',params);
