import jwt, { TokenExpiredError } from 'jsonwebtoken'
import { notAuth } from './handle_error'

const verifyToken = (req, res, next) => {

    const token = req.headers.authorization
    if (!token) return notAuth('Required authorization', res)
    const accessToken = token.split(' ')[1]
    jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => {
        if(err){
            // console.log(err)
            const isChecked = err instanceof TokenExpiredError 
            // console.log(isChecked)
            if (!isChecked) return notAuth('Access Token is invalid', res, isChecked)
            if (isChecked) return notAuth('Access Token is expired', res, isChecked)    
        }
       
        req.user = user
        next()
    })
}

export default verifyToken