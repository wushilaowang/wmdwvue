import request from './request'

//单位
export function queryUnit(data) {
    return request({
        url: 'unit',
        params: data.data
    })
}