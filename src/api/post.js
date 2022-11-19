import request, {getBaseURL} from '@/utils/request'

// 列表
export function getList(pageNo, size, tab) {
    return request(({
        url: '/post/list',
        method: 'get',
        params: { pageNo: pageNo, size: size, tab: tab }
    }))
}

export function release(post, userName) {
    return request({
        url: '/post/release',
        method: 'post',
        data: post,
        params: { userName: userName }
    })
}

export function getPostDetail(id) {
    return request({
        url: `/post`,
        method: 'get',
        params: {
            id: id
        }
    })
}

export function getRecommendPosts(id) {
    return request({
        url: '/post/recommend',
        method: 'get',
        params: {
            postId: id
        }
    })
}

const postManager = {
    uploadCover: (userName) => `${getBaseURL()}/post/uploadCover?userName=${userName}`,
}

export { postManager }