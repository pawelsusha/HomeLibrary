import {Request, Response, Router} from "express";
import {blogsRepository} from "../repositories/blogs-repository";
import {adminAuth, } from "../MiddleWares/auth-middleware";
import { inputValidationMiddleware, blogValidationMiddleware } from "../MiddleWares/InputValidationMiddleWare"


export const blogsRouter = Router({})
//GET - return all
blogsRouter.get('/',  (req: Request, res: Response) =>{
    let allBlogs = blogsRepository.returnAllBlogs();
    res.status(200).send(allBlogs);
    return
})
/*blogsRouter.get('/', (req:Request, res: Response ) => {
    const foundedBlogs = blogsRepository.findBlogs(req.query.title
        ?req.query.toString()
        : null);
    res.status(200).send(foundedBlogs);
})*/
.get('/:id', (req:Request, res: Response ) => {
    let blog = blogsRepository.getBlogsById(req.params.id)
    if (blog) {
        res.status(200).send(blog);
        return
    } else {
        res.send(404)
        return
    }
})
.delete('/:id', adminAuth,(req:Request, res: Response) => {
    const id = req.params.id;
    const isDeleted = blogsRepository.deleteBlog(id)
    if (isDeleted){
        res.send(204)
    }else
        res.send(404)
})
.post('/',adminAuth,blogValidationMiddleware,inputValidationMiddleware,blogValidationMiddleware,(req:Request, res:Response) => {
    const newBlog = blogsRepository.createBLog(req.body)

    res.status(201).send(newBlog)
})
.put('/',adminAuth,blogValidationMiddleware,inputValidationMiddleware,blogValidationMiddleware,(req:Request, res:Response) => {
    const id = req.params.id
        //    const title = req.body.name
    const isUpdated = blogsRepository.updateBlog(id, req.body)
    if (isUpdated){
        res.send(204)
    }else
        res.send(404)
})

