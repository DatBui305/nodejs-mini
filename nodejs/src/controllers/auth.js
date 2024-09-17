import * as services from "../services";
import { interalServerError, badRequest } from "../middleware/handle_error";
import { email, password ,refreshToken} from "../helpers/joi_schema";
import joi from "joi";

export const register = async (req, res) => {
    try {
        //cach 1
        // const {email, password } = req.body
        // if(!email || !password) return res.status(400).json({
        //     err: 1,
        //     mes: "Missing payloads"
        // })
        // console.log({email,password})


        //cach 2
        //tao ra cai object co 2 schema da dc khai bao o helpers
        const {error} = joi.object({email, password}).validate(req.body)
        if(error) return badRequest(error.details[0]?.message, res);
        const response = await services.register(req.body)
        return res.status(200).json(response);
        
    } catch (error) {
        return interalServerError(res)

    }
}

export const login = async (req, res) => {
    try {
        // const {email, password } = req.body
        // if(!email || !password) return res.status(400).json({
        //     err: 1,
        //     mes: "Missing payloads"
        // })
        // console.log({email,password})
        const {error} = joi.object({email, password}).validate(req.body)
        if(error) return badRequest(error.details[0]?.message, res);        
        const response = await services.login(req.body)
        return res.status(200).json(response);
        
    } catch (error) {

        // console.error('Error in register:', error);
        // return res.status(500).json({
        //     err: -1,
        //     mes: error.message,
        // })
        return interalServerError(res)

    }
}


export const refreshTokenController = async (req, res) => {
    try {
        const {error} = joi.object({refreshToken}).validate(req.body)
        if(error) return badRequest(error.details[0]?.message, res);        
        const response = await services.refreshToken(req.body.refreshToken)
        return res.status(200).json(response);
        
    } catch (error) {
        return interalServerError(res)

    }
}