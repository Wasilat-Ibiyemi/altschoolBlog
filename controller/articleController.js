const express = require('express')
const articleModel = require('../model/article')
const errorCode = require('../errorController/errorCode')


const getAllArticles = async (req, res, next) => {
    try {
        const query = req.query;
        console.log(query);
        const queryObject = {};
        if (query.author) {
            queryObject.author = query.author;
        }
        if (query.title) {
            queryObject.title = query.title;
        }

        if (query.tags) {
            queryObject.tags = query.tags;
        }
        //Pagination
        const page = +req.query.page || 1;
        const limit = +req.query.limit || 20;
        const skip = (page - 1) * limit;
        const articles = await articleModel.find({ ...queryObject, state: 'published' })
            .skip(skip)
            .limit(limit)
            .sort({
                createdAt: query.created_at,
                read_count: query.read_count,
                reading_time: query.reading_time,
            });

        res.send(articles);
    } catch (error) {
        next(error);
    }
}

const getArticle = async (req, res, next) => {
    try {
        const { id } = req.params
        const article = await articleModel.findById(id).populate('author', { username: 1 })

        //if requested article is not in database return status code error
        if (!article) {
            return res.status(404).json({
                status: 'fail',
                message: 'Article not found'
            })
        }

        //if article is not published
        if (article.state !== 'published') {
            const response = (res) => {
                return res.status(403).json({
                    status: 'fail',
                    error: 'Requested article is not published',
                })
            }
            if (!req.user) {
                return response(res)
            } else if (article.author._id.toString() !== req.user.id.toString()) {
                return response(res)
            }
        }

        //blog read count update
        const oldReadCount = article.read_count;
        await article.update({ read_count: oldReadCount + 1 });
        res.send(blog);
    } catch (err) {
        err.source = 'get published blog controller'
        next(err)
    }
}


const getUserArticles = async (req, res, next) => {
    try {

        const query = req.query;
        const queryObject = {};

        if (query.state) {
            queryObject.state = query.state;
        }

        const page = +req.query.page || 1;
        const limit = +req.query.limit || 20;
        const skip = (page - 1) * limit;

        const myArticles = await articleModel.find({
            ...queryObject,
            author: req.user.userId,
        })
            .skip(skip)
            .limit(limit);

        res.json(myArticles);
    } catch (error) {
        next(error);
    }
};

const createArticle = async (req, res, next) => {
    try {
        //details from the request
        const { title, description, tags, body } = req.body
        // create blog object
        const newArticle = new articleModel({
            title,
            description: description || title,
            tags,
            author: req.user._id,
            body,
            owner: req.user.username,
        })

        const createdArticle = await newArticle.save()

        // save blog ID to user document
        req.user.articles = req.user.articles.concat(createdArticle._id)
        await req.user.save()


        return res.status(201).json({
            status: 'success',
            data: createdBlog,
        })
    } catch (err) {
        err.source = 'creating a blog'
        next(err)
    }
};

const updateArticleState = async (req, res, next) => {
    try {
        let { state } = req.body

        if (!(state && (state.toLowerCase() === 'published' || state.toLowerCase() === 'draft'))) {
            throw new Error('Invalid state')
        }

        const article = await articleModel.findByIdAndUpdate(req.params.id, { state: state.toLowerCase() }, { new: true, runValidators: true, context: 'query' })

        if (!blog) {
            return res.status(404).json({
                status: 'failed',
                message: 'Blog not found'
            })
        }

        return res.json({
            status: 'success',
            data: article
        })
    } catch (err) {
        err.source = 'update blog'
        next(err)
    }
}

const updateArticle = async (req, res, next) => {
    try {
        const article = await articleModel.findById(req.params.id);
        if (req.user.userId === article.author) {
            const update = await blog.updateOne({ ...req.body });
            res.send(update);
        } else
            throw new errorCode(
                'You are not authorized to update this article'
            );
    } catch (error) {
        next(error);
    }
};

const deleteArticle = async (req, res, next) => {
    try {
        const article = await articleModel.findById(req.params.id);
        if (req.user.userId === article.author) {
            const update = await article.deleteOne({ _id: req.params.id });
            res.send(update);
        } else
            throw new errorCode(
                'You are do not have authorization to delete this post '
            );
    } catch (error) {
        next(error);
    }
};



module.exports = {
    getAllArticles,
    getArticle,
    getUserArticles,
    createArticle,
    updateArticle,
    updateArticleState,
    deleteArticle
}