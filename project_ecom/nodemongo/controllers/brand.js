const Brand = require('../models/brand')
const asyncHandler = require('express-async-handler')

const createBrand = asyncHandler(async(req, res) => {
    const response = await Brand.create(req.body)
    return res.json({
        success: response ? true : false,
        createBrand: response ? response : 'cannot create new brand'
    })
})

const getBrands = asyncHandler(async(req, res) => {
    const response = await Brand.find().select('title _id')
    return res.json({
        success: response ? true : false,
        brands: response ? response : 'cannot get brand'
    })
})

const updateBrand = asyncHandler(async(req, res) => {
    const {bid} = req.params
    const response = await Brand.findByIdAndUpdate(bid, req.body, {new: true})
    return res.json({
        success: response ? true : false,
        updatedBrand: response ? response : 'cannot update Brand'
    })
})


const deleteBrand = asyncHandler(async(req, res) => {
    const {bid} = req.params
    const response = await Brand.findByIdAndDelete(bid)
    return res.json({
        success: response ? true : false,
        deletedBrand: response ? response : 'cannot delete Brand'
    })
})

module.exports = {
    createBrand,
    updateBrand,
    deleteBrand,
    getBrands
}