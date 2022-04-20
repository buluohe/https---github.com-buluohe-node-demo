const { loginCheck } = require('../controller/user')
const { SuccessModel,ErrorModel} = require('../model/resModel')

const handleUserRouter = (req,res) => {
    // 新建一篇博客
    const method = req.method

    if(method === 'POST' && req.path === '/api/user/login'){
        const { userName, password} = req.body
        const result = loginCheck(userName,password)
        if(result){
            return new SuccessModel()
        }
        return new ErrorModel('登陆失败')
    }

}
module.exports = handleUserRouter