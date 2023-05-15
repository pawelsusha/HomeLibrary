import {UserAccountType} from '../repositories/types'

declare global {
    declare namespace Express {
        export interface Request {
            user: UserAccountType | null
        }
    }
}