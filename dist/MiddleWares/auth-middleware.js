"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddlewares = exports.adminAuth = exports.basicAuth = void 0;
const jwt_service_1 = require("../application/jwt-service");
exports.basicAuth = require('express-basic-auth');
exports.adminAuth = (0, exports.basicAuth)({ users: { 'admin': 'qwerty' } });
const authMiddlewares = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.headers.authorization) {
        res.sendStatus(401);
    }
    else {
        const token = req.headers.authorization.split(" ")[1];
        const user = yield jwt_service_1.jwtService.getUserIdByToken(token);
        if (user) {
            next();
        }
        else {
            res.sendStatus(401);
        }
    }
});
exports.authMiddlewares = authMiddlewares;
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
