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
exports.blogValidationMiddleware = exports.postValidationMiddleware = exports.blogIdCheck = exports.contentCheck = exports.shortDescriptionCheck = exports.titleCheck = exports.websiteUrlCheck = exports.descriptionCheck = exports.nameCheck = exports.inputValidationMiddleware = exports.findByIdBlogs = void 0;
const blogs_db_repository_1 = require("../repositories/blogs-db-repository");
const express_validator_1 = require("express-validator");
const findByIdBlogs = (value) => __awaiter(void 0, void 0, void 0, function* () {
    let blog = yield blogs_db_repository_1.blogsRepository.getBlogsById(value);
    if (!blog) {
        throw new Error('Invalid blogId');
    }
    return true;
});
exports.findByIdBlogs = findByIdBlogs;
const inputValidationMiddleware = (req, res, next) => {
    const error = (0, express_validator_1.validationResult)(req);
    if (error.isEmpty()) {
        next();
    }
    else {
        res.status(400).send({
            errorsMessages: error.array({ onlyFirstError: true }).map(e => {
                return {
                    message: e.msg,
                    field: e.param
                };
            })
        });
    }
};
exports.inputValidationMiddleware = inputValidationMiddleware;
exports.nameCheck = (0, express_validator_1.body)("name").trim().isLength({ min: 1, max: 15 }).isString();
exports.descriptionCheck = (0, express_validator_1.body)("description").trim().isLength({ min: 1, max: 500 }).isString();
exports.websiteUrlCheck = (0, express_validator_1.body)("websiteUrl").trim().isLength({ min: 1, max: 100 }).matches(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/).isString();
exports.titleCheck = (0, express_validator_1.body)("title").trim().isLength({ min: 1, max: 30 }).isString();
exports.shortDescriptionCheck = (0, express_validator_1.body)("shortDescription").trim().isLength({ min: 1, max: 100 }).isString();
exports.contentCheck = (0, express_validator_1.body)("content").trim().isLength({ min: 1, max: 1000 }).isString();
exports.blogIdCheck = (0, express_validator_1.body)("blogId").trim().custom(exports.findByIdBlogs).isString();
exports.postValidationMiddleware = [
    (0, express_validator_1.body)("title").trim().isLength({ min: 1, max: 30 }).isString(),
    (0, express_validator_1.body)("shortDescription").trim().isLength({ min: 1, max: 100 }).isString(),
    (0, express_validator_1.body)("content").trim().isLength({ min: 1, max: 1000 }).isString(),
    //body("blogId").isString().trim().notEmpty().custom(findByIdBlogs),
    (0, express_validator_1.body)('blogId').trim().custom(exports.findByIdBlogs).isString()
];
exports.blogValidationMiddleware = [
    (0, express_validator_1.body)("name").trim().isLength({ min: 1, max: 15 }).isString(),
    (0, express_validator_1.body)("description").trim().isLength({ min: 1, max: 500 }).isString(),
    (0, express_validator_1.body)("websiteUrl").trim().isLength({ min: 1, max: 100 }).matches(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/).isString(),
];
