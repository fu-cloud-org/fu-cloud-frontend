import request from '@/utils/request'

// 关注
export function follow(id, userName) {
    return request(({
        url: `/follow/subscribe/${id}`,
        method: 'get',
        params: {
            userName:userName
        }
    }))
}

// 关注
export function unFollow(id, userName) {
    return request(({
        url: `/follow/unsubscribe/${id}`,
        method: 'get',
        params: {
            userName: userName
        }
    }))
}

// 验证是否关注
export function isFollowed(postUserId, userName) {
    return request(({
        url: `/follow/validate/${postUserId}`,
        method: 'get',
        params: {
            userName: userName
        }
    }))
}

export function getMyFans(id, username) {
    return request(({
        url: `/follow/fans/${id}`,
        method: 'get',
        params: {
            username: username
        }
    }))
}

export function getMyFollowers(id, username) {
    return request(({
        url: `/follow/followers/${id}`,
        method: 'get',
        params: {
            username: username
        }
    }))
}