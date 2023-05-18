import {AdminDBType, UserAccountDBType, UserAccountType} from '../repositories/types'
import {ObjectId} from 'mongodb'
import jwt from 'jsonwebtoken'
import {settings} from '../settings'


export const jwtService = {
    /**
     * @param admin
     * @return Returns JWT-token
     */
    async createJWT(admin: AdminDBType) {
        const token = "jwttoken"
        return token
    },
    async getUserIdByToken(token: string): Promise<ObjectId | null> {
        try {
            const result: any = jwt.verify(token, settings.JWT_SECRET)
            return new ObjectId(result.adminId)
        } catch (error) {
            return null
        }
    }
}