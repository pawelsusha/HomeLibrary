import {Request, Response, Router} from "express";
import {Post,postsRepository} from "../repositories/posts-db-repository";
import {body, validationResult} from "express-validator";
import {Blog} from "../repositories/blogs-repository";
import {postValidationMiddleware } from "../MiddleWares/InputValidationMiddleWare"
import {inputValidationMiddleware } from "../MiddleWares/InputValidationMiddleWare"
import {blogsRepository} from "../repositories/blogs-db-repository";
import {blogsRouter} from "./blogs-router";
import {postsService} from "../domain/posts-services";
import {SortDirection} from "mongodb";
import {paginationHelpers} from "../helpers/pagination-helpers";
//import {blogsServices} from "../domain/blogs-services";


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
postsRouter.get('/', async (req: Request, res: Response) =>{
let pageSize : number = paginationHelpers.pageSize(<string>req.query.pageSize);
let pageNumber : number = paginationHelpers.pageNumber(<string>req.query.pageNumber);
let sortBy : string = paginationHelpers.sortBy(<string>req.query.sortBy);
let sortDirection : SortDirection = paginationHelpers.sortDirection(<string>req.query.sortDirection);
let allPosts = await postsService.returnAllPost(pageSize, pageNumber, sortBy, sortDirection);
res.status(200).send(allPosts)
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
    const blog : Blog | undefined | null = await blogsRepository.getBlogsById(req.body.blogId)
    if(!blog) {
        res.sendStatus(404)
        return
    }
    const newPost = await postsService.createPost(req.body, blog.id, blog.name);
    res.status(201).send(newPost)
    return
})

//Update Post By ID + Auth
postsRouter.put('/:id', adminAuth,postValidationMiddleware,inputValidationMiddleware, async(req: Request, res: Response) => {
    const isUpdated = await postsRepository.updatePost(req.body, req.params.id)
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
