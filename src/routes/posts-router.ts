import {Request, Response, Router} from "express";
import {Post,postsRepository} from "../repositories/posts-repository";
import {body, validationResult} from "express-validator";
import {Blog} from "../repositories/blogs-repository";
import {postValidationMiddleware } from "../MiddleWares/InputValidationMiddleWare"
import {inputValidationMiddleware } from "../MiddleWares/InputValidationMiddleWare"
import {blogsRepository} from "../repositories/blogs-repository";

export const postsRouter = Router({});
export const basicAuth = require('express-basic-auth')
export const adminAuth = basicAuth({users: { 'admin': 'qwerty' }});


//Get All Posts By no auth
postsRouter.get('/', (req: Request, res: Response) => {
    const foundPosts = postsRepository.findPosts(req.query.title
        ? req.query.toString()
        : null);
    res.status(200).send(foundPosts)
})
//Get Post By ID no Auth
postsRouter.get('/:id', (req: Request, res: Response) => {
    let post = postsRepository.getPostById(req.params.id)
    if (post) {
        res.status(200).send(post)
        return
    } else {
        res.status(404)
        return
    }
})
//Create Post  + Auth
postsRouter.post('/', adminAuth,inputValidationMiddleware, postValidationMiddleware, (req: Request, res: Response) => {
    console.log(req.body)
    const blog = blogsRepository.getBlogsById(req.body.blogId)
    if(!blog) {
        res.sendStatus(404)

        return
    }
    const newPost = postsRepository.createPost(req.body);
    res.status(201).send(newPost)
    return
})

//Update Post By ID + Auth
postsRouter.put('/:id', adminAuth,inputValidationMiddleware, postValidationMiddleware, (req: Request, res: Response) => {
    const isUpdated = postsRepository.updatePost(req.params.id, req.body)
    if (isUpdated) {
        const post = postsRepository.getPostById(req.params.id)
        res.sendStatus(204).send(post)
    } else {
        res.sendStatus(404)
    }
})
//Delete Post By ID + Auth
postsRouter.delete('/:id',adminAuth, (req: Request, res: Response) => {
    const isDeleted = postsRepository.deletePost(req.params.id)
    if (isDeleted) {
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
})
