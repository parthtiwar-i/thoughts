"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogInputs = exports.createBlogInputs = exports.signInInput = exports.signUpInput = void 0;
const zod_1 = __importDefault(require("zod"));
//zod schema
//Sign Up
exports.signUpInput = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(6),
    name: zod_1.default.string(),
});
//SignIn
exports.signInInput = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string(),
});
//Create Blog inputs
exports.createBlogInputs = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string(),
});
//Update Blog input
exports.updateBlogInputs = zod_1.default.object({
    title: zod_1.default.string().optional(),
    content: zod_1.default.string().optional(),
});
