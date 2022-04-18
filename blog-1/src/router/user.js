const handleUserRouter = (req,res) => {
    // 新建一篇博客
    const method = req.method

    if(method === 'POST' && req.path === '/api/user/login'){
        return {
            msg:'这是登陆的接口'
        }
    }

}
module.exports = handleUserRouter