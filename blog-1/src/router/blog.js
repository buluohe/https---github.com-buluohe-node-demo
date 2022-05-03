const { getList, getDetail, newBlog, updateBlog, deleteBlog } = require('../controller/blog')
const { SuccessModel,ErrorModel} = require('../model/resModel')


// 统一的登录验证函数
const loginCheck = (req) => {
    if(!req.session.username){
        return Promise.resolve(new ErrorModel('尚未登陆'))
    }
}

const handleBlogRouter = (req,res) => {
    // 新建一篇博客
    const method = req.method
    const { id } = req.query


    
    // 博客列表
    if(method === 'GET' && req.path === '/api/blog/list'){
        let { author = '', keyword = ''} = req.query

        if(req.query.isadmin){
            const loginCheckResult = loginCheck(req)
            if(loginCheckResult){
                // 未登录
                return loginCheckResult
            }
            // 强制查询自己的博客
            author = req.session.username
        }

        // const listData = getList(author,keyword)
        // return new SuccessModel(listData)
        const result = getList(author,keyword)
        return result.then(listData => {
            return new SuccessModel(listData)
        })
    }

    // 博客详情
    if(method === 'GET' && req.path === '/api/blog/detail'){
        // const detailData = getDetail(id)
        // return new SuccessModel(detailData)
        const result = getDetail(id)
        return result.then(data => {
            return new SuccessModel(data)
        })
    }

    // 新建博客
    if(method === 'POST' && req.path === '/api/blog/new'){
        // const newBlogData = newBlog(req.body)
        // return new SuccessModel(newBlogData)

        const loginCheckResult = loginCheck(req)
        if(loginCheckResult){
            return loginCheckResult
        }

        req.body.author = req.session.username 
        const result = newBlog(req.body)
        return result.then(data => {
           return new SuccessModel(data) 
        })
        
    }

    // 更新博客
    if(method === 'POST' && req.path === '/api/blog/update'){
    //  const result = updateBlog(id, req.body)
    //  if(result){
    //      return new SuccessModel()
    //  } else {
    //      return new ErrorModel('更新博客失败')
    //  }

        const loginCheckResult = loginCheck(req)
        if(loginCheckResult){
            return loginCheckResult
        }

        const result = updateBlog(id, req.body)
        return result.then(val => {
            if(val){
                return new SuccessModel()
            } else {
                return new ErrorModel('更新博客失败')
            }
        })
    }

    // 删除博客
    if(method === 'POST' && req.path === '/api/blog/del'){

        const loginCheckResult = loginCheck(req)
        if(loginCheckResult){
            return loginCheckResult
        }

        // 暂时使用假数据
        const author = req.session.username 
        const result = deleteBlog(id,author)
        return result.then(val => {
            if(val){
                return new SuccessModel()
            } else {
                return new ErrorModel('删除博客失败')
            }
        })
    }
}
module.exports = handleBlogRouter