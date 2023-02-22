"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const blogs_router_1 = require("./routes/blogs-router");
const posts_router_1 = require("./routes/posts-router");
const posts_repository_1 = require("./repositories/posts-repository");
const blogs_repository_1 = require("./repositories/blogs-repository");
const app = (0, express_1.default)();
const port = 3000;
const parserMiddleware = (0, body_parser_1.default)({});
app.use(parserMiddleware);
app.use('/blogs', blogs_router_1.blogsRouter);
app.use('/posts', posts_router_1.postsRouter);
//app.use
//export const titleValidation = body('title').trim().isLength({min: 3, max: 10}).withMessage('ERORRR TITLE 3-10 MAX');
/*const authMiddleWare = (req:Request, res: Response, next: NextFunction ) => {
    if (req.query.token === "qwerty") {
        next();
    } else {
        res.send(401)
    }
}*/
//#1 Delete All Data OK+
app.delete('/testing/all-data', (req, res) => {
    blogs_repository_1.blogs.splice(0, blogs_repository_1.blogs.length);
    posts_repository_1.posts.splice(0, posts_repository_1.posts.length);
    res.send(204);
});
app.get('/', (req, res) => {
    res.send('Blog Platform 22Feb2023/2056');
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
