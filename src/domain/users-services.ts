import {usersAccountsCollection, usersRepository} from '../repositories/users-repository'
import {UserAccountDBType, UserAccountType} from '../repositories/types'
import {ObjectId} from 'mongodb'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {settings} from '../settings'
import {UserViewModel} from "../models/UsersModels/UserViewModel";
import {UserCreateModel} from "../models/UsersModels/UserCreateModel";
import {UserInputModel} from "../models/UsersModels/UserInputModel";


export const usersService = {
    //usersAccountsCollection: undefined,
    async getAllUsers(): Promise<UserAccountType[]> {
        return usersRepository.getAll()
    },

    async findUserById(id: string): Promise<UserAccountType | null> {
        return usersRepository.findUserById(id)


    },

    //CREATE NEW USER
     //async createUser(dataToCreateUser : UserInputModel) : Promise<UserViewModel | null>{
     //async createUser(user : UserAccountType, isConfirmed : boolean = true, confirmationCode : null | string = null) : Promise<UserAccountType | null>{
     async createUser(login: string, email:string, password: string) : Promise<UserAccountType | null>{

     const passwordHash = bcrypt.hashSync(password, 10, )

         const newUser: UserAccountType = {
          // id: (+new Date()).toString(),
            login: login,
            email: email,
            passwordHash : password,
            createdAt: new Date().toISOString(),
           // isConfirmed: isConfirmed,
           // confirmedCode : confirmationCode
           }
          const createdUser = await usersRepository.createUser(newUser)
          return createdUser

    },
    // async createUser(dataToCreateUser: UserInputModel): Promise<UserViewModel> {
    //     const {login, password, email} = dataToCreateUser
    //     const passwordSalt = await bcrypt.genSalt(10)
    //    // const passwordHashed = await this._generateHash(password, passwordSalt)
    //         //const passwordHashed = password
    //
    //     const newUser: UserCreateModel = {
    //         login: login,
    //         email: email,
    //         passwordHash: passwordHashed,
    //         createdAt: new Date().toISOString()
    //     }
    //     return usersRepository.createUser(newUser)
    // },


    async checkCredentials(loginOrEmail: string, password: string) {
        const user = await usersRepository.findByLoginOrEmail(loginOrEmail)
        if (!user) return false;
        const passwordHash = bcrypt.hashSync(password, 10, )
        return user.passwordHash === passwordHash
        }
}
