import { Comment, User, CommentLikes} from '../models';
import errorHandler from '../helpers/errorHandler';
import checkSlug from '../helpers/checkSlug';
/**
 *
 *
 * @class Comments
 */
class Comments {
  /**
     *
     *
     * @static
     * @param {object} req
     * @param {object} res
     * @returns {object} response
     * @memberof Comments
     */
  static async create(req, res) {
    try {
      const postId = await checkSlug(req, res);
      if (typeof postId !== 'number') {
        return false;
      }
      const userId = req.user.id;
      const comment = {
        body: req.body.comment.body,
        userId,
        postId,
      };
      console.log(`comment`, comment)
      const result = await Comment.create(comment);
      return res.status(201).json({
        status: 201,
        data: { comment: result }
      });
    } catch (e) {
      errorHandler.errorResponse(res, e);
    }
    }

  /**
     *
     *
     * @static
     * @param {object} req
     * @param {object} res
     * @returns {object} response
     * @memberof Comments
     */
  static async getAll(req, res) {
    try {
      const postId = await checkSlug(req, res);
      if (typeof postId !== 'number') {
        return false;
      }
      const result = await Comment.findAndCountAll({
        where: { postId, },
        attributes: ['body', 'createdAt', 'updatedAt', 'liked', 'likeCounts', 'id'],
        include: [{
          model: User,
          attributes: ['username'],
        },
        ],

        order: [['createdAt', 'DESC']]
      });
      return res.status(200).json({
        status: 200,
        data: {
          comments: result.rows,
          commentsCount: result.count,
        }
      });
    } catch (e) {
      errorHandler.errorResponse(res, e);
    }
  }

  /**
     *
     * delete a comment.
     * @static
     * @param {object} req
     * @param {object} res
     * @returns {id} post id
     * @memberof Comments
     */
  static async delete(req, res) {
    try {
      const postId = await checkSlug(req, res);
      if (typeof postId !== 'number') {
        return false;
      }
      const { id } = req.params;
      const commentOwner = await Comment.findOne({
        where: {
          id,
        }
      });
      if (!commentOwner) {
        return res.status(404).json({
          status: 404,
          message: 'User not found'
        });
      }
      if (commentOwner.userId !== req.user.id) {
        return res.status(401).json({
          status: 401,
          message: 'This is not your comment'
        });
      }
      const result = await Comment.destroy({ where: { id, }, returning: true });

      if (result > 0) {
        return res.status(200).json({
          status: 200,
          message: 'Comment successfully deleted'
        });
      }

      return res.status(404).json({
        status: 404,
        message: 'Comment not found'
      });
    } catch (e) {
      errorHandler.errorResponse(res, e);
    }
  }

  /**
     *
     * update a comment.
     * @static
     * @param {object} req
     * @param {object} res
     * @returns {id} post id
     * @memberof Comments
     */
  static async update(req, res) {
    try {
      const postId = await checkSlug(req, res);
      if (typeof postId !== 'number') {
        return false;
      }
      const { id } = req.params;
      const commentOwner = await Comment.findOne({
        where: {
          id,
        }
      });
      if (!commentOwner) {
        return res.status(401).json({
          status: 404,
          message: 'Comment not found'
        });
      }
      if (commentOwner.userId !== req.user.id) {
        return res.status(401).json({
          status: 401,
          message: 'This is not your comment'
        });
      }
      const { body } = req.body.comment;
      const result = await Comment.update({ body, }, {
        where: { id, },
        returning: true,
        plain: true
      });
      return res.status(200).json({
        status: 200,
        data: {
          comment: result[1].get(),
        }
      });
    } catch (e) {
      if (e.message === 'Cannot read property \'length\' of null') {
        return res.status(404).json({
          status: 404,
          message: 'Comment not found'
        });
      }
      errorHandler.errorResponse(res, e);
    }
  }

  /**
     *
     * like a comment.
     * @static
     * @param {object} req
     * @param {object} res
     * @returns {object} object
     * @memberof Comments
     */
  static async like(req, res) {
    try {
      console.log(`aha niho turi`, req.body)
      const postId = await checkSlug(req, res);
      if (typeof postId !== 'number') {
        return false;
      }
      const { id } = req.params;
      const result = await Comment.findOne({ attributes: ['id'], where: { id } });
      if (!result) {
        return res.status(404).json({
          status: 404,
          message: 'Comment not found'
        });
      }

      const { user } = req;
      const aLike = await CommentLikes.findOrCreate({
        where: {
          commentId: result.id,
          userId: user.id
        },
        defaults: {
          commentId: result.id,
          userId: user.id,
        },
      });
      if (!aLike[1]) {
        return res.status(400).json({
          status: 400,
          message: 'You already liked this comment',
        });
      }
      const likes = await CommentLikes.findAndCountAll({
        where: { commentId: result.id }
      });
      const updateComment = await Comment.update(
        {
          liked: true,
          likeCounts: likes.count,
        },
        {
          where: { id, },
          returning: true,
          plain: true
        }
      );

      return res.status(200).json({
        status: 200,
        data: { comment: updateComment[1].get() }
      });
    } catch (e) {
      errorHandler.errorResponse(res, e);
    }
  }

  /**
     *
     * Unlike a comment.
     * @static
     * @param {object} req
     * @param {object} res
     * @returns {object} object
     * @memberof Comments
     */
  static async unLike(req, res) {
    try {
      const postId = await checkSlug(req, res);
      if (typeof postId !== 'number') {
        return false;
      }
      const { id } = req.params;
      const result = await Comment.findOne({ attributes: ['id'], where: { id } });
      if (!result) {
        return res.status(404).json({
          status: 404,
          message: 'Comment not found'
        });
      }

      const { user } = req;
      const aLike = await CommentLikes.findAll({
        where: {
          commentId: result.id,
          userId: user.id,
        },
        attributes: ['id'],
        defaults: {
          commentId: result.id,
          userId: user.id,
        },
      });

      if (!aLike[1]) {
        await CommentLikes.destroy({
          where: {
            commentId: result.id,
            userId: user.id,
          },
          returning: true,
        });

        const likes = await CommentLikes.findAndCountAll({
          where: { commentId: result.id }
        });
        let updateComment;
        if (likes.count > 0) {
          updateComment = await Comment.update(
            {
              likeCounts: likes.count,
            },
            {
              where: { id, },
              returning: true,
              plain: true
            }
          );
        } else {
          updateComment = await Comment.update(
            {
              liked: false,
              likeCounts: likes.count,
            },
            {
              where: { id, },
              returning: true,
              plain: true
            }
          );
        }
        return res.status(200).json({
          status: 200,
          data: { comment: updateComment[1].get() }
        });
      }
      return res.status(404).json({
        status: 404,
        message: 'There is no like of yours on this comment'
      });
    } catch (e) {
      errorHandler.errorResponse(res, e);
    }
  }
}

export default Comments;
