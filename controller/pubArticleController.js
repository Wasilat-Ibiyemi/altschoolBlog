const jwt = require("jsonwebtoken");
const passport = require("passport");
require('dotenv').config()
const Article = require('../model/article')

exports.getAllPublishedBlogs = async (req, res) => {
    let { page, postsPerPage } = req.param

    try {
        page = !page ? 0 : page
        postsPerPage = !postsPerPage ? 20 : postsPerPage
        let article = await Article
            .find({ state: 'published' })
            .skip(page)
            .limit(postsPerPage);
        if (article)
            return res.status(200).json({
                success: true,
                message: 'Published Articles found!',
                article
            })
        res.status(404).json({
            success: false,
            message: 'Published Articles not found!',

        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Interal Server Error",
            error: error.message
        })
    }
}