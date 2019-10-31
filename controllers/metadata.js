const axios = require('axios');
const dotenv = require('dotenv')
const {
    check,
    validationResult
} = require('express-validator')
const uuid = require('uuid/v4');
dotenv.config()

var dbil = process.env.DBIL_API

module.exports = {
    validate: (method) => {
        switch (method) {
            case "store":
                return [
                    check('user_id', 'The fields user_id is required').exists(),
                    check('category_id', 'The fields category_id is required').exists(),
                    check('video_title', 'The fields video_title is required').exists(),
                    check('video_description', 'The fields video_description is required').exists(),
                    check('video_genre', 'The fields video_genre is required').exists(),
                    check('privacy', 'The fields privacy is required').exists(),
                ]
        }
    },

    index: async (req, res, next) => {
        try {
            let result = await axios.get(dbil + '/content/metadata');
            res.send(result.data)
        } catch (err) {
            next(err)
        }
    },

    get: async (req, res, next) => {
        try {
            let id = req.params.id;
            let result = await axios.get(dbil + '/content/metadata/' + id)

            if (result.status === 200) {
                res.send(result.data)
            }
        } catch (error) {
            next(error)
        }
    },

    store: async (req, res, next) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                code: 422,
                success: false,
                message: errors.array()
            });
        }

        try {
            var data = {
                "user_id": req.body.user_id,
                "category_id": req.body.category_id,
                "video_title": req.body.video_title,
                "video_description": req.body.video_description,
                "video_genre": req.body.video_genre,
                "video_viewers": null,
                "video_share": null,
                "video_saves": null,
                "video_downloads": null,
                "thumbnail": null,
                "privacy": req.body.privacy,
                "id": uuid(),
                "metavideos": null,
                "subtitle": null,
                "comments": null,
                "like": null,
                "dislike": null
            }

            var result = await axios({
                method: "post",
                url: dbil + '/content/metadata/store',
                data: data
            })

            if (result.status === 200) {
                res.send(result.data)
            }
        } catch (error) {
            next(error)
        }
    },

    update: async (req, res, next) => {
        try {
            var result = await axios({
                method: "post",
                url: dbil + '/content/metadata/update/' + req.params.id,
                data: req.body
            })

            if (result.status === 200) {
                res.send(result.data)
            }
        } catch (error) {
            next(error)
        }
    },

    delete: async (req, res, next) => {
        try {
            var result = await axios({
                method: "post",
                url: dbil + '/content/metadata/delete/' + req.params.id
            })

            if (result.status === 200) {
                res.send(result.data)
            }
        } catch (error) {
            next(error)
        }
    }
}