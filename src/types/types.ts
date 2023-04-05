import {WithId} from "mongodb";

export type Blog = {
    id: string,
    name: string,
    description: string,
    websiteUrl: string
    createdAt : string
    isMembership : boolean
}
export type Post = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: string
}
export type Paginator = {
    pagesCount: number,
    page: number,
    pageSize: number,
    totalCount: number,
    items : Blog[] | Post[]
}
export type UserAccountDBType = WithId<{
    accountData: UserAccountDBType,
    loginAttempts: loginAttemptsType[],
    emeailConfirmation: EmailConfirmationType
}>
export type EmailConfirmationType = {
    IsConfirmed: boolean,
    confirmationCode: Date,
    sentEmails: SentConfirmationEmailType[]
}
export type UserAccountType = {
    email:string,
    userName:string,
    passwordHash:string,
    createdAt: Date
}
export type SentConfirmationEmailType = {
    sentDate:Date
}
export type LoginAttemptType = {
    attemptDate:Date
    ip:string
}