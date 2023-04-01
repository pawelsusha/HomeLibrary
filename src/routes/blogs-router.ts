import {Request, Response, Router} from "express";
import {Blog, blogsServices} from "../domain/blogs-services";
import {adminAuth, } from "../MiddleWares/auth-middleware";
import {
    inputValidationMiddleware,
    blogValidationMiddleware,
    postValidationMiddleware,
    titleCheck, shortDescriptionCheck, contentCheck
} from "../MiddleWares/InputValidationMiddleWare"
import {Post, postsService} from "../domain/posts-services";
import {SortDirection} from "mongodb";
import {paginationHelpers} from "../helpers/pagination-helpers";


export const blogsRouter = Router({})
//GET - return all
/*blogsRouter.get('/',  async (req: Request, res: Response) =>{
    let allBlogs = await blogsServices.returnAllBlogs();
    res.status(200).send(allBlogs);
    return
})*/
blogsRouter.get('/', async (req: Request, res: Response) =>{
    let pageSize : number = paginationHelpers.pageSize(<string>req.query.pageSize)
    let pageNumber : number = paginationHelpers.pageNumber(<string>req.query.pageNumber)
    let sortBy : string = paginationHelpers.sortBy(<string>req.query.sortBy)
    let sortDirection : SortDirection = paginationHelpers.sortDirection(<string>req.query.sortDirection)
    let searchNameTerm : string = paginationHelpers.searchNameTerm(<string>req.query.searchNameTerm)
    let allBlogs = await blogsServices.returnAllBlogs(pageSize, pageNumber, sortBy, sortDirection, searchNameTerm);
    res.status(200).send(allBlogs);
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
/*    const id = req.params.id
    const isUpdated = await blogsServices.updateBlog(id, req.body)
    if (isUpdated){
        const blog = await blogsServices.updateBlog(id, req.body)
        //res.send(blog) correct
        res.status(204).send(blog);
    }else
        res.send(404)*/
    const status : boolean = await blogsServices.updateBlogById(req.body, req.params.id)
    if (status){
        res.sendStatus(204)
    } else {
        res.send(404)
    }

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
blogsRouter.post('/:id/posts', adminAuth,titleCheck,shortDescriptionCheck,contentCheck,inputValidationMiddleware, async (req: Request, res: Response) => {
    const blog : Blog | null = await blogsServices.getBlogsById(req.params.id);
    if (!blog) {
        res.sendStatus(404)
    } else {
        const blogId = blog.id;
        const blogName = blog.name;
        const newPost : Post | null = await postsService.createPost(req.body, blogName, blogId);
        res.status(201).send(newPost)
        return
    }
});
//NEW - GET - get all posts in blog
blogsRouter.get('/:id/posts', async (req: Request, res: Response) => {
    const blogId = req.params.id;
    const blog: Blog | null = await blogsServices.getBlogsById(blogId);
    if (!blog) {
        res.sendStatus(404)
        return
    }
    let pageSize : number = paginationHelpers.pageSize(<string>req.query.pageSize);
    let pageNumber : number = paginationHelpers.pageNumber(<string>req.query.pageNumber);
    let sortBy : string = paginationHelpers.sortBy(<string>req.query.sortBy);
    let sortDirection : SortDirection = paginationHelpers.sortDirection(<string>req.query.sortDirection);
    let allPosts = await postsService.returnAllPostByBlogId(pageSize, pageNumber, sortBy, sortDirection, blogId);
    if (allPosts.items) {
        res.status(200).send(allPosts)
    }
});
