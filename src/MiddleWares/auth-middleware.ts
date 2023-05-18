import {NextFunction, Request, Response} from "express";
import {usersService} from "../domain/users-services";
import {jwtService} from "../application/jwt-service";

export const basicAuth = require('express-basic-auth')
export const adminAuth = basicAuth({users: { 'admin': 'qwerty' }});

export const authMiddlewares = async (req: Request, res: Response, next: NextFunction) => {

    if (!req.headers.authorization) {
        res.sendStatus(401)
    } else {
        const token : string = req.headers.authorization.split(" ")[1]
        const user = await jwtService.getUserIdByToken(token)
        if (user) {
            next()
        } else {
            res.sendStatus(401);
        }
    }
}
// export const checkForUser = async (req: Request, res: Response, next: NextFunction) => {
//     const token : string = req.headers.authorization!.split(" ")[1]
//     const userId = await jwtService.getUserByIdToken(token)
//     //const comment = await commentsService.getCommentByIdWithUser(req.params.id, userId)
//     if (!comment) {
//         res.sendStatus(404)
//     }
//     else if (comment.commentatorInfo.userId === userId) {
//         next()
//     } else {
//         res.sendStatus(403)
//     }
//}