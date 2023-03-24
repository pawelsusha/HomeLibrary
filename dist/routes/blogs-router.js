"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRouter = void 0;
const express_1 = require("express");
const blogs_services_1 = require("../domain/blogs-services");
const auth_middleware_1 = require("../MiddleWares/auth-middleware");
const InputValidationMiddleWare_1 = require("../MiddleWares/InputValidationMiddleWare");
const posts_services_1 = require("../domain/posts-services");
const pagination_helpers_1 = require("../helpers/pagination-helpers");
exports.blogsRouter = (0, express_1.Router)({});
//GET - return all
/*blogsRouter.get('/',  async (req: Request, res: Response) =>{
    let allBlogs = await blogsServices.returnAllBlogs();
    res.status(200).send(allBlogs);
    return
})*/
exports.blogsRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let pageSize = pagination_helpers_1.paginationHelpers.pageSize(req.query.pageSize);
    let pageNumber = pagination_helpers_1.paginationHelpers.pageNumber(req.query.pageNumber);
    let sortBy = pagination_helpers_1.paginationHelpers.sortBy(req.query.sortBy);
    let sortDirection = pagination_helpers_1.paginationHelpers.sortDirection(req.query.sortDirection);
    let searchNameTerm = pagination_helpers_1.paginationHelpers.searchNameTerm(req.query.searchNameTerm);
    let allBlogs = yield blogs_services_1.blogsServices.returnAllBlogs(pageSize, pageNumber, sortBy, sortDirection, searchNameTerm);
    res.status(200).send(allBlogs);
}))
    .get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let blog = yield blogs_services_1.blogsServices.getBlogsById(req.params.id);
    if (blog) {
        res.status(200).send(blog);
        return;
    }
    else {
        res.sendStatus(404);
        return;
    }
}))
    .post('/', auth_middleware_1.adminAuth, InputValidationMiddleWare_1.blogValidationMiddleware, InputValidationMiddleWare_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newBlog = yield blogs_services_1.blogsServices.createBLog(req.body);
    res.status(201).send(newBlog);
}))
    .put('/:id', auth_middleware_1.adminAuth, InputValidationMiddleWare_1.blogValidationMiddleware, InputValidationMiddleWare_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*    const id = req.params.id
        const isUpdated = await blogsServices.updateBlog(id, req.body)
        if (isUpdated){
            const blog = await blogsServices.updateBlog(id, req.body)
            //res.send(blog) correct
            res.status(204).send(blog);
        }else
            res.send(404)*/
    const status = yield blogs_services_1.blogsServices.updateBlogById(req.body, req.params.id);
    if (status) {
        res.sendStatus(204);
    }
    else {
        res.send(404);
    }
}))
    .delete('/:id', auth_middleware_1.adminAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const isDeleted = yield blogs_services_1.blogsServices.deleteBlog(id);
    if (isDeleted) {
        res.sendStatus(204);
    }
    else
        res.sendStatus(404);
}));
//NEW - POST - create post for blog
exports.blogsRouter.post('/:id/posts', auth_middleware_1.adminAuth, InputValidationMiddleWare_1.blogValidationMiddleware, InputValidationMiddleWare_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const foundBlog = yield blogs_services_1.blogsServices.getBlogsById(req.params.id);
    if (!foundBlog) {
        res.sendStatus(404);
    }
    else {
        const blogId = foundBlog.id;
        const blogName = foundBlog.name;
        const newPost = yield posts_services_1.postsService.createPost(req.body, blogName, blogId);
        res.status(201).send(newPost);
    }
}));
//NEW - GET - get all posts in blog
exports.blogsRouter.get('/:id/posts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogId = req.params.id;
    const foundBlog = yield blogs_services_1.blogsServices.getBlogsById(blogId);
    if (!foundBlog) {
        res.sendStatus(404);
        return;
    }
    let pageSize = pagination_helpers_1.paginationHelpers.pageSize(req.query.pageSize);
    let pageNumber = pagination_helpers_1.paginationHelpers.pageNumber(req.query.pageNumber);
    let sortBy = pagination_helpers_1.paginationHelpers.sortBy(req.query.sortBy);
    let sortDirection = pagination_helpers_1.paginationHelpers.sortDirection(req.query.sortDirection);
    let allPosts = yield posts_services_1.postsService.returnAllPostByBlogId(pageSize, pageNumber, sortBy, sortDirection, blogId);
    if (allPosts.items) {
        res.status(200).send(allPosts);
    }
}));
