import {adminsRepository} from '../repositories/admins-repository'
import {AdminDBType} from '../repositories/types'
import {ObjectId} from 'mongodb'
import bcrypt from 'bcrypt'
import {jwtService} from '../application/jwt-service'

export const authService = {
    async getAllAdmins(): Promise<AdminDBType[]> {
        return adminsRepository.getAll()
    },
    /**
     *
     * @param email
     * @param password
     * @return null if credentials are incorrect and admin entity in opposite case
     */
    async checkCredentials(email: string, password: string): Promise<AdminDBType | null> {
        return null
    },
    async generateHash(password: string) {
        const hash = await bcrypt.hash(password, 10)
        return hash
    },
    async isPasswordCorrect(password: string, hash: string) {
        const compareResult: boolean = await bcrypt.compare(password, hash)
        return compareResult
    },
    async checkAndFindUserByToken(token: string) {
        try {
            const adminId: ObjectId | null = await jwtService.getUserIdByToken(token)
            if (!adminId) return null
            const admin = await adminsRepository.findById(adminId)
            return admin
        } catch (error) {
            return null
        }
    }
}