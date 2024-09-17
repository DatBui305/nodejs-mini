const { response } = require('express')
const Product = require('../models/product')
const asyncHandler = require('express-async-handler')
const slugify = require('slugify')

const createProduct = asyncHandler(async(req, res) => {
    if(Object.keys(req.body).length === 0) throw new Error('Missing inputs')
    if(req.body && req.body.title) req.body.slug = slugify(req.body.title)
    const newProduct = await Product.create(req.body)
    return res.status(200).json({
        success: newProduct ? true : false,
        createProduct: newProduct ? newProduct : 'cannot create new product'
    })
})

const getProduct = asyncHandler(async(req, res) => {
    const {pid} = req.params
    const product = await Product.findById(pid)
    return res.status(200).json({
        success: product ? true : false,
        productData: product ? product : 'cannot get product'
    })
})

const getProducts = asyncHandler(async (req, res) => {
    try {
        const queries = { ...req.query };
        // Exclude specific fields from queries
        const excludeFields = ['limit', 'sort', 'page', 'fields'];
        excludeFields.forEach(el => delete queries[el]);

        // Format query operators for Mongoose
        let queryString = JSON.stringify(queries);
        queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, matchedEl => `$${matchedEl}`);
        const formatedQueries = JSON.parse(queryString);

        // Filtering with regex for the title field
        if (queries?.title) {
            formatedQueries.title = { $regex: queries.title, $options: 'i' };
        }

        // Initialize the query command
        let queryCommand = Product.find(formatedQueries);

        // Sorting
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            queryCommand = queryCommand.sort(sortBy);
        }

        // Field limiting
        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            queryCommand = queryCommand.select(fields);
        }

        // Pagination
        const page = +req.query.page || 1;
        const limit = +req.query.limit || process.env.LIMIT_PRODUCTS; // Fallback to 10 if env is undefined
        const skip = (page - 1) * limit;
        queryCommand = queryCommand.skip(skip).limit(limit);

        // Execute query
        const response = await queryCommand.exec();
        const counts = await Product.find(formatedQueries).countDocuments();

        res.status(200).json({
            success: true,
            products: response,
            counts
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

const updateProduct = asyncHandler(async(req, res) => {
    const {pid} = req.params
    if(req.body && req.body.title) req.body.slug = slugify(req.body.title)
    const updatedProduct = await Product.findByIdAndUpdate(pid, req.body, {new: true})
    return res.status(200).json({
        success: updatedProduct ? true : false,
        productData: updatedProduct ? updatedProduct : 'cannot update product'
    })
})


const deleteProduct = asyncHandler(async(req, res) => {
    const {pid} = req.params
    if(req.body && req.body.title) req.body.slug = slugify(req.body.title)
    const deletedProduct = await Product.findByIdAndDelete(pid)
    return res.status(200).json({
        success: deletedProduct ? true : false,
        productData: deletedProduct ? deletedProduct : 'cannot delete product'
    })
})

const ratings = asyncHandler(async(req, res) => {
    const {_id} = req.user
    const {star, comment, pid} = req.body
    if(!star || !pid) throw new Error('Missing input')
    const ratingProduct = await Product.findById(pid)
    const alreadyRating = ratingProduct?.ratings?.find(el => el.postedBy.toString() === _id)
    if(alreadyRating) {
        await Product.updateOne({
            ratings: {$elemMatch: alreadyRating}
        }, {
            $set: {"ratings.$.star": star, "ratings.$.comment": comment}
        }, {new: true})
    } else {
        await Product.findByIdAndUpdate(pid, {
            $push: {ratings: {star, comment, postedBy: _id}}
        }, {new: true})
    }
    //sum ratings
    const updatedProduct = await Product.findById(pid)
    const ratingCount = updatedProduct.ratings.length
    const sumRatings = updatedProduct.ratings.reduce((sum, el) => sum + +el.star, 0)
    updatedProduct.totalRatings = Math.round(sumRatings *10 /ratingCount) / 10
    await updatedProduct.save()
    return res.status(200).json({
        status: true,
        updatedProduct
    })
})

const uploadImagesProduct = asyncHandler(async(req, res) => {
    const {pid} = req.params
    if (!req.files) throw new Error('Missing input')
    const response = await Product.findByIdAndUpdate(pid, {$push: {images: { $each: req.files.map(el => el.path)}}}, {new: true})
    return res.json({
        status:response ? true : false,
        updatedProduct: response ? response : 'cannot upload images for product'
    })
})

module.exports = {
    createProduct,
    getProduct,
    getProducts,
    updateProduct,
    deleteProduct,
    ratings,
    uploadImagesProduct
}