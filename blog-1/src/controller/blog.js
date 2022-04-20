 const getList = (author,keyword) => {
    // 先返回正确格式的假数据
    return [
        {
            id:1,
            title:'标题A',
            content:'内容A',
            createTime:1650208313258,
            author:'zhangboyu'
        },
        {
            id:2,
            title:'标题B',
            content:'内容B',
            createTime:1650208322418,
            author:'renping'
        }
    ]
}

const getDetail = (id) => {
    // 先返回正确格式的假数据
    return {
        id:1,
        title:'标题A',
        content:'内容A',
        createTime:1650208313258,
        author:'zhangboyu'
    }
}

const newBlog = (blogData = {}) => {
    console.log(blogData);
    // blogData 是一个博客对象，包含 title、content属性
    return {
        id:3    // 表示新建博客，插入到数据表里面的id
    }
}

const updateBlog = (id, blogData = {}) => {
    // id 是更新博客的ID
    // blogData 是一个博客对象，包含 title、content属性
    console.log('update',id,blogData);
    return true
}

const deleteBlog = (id) => {
    // id 是删除博客的ID
    console.log('delete',id);
    return true
}
module.exports = {
    getList,
    getDetail,
    newBlog,
    deleteBlog,
    updateBlog
}