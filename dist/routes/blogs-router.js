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
const blogs_db_repository_1 = require("../repositories/blogs-db-repository");
const auth_middleware_1 = require("../MiddleWares/auth-middleware");
const InputValidationMiddleWare_1 = require("../MiddleWares/InputValidationMiddleWare");
exports.blogsRouter = (0, express_1.Router)({});
//GET - return all
exports.blogsRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let allBlogs = yield blogs_db_repository_1.blogsRepository.returnAllBlogs();
    res.status(200).send(allBlogs);
    return;
}))
    .get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let blog = yield blogs_db_repository_1.blogsRepository.getBlogsById(req.params.id);
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
    const newBlog = yield blogs_db_repository_1.blogsRepository.createBLog(req.body);
    res.status(201).send(newBlog);
}))
    .put('/:id', auth_middleware_1.adminAuth, InputValidationMiddleWare_1.blogValidationMiddleware, InputValidationMiddleWare_1.inputValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const isUpdated = yield blogs_db_repository_1.blogsRepository.updateBlog(id, req.body);
    if (isUpdated) {
        const blog = yield blogs_db_repository_1.blogsRepository.updateBlog(id, req.body);
        //res.send(blog) correct
        res.send(blog);
    }
    else
        res.send(404);
}))
    .delete('/:id', auth_middleware_1.adminAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const isDeleted = yield blogs_db_repository_1.blogsRepository.deleteBlog(id);
    if (isDeleted) {
        res.sendStatus(204);
    }
    else
        res.sendStatus(404);
}));
