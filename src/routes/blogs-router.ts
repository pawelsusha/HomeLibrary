import {Request, Response, Router} from "express";
import {Blog, blogsServices} from "../domain/blogs-services";
import {adminAuth, } from "../MiddleWares/auth-middleware";
import {inputValidationMiddleware, blogValidationMiddleware } from "../MiddleWares/InputValidationMiddleWare"
import {Post, postsService} from "../domain/posts-services";




export const blogsRouter = Router({})
//GET - return all
blogsRouter.get('/',  async (req: Request, res: Response) =>{
    let allBlogs = await blogsServices.returnAllBlogs();
    res.status(200).send(allBlogs);
    return
})
.get('/:id', async(req:Request, res: Response ) => {
    let blog = await blogsServices.getBlogsById(req.params.id)
    if (blog) {
        res.status(200).send(blog);
        return
    } else {
        res.sendStatus(404)
        return
    }
})
.post('/',adminAuth,blogValidationMiddleware,inputValidationMiddleware, async(req:Request, res:Response) => {
   const newBlog = await blogsServices.createBLog(req.body);
   res.status(201).send(newBlog);
})
.put('/:id',adminAuth,blogValidationMiddleware,inputValidationMiddleware,async(req:Request, res:Response) => {
    const id = req.params.id
    const isUpdated = await blogsServices.updateBlog(id, req.body)
    if (isUpdated){
        const blog = await blogsServices.updateBlog(id, req.body)
        //res.send(blog) correct
        res.status(204).send(blog);
    }else
        res.send(404)
})
    .delete('/:id', adminAuth, async(req:Request, res: Response) => {
        const id = req.params.id;
        const isDeleted = await blogsServices.deleteBlog(id)
        if (isDeleted){
            res.sendStatus(204)
        }else
            res.sendStatus(404)
    })
//NEW - POST - create post for blog
blogsRouter.post('/:id/posts', adminAuth, inputValidationMiddleware, async (req: Request, res: Response) => {
    const foundBlog : Blog | null = await blogsServices.getBlogsById(req.params.id);
    if (!foundBlog) {
        res.sendStatus(404)
    } else {
        const blogId = foundBlog.id;
        const blogName = foundBlog.name;
        const newPost : Post | null = await postsService.createPost(req.body, blogName, blogId);
        res.status(201).send(newPost)
    }
});
//NEW - GET - get all posts in blog
blogsRouter.get('/:id/posts', async (req: Request, res: Response) => {
    const blogId = req.params.id;
    const foundBlog: Blog | null = await blogsServices.getBlogsById(blogId);
    if (!foundBlog) {
        res.sendStatus(404)
        return
    }
});
