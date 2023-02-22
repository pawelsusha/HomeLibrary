import { Response, Request, NextFunction  } from "express";
import { blogs, blogsRepository } from "../repositories/blogs-repository";
import { posts, postsRepository } from "../repositories/posts-repository";
import {body, CustomValidator, validationResult} from 'express-validator';
import {Blog} from "../types/types";


export  const findByIdBlogs : CustomValidator = value => {
    let blog = blogsRepository.getBlogsById(value)
    if (!blog){
        throw new Error('Invalid blogId')
    }
    return true
};
export const inputValidationMiddleware  = (req: Request,
                                          res: Response,
                                          next: NextFunction) => {
    const error = validationResult(req)
    if (error.isEmpty()) {
        next()
    }else {
        res.status(400).send({
            errorsMessages: error.array({onlyFirstError: true}).map(e => {
                return {
                    message: e.msg,
                    field: e.param
                }
            })
        })
    }
}
export const blogValidationMiddleware = [
    body('name').trim().isLength({min: 1, max: 15}).isString(),
    body('description').trim().isLength({min: 1, max: 500}).isString(),
    body('websiteUrl').trim().isLength({min: 1, max: 100}).matches(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/).isString(),
];




export const postValidationMiddleware = [
    body('title').trim().isLength({min:1, max: 30}).isString(),
    body('shortDescription').trim().isLength({min:1,max:100}).isString(),
    body('content').trim().isLength({min:1, max: 1000}).isString(),
//    body('blogId').trim().custom(getBlogsById).isString()
];

