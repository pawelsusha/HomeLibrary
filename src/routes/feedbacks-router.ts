import {Router} from 'express'
import {feedbacksService} from '../domain/feedbacks-services'
import {adminAuthMiddleware} from "../MiddleWares/admin-auth-middleware";

export const feedbacksRouter = Router({})

feedbacksRouter
    .post('/', adminAuthMiddleware,
        async (req, res) => {
            const newProduct = await feedbacksService.sendFeedback(req.body.comment, req.body.admin!._id)
            res.status(201).send(newProduct)
        })
    .get('/', async (req, res) => {
        const users = await feedbacksService
            .allFeedbacks()
        res.send(users)
    })