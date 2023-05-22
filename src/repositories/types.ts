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
    passwordSalt: string
    createdAt: string
}
export type UserAccountType2 = {
    id?: string
    login: string
    email: string
    createdAt: string
}
export type SentConfirmationEmailType = {
    sentDate: Date
}

export type LoginAttemptType = {
    attemptDate: Date
    ip: string
}
export type AdminDBType = WithId<{
    email: string
    name: string
    passwordHash: string
    createdAt: Date
}>

export type FeedbackDBType = WithId<{
    adminId: ObjectId
    adminName: string
    comment: string
    createdAt: Date
}>