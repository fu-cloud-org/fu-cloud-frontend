import request from '@/utils/request'

// 关注
export function follow(id) {
    return request(({
        url: `/follow/subscribe/${id}`,
        method: 'get'
    }))
}

// 关注
export function unFollow(id) {
    return request(({
        url: `/follow/unsubscribe/${id}`,
        method: 'get'
    }))
}

// 验证是否关注
export function isFollowed(postUserId) {
    return request(({
        url: `/follow/validate/${postUserId}`,
        method: 'get'
    }))
}

export function getMyFans(id) {
    return request(({
        url: `/follow/fans/${id}`,
        method: 'get'
    }))
}

export function getMyFollowers(id) {
    return request(({
        url: `/follow/followers/${id}`,
        method: 'get'
    }))
}