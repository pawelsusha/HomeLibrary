import {request, response,Router} from "express";



export const usersRouter = Router({})


usersRouter.post('/',
    async (req:Request, res: Response) => {
    const newProduct = await usersService.createUser(req.body.login, req.body.email, req.body.password)
        res.status(201).send(newProduct)
    })