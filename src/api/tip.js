import request from "@/utils/request";

export function getDailyTip(){
    return request({
        url: '/tip/daily',
        method: 'get'
    })
}