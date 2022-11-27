import request from "@/utils/request";

export function setCollect(postId, username) {
    return request({
        url: "/collect/set",
        method: "get",
        params: {
            postId: postId,
            userName: username
        }
    });
}

export function cancelCollect(postId, username) {
    return request({
        url: "/collect/cancel",
        method: "get",
        params: {
            postId: postId,
            userName: username
        }
    });
}

export function isMyCollect(postId, username) {
    return request({
        url: "/collect/isCollected",
        method: "get",
        params: {
            postId: postId,
            userName: username
        }
    });
}