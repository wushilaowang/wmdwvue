import request from './request'

export function login(data) {
    return request({
        url: '/login',
        method: 'post',
        params: data
    })
}

//配置参数
export function config(data) {
    return request({
        url: '/config',
        data: data
    })
}
//轮播图
export function imageInfo() {
    return request({
        url: '/imginfo'
    })
}
//
export function requestNoParam(data) {
    return request({
        url: data
    })
}