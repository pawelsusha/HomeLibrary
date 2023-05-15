import express, {NextFunction, Request, Response} from 'express';
import {blogsRouter} from "./routes/blogs-router";
import {postsRouter} from "./routes/posts-router";
import {posts, postsRepository} from "./repositories/posts-db-repository";
import {blogs, blogsRepository} from "./repositories/blogs-db-repository";
import {runDb} from "./db/db";
import {usersRouter} from "./routes/users-router";



export { NextFunction };

export const app = express();
app.use(express.json());

const port = 3000
app.use('/blogs', blogsRouter)
app.use('/posts', postsRouter)
app.use('/users', usersRouter)
//app.use('/auth', authRouter)

/*
app.delete('/testing/all-data', (req:Request, res: Response ) => {
    blogs.splice(0,blogs.length);
    posts.splice(0,posts.length);
    res.send(204);
})*/
app.delete('/testing/all-data', async (req: Request,res: Response) => {
    await postsRepository.deleteAllData();
    await blogsRepository.deleteAllData();
    //await usersRepository.deleteAllData();
    //await securityRepository.deleteAllData();
    res.sendStatus(204)
});
app.get('/', (req, res) => {
    res.send('Blog Platform $5 10May2023/1708')
})
//app.use(basicAuth)

export const startApp = async() =>{
    await runDb()
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}


startApp()


