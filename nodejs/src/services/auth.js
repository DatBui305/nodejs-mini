import db from '../models'
import bcrupt from 'bcryptjs'
import jwt from 'jsonwebtoken'


const hashPassword = password => bcrupt.hashSync(password, bcrupt.genSaltSync(8));

export const register = ({email, password}) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.findOrCreate({
            where: {email},
            defaults: {
                email,
                password: hashPassword(password)
            }
        })
        const accessToken = response[1] 
        ? jwt.sign({id: response[0].id, email: response[0].email, role_code: response[0].role_code}, process.env.JWT_SECRET, {expiresIn: "5s"}) 
        : null
        const refressToken = response[1] 
        ? jwt.sign({id: response[0].id}, process.env.JWT_SECRET_REFRESH_TOKEN, {expiresIn: "15d"}) 
        : null
        
        resolve({
            err: response[1] ? 0 : 1,
            mes: response[1] ? 'Register is successfully' : 'Email have been used',
            "access_token": accessToken ? `Bearer ${accessToken}`: accessToken,
            "refress_token": refressToken 
        
        })
        if(refressToken){
            await db.User.update({
                refresh_token: refressToken
            }, {
                where: {id: response[0].id}
            })
        }

    } catch (error) {
        reject(error);
    }
})


export const login = ({email, password}) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.findOne({
            where: { email },
            raw: true
        })
        const isChecked = response && bcrupt.compareSync(password, response.password)
        // khoong can [0] vi day no tra ra mot object con o tren can vi no tra ra mot mang 
        const accessToken = isChecked 
        ? jwt.sign({id: response.id, email: response.email, role_code: response.role_code},process.env.JWT_SECRET, {expiresIn: "5s"}) 
        : null
        const refressToken = isChecked
        ? jwt.sign({id: response.id}, process.env.JWT_SECRET_REFRESH_TOKEN, {expiresIn: "60s"}) 
        : null
        resolve({
            err: accessToken ? 0 : 1,
            mes: accessToken ? 'Login is successfully' : response ? "Password incorrect" : "Email isn't register",
            "access_token": accessToken ? `Bearer ${accessToken}`: accessToken,
            'refresh_token': refressToken

        })
        if(refressToken){
            await db.User.update({
                refresh_token: refressToken
            }, {
                where: {id: response.id}
            })
        }

    } catch (error) {
        reject(error);
    }
})

export const refreshToken = ( refresh_token ) => new Promise(async (resolve, reject)=>{
    try{
        const response = await db.User.findOne({
            where: { refresh_token }
        })
        console.log(response)
        if(response) {
            jwt.verify(refresh_token, process.env.JWT_SECRET_REFRESH_TOKEN, (err) => {
                
                console.log(err)
                if(err){
                    console.log(err)
                    resolve({
                        err:1,
                        mes: 'Refresh token expired. require login'
                    })
                    
                }
                else{
                    const accessToken = jwt.sign({id: response.id, email: response.email, role_code: response.role_code},process.env.JWT_SECRET, {expiresIn: "45s"}) 
                    console.log(err)
                    resolve({
                        err: accessToken ? 0 : 1,
                        mes: accessToken ? 'Ok' : 'Fail to gen new access token',
                        'access_token': accessToken,
                        'refresh_token': refresh_token
                    })
    
                }
               
            })
        }

    } catch(error) {
        console.log(error)
        reject(error)
    }
})