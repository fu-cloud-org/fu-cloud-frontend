const getters = {
    token: state => state.user.token,   // token
    user: state => state.user.user,     // 用户对象
    userName: state => state.user.userName, // 用户名
}
export default getters