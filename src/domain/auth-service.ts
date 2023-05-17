import {usersRepository} from '../repositories/users-repository'
import {UserAccountDBType, UserAccountType} from '../repositories/types'
import {ObjectId} from 'mongodb'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {settings} from '../settings'
import {usersService} from './users-services'


export const authService = {
    // async createUser(login: string, email: string, password: string): Promise<UserAccountType> {
    //     const passwordHash = await this._generateHash(password)
    //     const newProduct: UserAccountType = {
    //         _id: new ObjectId(),
    //         accountData: {
    //             userName: login,
    //             email,
    //             passwordHash,
    //             createdAt: new Date()
    //         },
    //         loginAttempts: [],
    //         emailConfirmation: {
    //             sentEmails: [],
    //             confirmationCode: "", //todo: generate code
    //             expirationDate: new Date(), //todo: get now + 1 day,
    //             isConfirmed: false
    //         }
    //     }
    //     return usersRepository.createUser(newProduct)
    // },
    // async checkCredentials(loginOrEmail: string, password: string) {
    //     const user = await usersRepository.findByLoginOrEmail(loginOrEmail)
    //     if (!user) return null
    //
    //     if (!user.emailConfirmation.isConfirmed) {return
    //         return null
    //     }
    //
    //     const passwordHash = await this._generateHash(password)
    //     const isHashesEquals = await this._isHashesEquals(passwordHash, user.accountData.passwordHash)
    //     if (isHashesEquals) {
    //         return user
    //     } else {
    //         return null
    //     }
    // },
    async _generateHash(password: string) {
        const hash = await bcrypt.hash(password, 10)
        console.log('hash: ' + hash)
        return hash
    },
    async _isHashesEquals(hash1: string, hash2: string) {
        const isEqual = await bcrypt.compare(hash1, hash2)
        return isEqual
    },
    // async checkAndFindUserByToken(token: string) {
    //     try {
    //         const result: any = jwt.verify(token, settings.JWT_SECRET)
    //         const user = await usersService.findUserById(new ObjectId(result.userId))
    //         return user
    //     } catch (error) {
    //         return null
    //     }
    // },
    confirmEmail(code: string, email: string): boolean {
        return true
    }
}
