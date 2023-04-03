import bcrypt from 'bcrypt'
import {ObjectId} from "mongodb"




export const usersServices = {
    async createUser(login: string, email:string, password:string): Promise<UserDbType>{

        const passwordSalt = await bcrypt.genSalt(10)
        const passwordHash = this.generateHash(password, passwordSalt)

        const newUser:UserDBType = {
            _id:new ObjectId(),
            userName: login,
            email,
            passwordHash,
            passwordSalt,
            createAt: new Date()
        }
        return userRepository.createUser(newUser)
    },
    async findUserById(id: ObjectId): Promise<UserDBType | null> {
        return usersRepository.findUserById(id)
    },
    async checkCredentials (loginOrEmail: string, password: string) {
        const user = await usersRepository.findByLoginOrEmail(loginOrEmail)
        if(!user) return false
        const passwordHash = await this._generateHash(password, user.passwordSalt)
        if (user.passwordSalt !== passwordHash) {
            return false
        }
        return true
    },
    async _generateHash(password: string, salt:string){
    const hash = await bcrypt.hash(password, salt)
        console.log('hash: ' + hash)
        return hash
    },
}