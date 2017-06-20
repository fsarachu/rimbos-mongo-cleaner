// Import stuff
const log = require('simple-node-logger').createSimpleLogger({
    logFilePath: './log/Index.log',
    timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS',
});
const Model = require('./models/event');
const EventPost = require('./models/eventPost');
const PostComment = require('./models/postComment');


/**
 * Finds the requested events and their associated content.
 * @param {ObjectId[]} eventIds - An array of events ObjectId's.
 */
function findEvents(eventIds) {
    Model.find({_id: {$in: eventIds}}, (err, events) => {

        if (err) {
            log.error(err);
        }

        log.info(`${events.length} Events Found`);

        findEventPosts(events.map(e => e._id));

    });
}


/**
 * Finds all posts that belong to any of the specified events.
 * @param {ObjectId[]} eventIds - An array of events ObjectId's.
 */
function findEventPosts(eventIds) {

    EventPost.find({eventId: {$in: eventIds}}, (err, posts) => {

        if (err) {
            log.error(err);
        }

        log.info(`${posts.length} Posts Found`);

        findPostComments(posts.map(p => p._id));

    });

}


/**
 * Finds all comments that belong to any of the specified event posts.
 * @param {ObjectId[]} postIds - An array of event post ObjectId's.
 */
function findPostComments(postIds) {

    PostComment.find({eventPostId: {$in: postIds}}, (err, comments) => {

        if (err) {
            log.error(err);
        }

        log.info(`${comments.length} Comments Found`);

    });
}


/**
 * Deletes the requested events (and their associated content via mongoose model middleware).
 * @param {ObjectId[]} eventIds - An array of events ObjectId's.
 */
function deleteEvents(eventIds) {

    Model.find({_id: {$in: eventIds}}, (err, events) => {

        if (err) {
            log.error(err);
        }

        for (let event of events) {
            event.remove();
        }

    });

}


/**
 * Finds event posts that belong to a non existing event.
 */
function findOrphanPosts() {

    let allPosts = EventPost.find().exec();

    allPosts.then(posts => {

        let postsProcessed = 0;

        for (let post of posts) {

            let event = Model.findById(post.eventId).exec();

            event.then(event => {
                if (!event) {
                    console.log(`${post._id} is orphan. It belongs to the event ${post.eventId}`);
                }

                postsProcessed += 1;

                if (postsProcessed === posts.length) {
                    console.log('Done!');
                }
            });

        }

    })
}


/**
 * Deletes event posts that belong to a non existing event.
 */
function deleteOrphanPosts() {

    let postsProcessed = 0;
    let allPosts = EventPost.find().exec();

    allPosts.then(posts => {

        for (let post of posts) {

            let event = Model.findById(post.eventId).exec();

            event.then(event => {
                if (!event) {
                    post.remove().then(() => {
                        postsProcessed += 1;

                        if (postsProcessed === posts.length) {
                            console.log('Done!');
                        }
                    });
                } else {
                    postsProcessed += 1;
                }
            });

        }

    })
}


/**
 * Finds comments that belong to a non existing post.
 */
function findOrphanComments() {

    let allComments = PostComment.find().exec();

    allComments.then(comments => {

        let commentsProcessed = 0;

        for (let comment of comments) {

            let post = EventPost.findById(comment.eventPostId).exec();

            post.then(post => {
                if (!post) {
                    console.log(`${comment._id} is orphan. It belongs to the post ${comment.eventPostId}`);
                }

                commentsProcessed += 1;

                if (commentsProcessed === comments.length) {
                    console.log('Done!');
                }
            });

        }

    })
}


/**
 * Deletes comments that belong to a non existing post.
 */
function deleteOrphanComments() {

    let allComments = PostComment.find().exec();

    allComments.then(comments => {

        let commentsProcessed = 0;

        for (let comment of comments) {

            let post = EventPost.findById(comment.eventPostId).exec();

            post.then(post => {
                if (!post) {
                    comment.remove().then(() => {
                        commentsProcessed += 1;

                        if (commentsProcessed === comments.length) {
                            console.log('Done!');
                        }
                    });
                } else {
                    commentsProcessed += 1;
                }
            });

        }

    })
}


/**
 * Finds documents containing fields not specified in the the mongoose schema belonging to the model.
 * @param {mongoose.model} Model.
 * @returns {Promise} - A promise that resolves to an array of objects with the keys "model" (mongoose model instance) and "extraFields" ([String]).
 */
function findDocsWithExtraFields(Model) {
    let schemaFields = Object.keys(Model.schema.paths);
    let findModels = Model.find().exec();

    return findModels.then((models) => {

        let dirtyDocs = [];

        for (let model of models) {

            let docFields = Object.keys(model._doc);
            let extraFields = [];

            for (let docField of docFields) {

                let isExtraField = true;

                for (let schemaField of schemaFields) {
                    if (docField === schemaField) {
                        isExtraField = false;
                        break;
                    }
                }

                if (isExtraField) {
                    extraFields.push(docField);
                }

            }

            if (extraFields.length !== 0) {
                dirtyDocs.push({
                    model,
                    extraFields,
                });
            }

        }

        return Promise.resolve(dirtyDocs);
    });
}


function normalizeDocsWithExtraFields(Model) {
    return findDocsWithExtraFields(Model).then((docs) => {

        let promises = [];

        for (let doc of docs) {

            for (let field of doc.extraFields) {

                let p = Model.update({_id: doc.model._id}, {$unset: {[field]: ''}}).exec();
                promises.push(p);

            }

        }

        return Promise.all(promises);
    });
}


module.exports = {
    findEvents,
    deleteEvents,
    findOrphanPosts,
    deleteOrphanPosts,
    findOrphanComments,
    deleteOrphanComments,
    findDocsWithExtraFields,
    normalizeDocsWithExtraFields,
};