import request from '@/utils/request'

export function getPostsByTag(paramMap) {
    return request({
        url: '/tag/' + paramMap.name,
        method: 'get',
        params: {
            page: paramMap.page,
            size: paramMap.size
        }
    })
}