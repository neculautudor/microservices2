import * as jwt from "jsonwebtoken"
import * as crypto from "crypto"
import { Logger } from "@nestjs/common"
import * as dotenv from "dotenv"
dotenv.config()
const logger = new Logger()
logger.log(crypto.randomBytes(64).toString('hex'))
export const generateToken = async (id: number) => {
    try{
        const token = await jwt.sign({name: id}, process.env.TOKEN_SECRET, {expiresIn: '1h'})
        return token
    }catch(error){
        throw error
    }
}