import axios from 'axios';

export default function request(options) {
    //跨域访问发送cookie
    axios.defaults.withCredentials = true;
    const instance = axios.create({
        baseURL: "http://shx.oupusoft.com/oupu_sxwmdw",
        timeout: 20000
    })

    instance.interceptors.request.use(res => {
        return res
    },error => {
        return error
    })

    instance.interceptors.response.use(res => {
        
        return res
    },error => {
        return error
    })

    return instance(options).then(res => {
        return res
    }).catch(err => {
        return err
    })
}