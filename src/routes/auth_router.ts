import {request, response, Router} from 'express'
import {usersService} from "../domain/users-services";

export const authRouter = Router({})

authRouter.post('/login',
    async (req:Request, res:Response) => {
        const result = await usersService.checkCredentials(req.body.loginOrEmail, req.body.password)
        res.status(200)
    })