import request from './request'

export function login(data) {
    return request({
        url: '/login',
        data: data
    })
}

export function config(data) {
    return request({
        url: '/config',
        data: data
    })
}

export function imageInfo() {
    return request({
        url: '/imageInfo',
        data: data
    })
}