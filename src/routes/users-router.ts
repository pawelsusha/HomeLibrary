import {Request, Response, Router} from 'express'
import {usersService} from '../domain/users-services'

export const usersRouter = Router({})

usersRouter.post('/', async (req: Request, res: Response) => {
    console.log(req.body)
    const newUser = await usersService.createUser(req.body.login, req.body.email, req.body.password)
    res.status(201).send(newUser)
})

usersRouter.get('/', async (req: Request, res: Response) => {
    console.log(req.body)
    const users = await usersService
        .getAllUsers()
    res.send(users)
})