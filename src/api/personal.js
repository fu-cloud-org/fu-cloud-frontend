import request, {getBaseURL} from '@/utils/request'

export function followAndFanCount(id) {
    return request({
        url: `/follow/followAndFanCount/${id}`,
        method: 'get'
    })
}

export function getMyPosts(id) {
    return request({
        url: `/post/getMyPosts/${id}`,
        method: 'get'
    })
}

export function updateAvatar(userName, avatarPath) {
    return request({
        url: `/user/updateAvatar`,
        method: 'get',
        params: {
            userName: userName,
            avatarPath: avatarPath,
        }
    })
}

const avatarApi = {
    uploadAvatar: (userName) => `${getBaseURL()}/user/uploadAvatar?userName=${userName}`,
}

export { avatarApi }