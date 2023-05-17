"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAuth = exports.basicAuth = void 0;
//import {jwtService} from "../application/jwt-service";
exports.basicAuth = require('express-basic-auth');
exports.adminAuth = (0, exports.basicAuth)({ users: { 'admin': 'qwerty' } });
// export const authMiddlewares = async (req: Request, res: Response, next: NextFunction) => {
//
//     if (!req.headers.authorization) {
//         res.sendStatus(401)
//     } else {
//         const token : string = req.headers.authorization.split(" ")[1]
//         const user = await jwtService.getUserIdByToken(token)
//         if (user) {
//             next()
//         } else {
//             res.sendStatus(401);
//         }
//     }
// }
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
