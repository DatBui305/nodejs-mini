const Blog = require('../models/blog')
const asyncHandler = require('express-async-handler')

const createBlog = asyncHandler(async(req, res) => {
    const {title, description, category } = req.body
    if(!title || !description || !category) throw new Error('missing input')
    const response = await Blog.create(req.body)
    return res.json({
        success: response ? true : false,
        createBlog: response ? response : 'cannot create new blog'
    })
})

const updateBlog = asyncHandler(async(req, res) => {
    const {bid} = req.params
    if(Object.keys(req.body).length === 0) throw new Error('missing input')
    const response = await Blog.findByIdAndUpdate(bid ,req.body, {new: true})
    return res.json({
        success: response ? true : false,
        updateBlog: response ? response : 'cannot update new blog'
    })
})

const getBlogs = asyncHandler(async(req, res) => {
    const response = await Blog.find()
    return res.json({
        success: response ? true : false,
        updateBlog: response ? response : 'cannot get blogs'
    })
})

/**
 * 
 * khi nguoi dung lai mot bai blog thi phai
 * 1. check xem nguoi do co dislike hay khong => bo diskike
 * 2. chekc truoc do co like hay ko => bo like
 * 
 */
const likeBlog = asyncHandler(async(req, res) => {
    const {_id} = req.user
    const {bid} = req.params
    if(!bid) throw new Error('Missing inputs')
    const blog = await Blog.findById(bid)
    const alreadyDisliked = blog?.dislikes?.find(el => el.toString() === _id)
    if(alreadyDisliked){
        const response = await Blog.findByIdAndUpdate(bid, {$pull: {dislikes: _id}}, {new: true})
        return res.json({
            success: response ? true : false,
            rs: response
        })
    }
    const isLiked = blog?.likes?.find(el => el.toString() === _id)
    if(isLiked){
        const response = await Blog.findByIdAndUpdate(bid, {$pull: {likes: _id}}, {new: true})
        return res.json({
            success: response ? true : false,
            rs: response
        })
    }else{
        const response = await Blog.findByIdAndUpdate(bid, {$push: {likes: _id}}, {new: true})
        return res.json({
            success: response ? true : false,
            rs: response
        })
    }
})


const dislikeBlog = asyncHandler(async(req, res) => {
    const {_id} = req.user
    const {bid} = req.params
    if(!bid) throw new Error('Missing inputs')
    const blog = await Blog.findById(bid)
    const alreadyLiked = blog?.likes?.find(el => el.toString() === _id)
    if(alreadyLiked){
        const response = await Blog.findByIdAndUpdate(bid, {$pull: {likes: _id}}, {new: true})
        return res.json({
            success: response ? true : false,
            rs: response
        })
    }
    const isDisliked = blog?.dislikes?.find(el => el.toString() === _id)
    if(isDisliked){
        const response = await Blog.findByIdAndUpdate(bid, {$pull: {dislikes: _id}}, {new: true})
        return res.json({
            success: response ? true : false,
            rs: response
        })
    }else{
        const response = await Blog.findByIdAndUpdate(bid, {$push: {dislikes: _id}}, {new: true})
        return res.json({
            success: response ? true : false,
            rs: response
        })
    }
})


// const excludedFields = '-firstname -lastname'
const getBlog = asyncHandler(async(req, res) => {
    const {bid} = req.params
    const blog = await Blog.findByIdAndUpdate(bid, {$inc: {numberViews: 1}}, {new: true})
    .populate('likes', 'firstname lastname')
    .populate('dislikes', 'firstname lastname')
    return res.json({
        success: blog ? true : false,
        rs: blog
    })

})


const deleteBlog = asyncHandler(async(req, res) => {
    const {bid} = req.params
    const blog = await Blog.findByIdAndDelete(bid)
    return res.json({
        success: blog ? true : false,
        deletedBlog: blog || 'something went wrong'
    })

})

const uploadImageBlog = asyncHandler(async(req, res) => {
    const {bid} = req.params
    if (!req.file) throw new Error('Missing input')
    const response = await Blog.findByIdAndUpdate(bid, {image: req.file.path}, {new: true})
    return res.json({
        status:response ? true : false,
        updatedBlog: response ? response : 'cannot upload image for blog'
    })
})


module.exports = {
    createBlog,
    updateBlog,
    getBlogs,
    likeBlog,
    dislikeBlog,
    getBlog,
    deleteBlog,
    uploadImageBlog
}