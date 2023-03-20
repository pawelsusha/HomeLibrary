import {Request, Response, Router} from "express";
import {blogsService} from "../domain/blogs-service";
import {adminAuth, } from "../MiddleWares/auth-middleware";
import {inputValidationMiddleware, blogValidationMiddleware } from "../MiddleWares/InputValidationMiddleWare"



export const blogsRouter = Router({})
//GET - return all
blogsRouter.get('/',  async (req: Request, res: Response) =>{
    let allBlogs = await blogsService.returnAllBlogs();
    res.status(200).send(allBlogs);
    return
})
.get('/:id', async(req:Request, res: Response ) => {
    let blog = await blogsService.getBlogsById(req.params.id)
    if (blog) {
        res.status(200).send(blog);
        return
    } else {
        res.sendStatus(404)
        return
    }
})
.post('/',adminAuth,blogValidationMiddleware,inputValidationMiddleware, async(req:Request, res:Response) => {
   const newBlog = await blogsService.createBLog(req.body);
   res.status(201).send(newBlog);
})
.put('/:id',adminAuth,blogValidationMiddleware,inputValidationMiddleware,async(req:Request, res:Response) => {
    const id = req.params.id
    const isUpdated = await blogsService.updateBlog(id, req.body)
    if (isUpdated){
        const blog = await blogsService.updateBlog(id, req.body)
        //res.send(blog) correct
        res.status(204).send(blog);
    }else
        res.send(404)
})
    .delete('/:id', adminAuth, async(req:Request, res: Response) => {
        const id = req.params.id;
        const isDeleted = await blogsService.deleteBlog(id)
        if (isDeleted){
            res.sendStatus(204)
        }else
            res.sendStatus(404)
    })
