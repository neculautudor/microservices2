import * as jwt from "jsonwebtoken"
import * as dotenv from "dotenv"
dotenv.config()
export const generateToken = async (id: number) => {
    try{
        const token = await jwt.sign({name: id}, process.env.TOKEN_SECRET, {expiresIn: '1h'})
        return token
    }catch(error){
        throw error
    }
}