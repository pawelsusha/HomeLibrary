import {ObjectId, WithId} from 'mongodb'

export type UserAccountDBType = WithId<{
    accountData: UserAccountType,
    loginAttempts: LoginAttemptType[],
    emailConfirmation: EmailConfirmationType
}>

export type EmailConfirmationType = {
    isConfirmed: boolean
    confirmationCode: string
    expirationDate: Date
    sentEmails: SentConfirmationEmailType[]
}

export type UserAccountType = {
    id?: string
    login: string
    email: string
    passwordHash: string
    createdAt: string
}
// export type UserAccountType = {
//     email: string
//     userName: string
//     passwordHash: string
//     createdAt: Date
// }
export type SentConfirmationEmailType = {
    sentDate: Date
}

export type LoginAttemptType = {
    attemptDate: Date
    ip: string
}