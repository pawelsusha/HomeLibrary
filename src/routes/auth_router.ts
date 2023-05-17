import {Request, Response, Router} from 'express'
import {authService} from '../domain/auth-service'
//import {jwtService} from '../application/jwt-service'
import {usersService} from "../domain/users-services";

export const authRouter = Router({})

// authRouter.post('/registration',
//     async (req: Request, res: Response) => {
//         const user = await authService.createUser(req.body.login, req.body.email, req.body.password)
//         res.status(201).send()
//     })

authRouter.post('/login',
    async (req: Request, res: Response) => {
      //  const user = await authService.checkCredentials(req.body.loginOrEmail, req.body.password)
        const checkResult = await usersService.checkCredentials(req.body.loginOrEmail, req.body.password)
        if (checkResult.resultCode === 0) {
           // const token = await jwtService.createJWT(token)
            res.status(201).send(checkResult.data)
        } else {
            res.sendStatus(401)
        }
    })

// authRouter.post('/confirm-email',
//     async (req: Request, res: Response) => {
//         const result = await authService.confirmEmail(req.body.code, req.body.email)
//         if (result) {
//             res.status(201).send()
//         } else {
//             res.sendStatus(400)
//         }
//   })
