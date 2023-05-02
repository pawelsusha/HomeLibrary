import {usersRouter} from "../routes/users-router";
import {MongoClient, ObjectId} from "mongodb";

@injectable()
export class UsersRepository implements IUsersRepository{
    constructor(private usersCollection: MongoClient.Collection<UserType>){

    }
}
    async getOneUserForJWT(login:string): Promise<UserType | null> {
    return await this.userCollection.findOne({login})
}
    async getOneUserById(id: string): Promise<UserWithoutPasswordType | null> {
    return await this.userCollection.findOne({id})
}
    async getAllUsers(): Promise<UserDBType[]>{
    return userCollection
        .find()
        .sort.('createdAt', -1)
        .toArray()
},
    async createUser(user: UserDBType): Promise<UserDBType> {
    const result = await userCollection.insertOne({_id:id})
    if (product) {
        return product
    } else {
        return null
    }
},
    async findByLoginOrEmail(loginOrEmail: string){
    const user = await userCollection.findOne({$or: [{emeil: loginOrEmail}, {userName: loginOrEmail}]})
    return user
    }
    async updateConfirmation(_id:ObjectId){
    let result = await userCollection.updateOne({_id}),{$set:{"emailConfirmation.isConfirmed":true}}
    return result.modifiedCount === 1
}
export const repositoryDB = {}


//LAsar
export function userTypeMapping(user: any): UserViewModel {
    return {
        id: user._id.toString(),
        login: user.login,
        email: user.email,
        createdAt: user.createdAt
    }
}

export const usersRepository = {
    async createUser(newUser: UserCreateModel): Promise<UserViewModel> {
        const createResult = await usersCollection.insertOne(newUser)
        return {
            id: createResult.insertedId.toString(),
            login: newUser.login,
            email: newUser.email,
            createdAt: newUser.createdAt,
        }
    },
    async deleteUserById(id: string): Promise<boolean> {
        const deleteResult = await usersCollection.deleteOne({_id: new ObjectId(id)})
        return deleteResult.deletedCount === 1
    },
    async findUserByLoginOrEmail(loginOrEmail: string): Promise<WithId<UserDBModel> | null> {
        const user = await usersCollection.findOne({$or: [{email: loginOrEmail}, {login: loginOrEmail}]})
        return user
    },
    async findUserById(userId: string): Promise<UserViewModel | null> {
        const foundUser = await usersCollection.findOne({_id: new ObjectId(userId)})
        if (foundUser) return userTypeMapping(foundUser)
        return null
    },
    async deleteAllUsers(): Promise<void> {
        await usersCollection.deleteMany()
    }
}
export const usersQueryRepository = {
    // test
    async foundUsers(queryParameters: QueryUsersInputModel): Promise<PaginatorUserViewModel> {
        const {sortBy, sortDirection, pageNumber, pageSize, searchLoginTerm, searchEmailTerm} = queryParameters
        const dbSortBy = sortBy || 'createdAt'
        const dbSortDirection = sortDirection ? sortDirection === 'desc' ? -1 : 1 : -1
        const dbPageNumber = pageNumber ? +pageNumber : 1
        const dbPageSize = pageSize ? +pageSize : 10
        const dbUsersToSkip = (dbPageNumber - 1) * dbPageSize
        const dbSearchLoginTerm = searchLoginTerm || null
        const dbSearchEmailTerm = searchEmailTerm || null
        const dbLoginSearchRegex = new RegExp(`${dbSearchLoginTerm}`, 'i')
        const dbEmailSearchRegex = new RegExp(`${dbSearchEmailTerm}`, 'i')
        // TODO Пустой массив на уроке надо было пофиксить
        let dbSearchFilter = {}
        if (dbSearchLoginTerm) {
            if (dbSearchEmailTerm) {
                dbSearchFilter = {$or: [{login: {$regex: dbLoginSearchRegex}}, {email: {$regex: dbEmailSearchRegex}}]}
            } else {
                dbSearchFilter = {login: {$regex: dbLoginSearchRegex}}
            }
        } else {
            if (dbSearchEmailTerm) {
                dbSearchFilter = {email: {$regex: dbEmailSearchRegex}}
            } else {
                dbSearchFilter = {}
            }
        }
        /*const dbSearchFilter = []
        if(dbSearchLoginTerm) {
            dbSearchFilter.push({login: {$regex: dbLoginSearchRegex}})
        }
        if(dbSearchEmailTerm) {
            dbSearchFilter.push({email: {$regex: dbEmailSearchRegex}})
        }*/
        const foundUsers = await usersCollection.find(dbSearchFilter)
            .sort({[dbSortBy]: dbSortDirection})
            .skip(dbUsersToSkip)
            .limit(dbPageSize)
            .toArray()
        const totalCountOfUsers = await usersCollection.countDocuments(dbSearchFilter)
        const pagesCount = Math.ceil(totalCountOfUsers / dbPageSize)
        const formatFoundUsers = foundUsers.map(userTypeMapping)
        return {
            pagesCount: pagesCount,
            page: dbPageNumber,
            pageSize: dbPageSize,
            totalCount: totalCountOfUsers,
            items: formatFoundUsers,
        }
    }
}

zzz