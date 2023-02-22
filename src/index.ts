import express, {NextFunction, query, Request, Response} from 'express';
import bodyParser from 'body-parser'
import {blogsRouter} from "./routes/blogs-router";
import {postsRouter} from "./routes/posts-router";
import {posts, postsRepository} from "./repositories/posts-repository";
import {blogs, blogsRepository} from "./repositories/blogs-repository";
import {body} from "express-validator";
import {adminAuth} from "./MiddleWares/auth-middleware";

const app = express()
const port = 3000
const parserMiddleware = bodyParser({});
app.use(parserMiddleware)


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
app.delete('/testing/all-data', (req:Request, res: Response ) => {
    blogs.splice(0,blogs.length);
    posts.splice(0,posts.length);
    res.send(204);
})

app.get('/', (req, res) => {
    res.send('Blog Platform 22Feb2023/1245')
})
app.use('/blogs', blogsRouter)
app.use('/posts', postsRouter)




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

export { NextFunction };

