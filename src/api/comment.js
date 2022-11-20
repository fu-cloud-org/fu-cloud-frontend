import request from '@/utils/request'

export function getCommentList(postId) {
    return request({
        url: '/comment/commentLists',
        method: 'get',
        params: {
            postId: postId
        }
    })
}

export function pushComment(data, userId) {
    return request({
        url: '/comment/create',
        method: 'post',
        params: {
            userId: userId
        },
        data: data
    })
}