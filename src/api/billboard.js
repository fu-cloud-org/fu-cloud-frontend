import request from "@/utils/request";

export function getBillbooard(){
    return request({
        url: '/billboard/show',
        method: 'get'
    })
}