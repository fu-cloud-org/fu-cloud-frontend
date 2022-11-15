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

const postManager = {
    uploadCover: (userName) => `${getBaseURL()}/post/uploadCover?userName=${userName}`,
}

export { postManager }