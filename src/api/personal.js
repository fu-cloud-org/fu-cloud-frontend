import request from '@/utils/request'

export function followAndFanCount(id) {
    return request({
        url: `/follow/followAndFanCount/${id}`,
        method: 'get'
    })
}