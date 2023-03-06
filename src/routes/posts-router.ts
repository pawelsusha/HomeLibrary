import {Request, Response, Router} from "express";
import {Post,postsRepository} from "../repositories/posts-repository";
import {body, validationResult} from "express-validator";
import {Blog} from "../repositories/blogs-repository";
import {postValidationMiddleware } from "../MiddleWares/InputValidationMiddleWare"
import {inputValidationMiddleware } from "../MiddleWares/InputValidationMiddleWare"
import {blogsRepository} from "../repositories/blogs-repository";
import {blogsRouter} from "./blogs-router";

export const postsRouter = Router({});
export const basicAuth = require('express-basic-auth')
export const adminAuth = basicAuth({users: { 'admin': 'qwerty' }});


//Get All Posts By no auth
/*postsRouter.get('/', (req: Request, res: Response) => {
    const foundPosts = postsRepository.findPosts(req.query.title
        ? req.query.toString()
        : null);
    res.status(200).send(foundPosts)
})*/
//Get All Posts By no auth
postsRouter.get('/',
    async (req: Request, res: Response) =>{
    const allPosts = await postsRepository.returnAllPosts();
    res.status(200).send(allPosts);
    return
})

//Get Post By ID no Auth
postsRouter.get('/:id',
    async (req: Request, res: Response) => {
    let post = await postsRepository.getPostById(req.params.id)
    if (post) {
        res.status(200).send(post)
        return
    } else {
        res.sendStatus(404)
        return
    }
})
//Create Post  + Auth
postsRouter.post('/', adminAuth, postValidationMiddleware, inputValidationMiddleware, async(req: Request, res: Response) => {
    console.log(req.body)
    const blog = blogsRepository.getBlogsById(req.body.blogId)
    if(!blog) {
        res.sendStatus(404)
        return
    }
    const newPost = await postsRepository.createPost(req.body, blog.id, blog.name);
    res.status(201).send(newPost)
    return
})

//Update Post By ID + Auth
postsRouter.put('/:id', adminAuth,postValidationMiddleware,inputValidationMiddleware, async(req: Request, res: Response) => {
    const isUpdated = await postsRepository.updatePost(req.params.id, req.body)
    if (isUpdated) {
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }
})
//Delete Post By ID + Auth
postsRouter.delete('/:id',adminAuth, async(req: Request, res: Response) => {
    const isDeleted = await postsRepository.deletePost(req.params.id)
    if (isDeleted) {
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
})
