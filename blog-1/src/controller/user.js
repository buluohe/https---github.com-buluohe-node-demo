const loginCheck = (userName,password) => {
    if(userName === 'zhangboyu' && password === 123){
        return true
    }
    return false
}
module.exports = { loginCheck }