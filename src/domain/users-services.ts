import {usersAccountsCollection, usersRepository} from '../repositories/users-repository'
import {UserAccountDBType, UserAccountType} from '../repositories/types'
import {ObjectId} from 'mongodb'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {settings} from '../settings'



export const usersService = {
    //usersAccountsCollection: undefined,
    async getAllUsers(): Promise<UserAccountType[]> {
        return usersRepository.getAllUsers()
    },
    async findUserById(id: ObjectId): Promise<UserAccountType | null> {
        return usersRepository.findUserById(id)
    },

    //CREATE NEW USER
     async createUser(user : UserAccountType, isConfirmed : boolean = true, confirmationCode : null | string = null) : Promise<UserAccountType | null>{
     //const hash = bcrypt.hashSync(user.passwordHash, 10, )
        const newUser =  {
           id: (+new Date()).toString(),
            login: user.login,
            email: user.email,
            password : user.password,
            createdAt: new Date().toISOString(),
            //isConfirmed: isConfirmed,
            //confirmedCode : confirmationCode
        }

         const createdUser = await usersRepository.createUser(newUser)
         return createdUser

    }

}
