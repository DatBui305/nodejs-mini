import * as services from "../services";
import { badRequest, internalServerError } from "../middleware/handle_error"; // Corrected import
import {description, bid, filename, title, image, category_code, price, available, bids } from "../helpers/joi_schema";
import joi from "joi";
const cloudinary = require('cloudinary').v2;


export const getBooks = async (req, res) => {
    try {
        const response = await services.getBooks(req.query);
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res); // Corrected function call
    }
}

export const createNewBook = async (req, res) => {
    try {
        const fileData = req.file
        const {error} = joi.object({title, image, category_code, price, available, description}).validate({...req.body, image: fileData?.path})
        if(error) {
            if(fileData) cloudinary.uploader.destroy(fileData.filename)
            return badRequest(error.details[0].message, res)

        }        
        const response = await services.createNewBook(req.body, fileData);
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res); // Corrected function call
    }
}

export const updateBook = async (req, res) => {
    try {
        console.log(req.user)
        const fileData = req.file
        const {error} = joi.object({bid}).validate({bid: req.body.bid})
        if(error) {
            if(fileData) cloudinary.uploader.destroy(fileData.filename)
            return badRequest(error.details[0].message, res)
        }        
        const response = await services.updateBook(req.body, fileData);
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res); // Corrected function call
    }
}

export const deleteBook = async (req, res) => {
    try {
        const {error} = joi.object({bids, filename}).validate(req.query)
        if(error) {
            return badRequest(error.details[0].message, res)
        }        
        const response = await services.deleteBook(req.query.bids, req.query.filename );
        return res.status(200).json(response);
    } catch (error) {
        return internalServerError(res); // Corrected function call
    }
}