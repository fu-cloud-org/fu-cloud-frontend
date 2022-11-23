import request from "@/utils/request";

export function getCode(to) {
    return request({
        url: "/getCode",
        method: "get",
        params: { to }
    });
}

export function register(userDTO) {
    return request({
        url: "/user/register",
        method: "post",
        data: userDTO
    })
}

export function login(data) {
    return request({
        url: "/user/login",
        method: "post",
        data
    })
}

export function getUserInfo() {
    return request({
        url: "/user/info",
        method: "get",
        // params: {token}
    })
}

export function logout() {
    return request({
        url: "/user/logout",
        // method: "post"
    })
}

export function getUserProfile(userId) {
    return request(({
        url: `/user/profile`,
        method: "get",
        params: {userId}
    }))
}

export function getInfoByName(username, page, size) {
    return request({
        url: '/user/' + username,
        method: 'get',
        params: {
            pageNo: page,
            size: size
        }
    })
}

export function updateInfo(data) {
    return request({
        url: '/user/update',
        method: 'post',
        data
    })
}