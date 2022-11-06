const passport = require('passport')
const blogRouter = require('express').Router()

const { getAllArticles, getArticle, getUserArticles, createArticle, updateArticle, updateArticleState, deleteArticle } = require('../controller/articleController')
const auth = require('../authenticate/auth')


blogRouter.route('/blog').get(getAllArticles)
blogRouter.route('/:id').get(getArticle)
blogRouter.route('/article/:id').patch(updateArticle)
blogRouter.route('/:id').patch(updateArticleState)
blogRouter.route('/:id').delete(deleteArticle)

//blogRouter.use(auth)

blogRouter.post('/', passport.authenticate('blog', { session: false }))


blogRouter.route('/').post(createArticle)

module.exports = blogRouter