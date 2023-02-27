"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRouter = void 0;
const express_1 = require("express");
const blogs_repository_1 = require("../repositories/blogs-repository");
const auth_middleware_1 = require("../MiddleWares/auth-middleware");
const InputValidationMiddleWare_1 = require("../MiddleWares/InputValidationMiddleWare");
exports.blogsRouter = (0, express_1.Router)({});
//GET - return all
exports.blogsRouter.get('/', (req, res) => {
    let allBlogs = blogs_repository_1.blogsRepository.returnAllBlogs();
    res.status(200).send(allBlogs);
    return;
})
    /*blogsRouter.get('/', (req:Request, res: Response ) => {
        const foundedBlogs = blogsRepository.findBlogs(req.query.title
            ?req.query.toString()
            : null);
        res.status(200).send(foundedBlogs);
    })*/
    .get('/:id', (req, res) => {
    let blog = blogs_repository_1.blogsRepository.getBlogsById(req.params.id);
    if (blog) {
        res.status(200).send(blog);
        return;
    }
    else {
        res.sendStatus(404);
        return;
    }
})
    .delete('/:id', auth_middleware_1.adminAuth, (req, res) => {
    const id = req.params.id;
    const isDeleted = blogs_repository_1.blogsRepository.deleteBlog(id);
    if (isDeleted) {
        res.sendStatus(204);
    }
    else
        res.sendStatus(404);
})
    .post('/', auth_middleware_1.adminAuth, InputValidationMiddleWare_1.blogValidationMiddleware, InputValidationMiddleWare_1.inputValidationMiddleware, (req, res) => {
    const newBlog = blogs_repository_1.blogsRepository.createBLog(req.body);
    res.status(201).send(newBlog);
})
    .put('/:id', auth_middleware_1.adminAuth, InputValidationMiddleWare_1.blogValidationMiddleware, InputValidationMiddleWare_1.inputValidationMiddleware, (req, res) => {
    const id = req.params.id;
    const isUpdated = blogs_repository_1.blogsRepository.updateBlog(id, req.body);
    if (isUpdated) {
        res.sendStatus(204);
    }
    else
        res.send(404);
});
