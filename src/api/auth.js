import request from "@/utils/request";

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