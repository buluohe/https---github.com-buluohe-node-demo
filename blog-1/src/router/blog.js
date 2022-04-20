const { getList, getDetail, newBlog,updateBlog, deleteBlog } = require('../controller/blog')
const { SuccessModel,ErrorModel} = require('../model/resModel')
const handleBlogRouter = (req,res) => {
    // 新建一篇博客
    const method = req.method
    const { id } = req.query

    if(method === 'GET' && req.path === '/api/blog/list'){
        const { author = '', keyword = ''} = req.query
        const listData = getList(author,keyword)
        return new SuccessModel(listData)
    }
    if(method === 'GET' && req.path === '/api/blog/detail'){
        const detailData = getDetail(id)
        return new SuccessModel(detailData)
    }
    if(method === 'POST' && req.path === '/api/blog/new'){
        const newBlogData = newBlog(req.body)
        return new SuccessModel(newBlogData)
    }
    if(method === 'POST' && req.path === '/api/blog/update'){
        const result = updateBlog(id, req.body)
        if(result){
            return new SuccessModel()
        } else {
            return new ErrorModel('更新博客失败')
        }
    }
    if(method === 'POST' && req.path === '/api/blog/delete'){
        const result = deleteBlog(id)
        if(result){
            return new SuccessModel()
        } else {
            return new ErrorModel('删除博客失败')
        }
    }

}
module.exports = handleBlogRouter