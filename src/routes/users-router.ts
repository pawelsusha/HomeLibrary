import {Request, Response, Router} from 'express'
import {usersService} from '../domain/users-services'
import {blogsServices} from "../domain/blogs-services";

export const usersRouter = Router({})

usersRouter.post('/', async (req: Request, res: Response) => {
    console.log(req.body)
    const newUser = await usersService.createUser(req.body.login, req.body.email, req.body.password)
   //const newUser = await usersService.createUser(req.body)
    res.status(201).send(newUser)
    console.log(newUser)
})

usersRouter.get('/', async (req: Request, res: Response) => {
    console.log(req.body)
    const users = await usersService.getAllUsers()
    res.send(users)
})
usersRouter.get('/:id', async (req: Request, res: Response) => {
    const user = await usersService.findUserById(req.params.id)
    res.send(user)
})
    // let user = await usersService.findUserById(req.params.id)
    // if (user) {
    //     res.status(200).send(user);
    //     return
    // } else {
    //     res.sendStatus(404)
    //     return
    // }
