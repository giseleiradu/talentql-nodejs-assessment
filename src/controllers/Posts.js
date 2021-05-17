import slugify from 'slugify';
import errorHandler from '../helpers/errorHandler';
import {Post, User, PostLikes} from '../models';



/**
 *
 *
 * @class Posts
 */

export default class Posts{
    /**
     *
     *
     * @static
     * @param {object} res
     * @param {string} string
     * @returns {string} slug
     * @memberof Posts
     */
  static async createSlug(res, string) {
    try {
      const slug = `${await slugify(string)}-${Math.floor(Math.random() * 999999999) + 100000000}`;
      return slug;
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
     * @memberof Posts
     */
  static async create(req, res) {
      try {
        const { post } = req.body;
        const { id } = req.user;
        post.userId = id;
        post.slug = await Posts.createSlug(res, post.title);
        const result = await Post.create(post);
        return res.status(201).json({
            status: 201,
            data: { post: result }
        });
        } catch (e) {
        errorHandler.errorResponse(res, e);
        }
    }

  /**
     *
     *
     * @static
     * @param {*} req
     * @param {*} res
     * @returns {object} response
     * @memberof Posts
     */
  static async getAll(req, res) {
    // get query string
    const { limit = 20, offset = 0 } = req.query;
    try {
      let result = await Post.findAll({
        order: [['createdAt', 'DESC']],
        limit,
        offset,
        include: {
            model: User,
            attributes: ['username', 'email',],
        },
      });

      return res.status(200).json({
        status: 200,
        data: { posts: result, postsCount: result.length }
      });
    } catch (e) {
      errorHandler.errorResponse(res, e);
    }
  }

  /**
   * Gets user's posts
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @returns {object} posts
   * @memberof Posts
   */
  static async getPrivatePosts(req, res) {
    const { limit = 10, offset = 0 } = req.query; /// needs a check
    const { username } = req.params;

    try {
      const user = await User.findOne({ where: { username } });
      if (!user) {
        res.status(404).json({
          status: 404,
          message: 'User not found',
        });
      }

      let result = await Post.findAll({
        order: [['createdAt', 'DESC']],
        limit,
        offset,
        include: {
            model: User,
            attributes: ['username','email'],
        },
        where: { 
            userId: user.id 
        }
      });

      return res.status(200).json({
        status: 200,
        data: { posts: result, postsCount: result.length }
      });
    } catch (e) {
      errorHandler.errorResponse(res, e);
    }
  }

  /**
     *
     *
     * @static
     * @param {*} req
     * @param {*} res
     * @returns {object} response
     * @memberof Posts
     */
  static async get(req, res) {
    try {
      let result = await Post.findOne({
        include: {
            model: User,
            attributes: ['username','email'],
        },
        where: { 
            slug: req.params.slug,
        }
      });

      if (result) {
        return res.status(200).json({
          status: 200,
          data: { result }
        });
      }

      return res.status(404).json({
        status: 404,
        message: 'Post not found'
      });
    } catch (e) {
      errorHandler.errorResponse(res, e);
    }
  }

  /**
     *
     *
     * @static
     * @param {*} req
     * @param {*} res
     * @returns {object} response
     * @memberof Posts
     */
  static async update(req, res) {
    try {
      const { post } = req.body;
      const { id } = req.user;
      const postOwner = await Post.findOne({
        where: {
          slug: req.params.slug,
        }
      });
      if (!postOwner) {
        return res.status(404).json({
          status: 404,
          message: 'Post pubisher not found'
        });
      }

      if (postOwner.userId !== id) {
        return res.status(401).json({
          status: 401,
          message: 'This is not your post'
        });
      }

      const { slug } = req.params;
      const result = await Post.update(post, {
        where: { slug },
        returning: true,
        plain: true
      });
      return res.status(200).json({
        status: 200,
        data: { post: result[1].get() }
      });
    } catch (e) {
      errorHandler.errorResponse(res, e);
    }
  }

  /**
   *
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @returns {object} response
   * @memberof Posts
   */
  static async delete(req, res) {
    try {
      const { slug } = req.params;
      const { id } = req.user;
      const postOwner = await Post.findOne({
        where: {
          slug: req.params.slug,
        }
      });

      if (!postOwner) {
        return res.status(401).json({
          status: 404,
          message: 'Post not found'
        });
      }

      if (postOwner.userId !== id) {
        return res.status(401).json({
          status: 401,
          message: 'This is not your post'
        });
      }
      const result = await Post.destroy({ where: { slug, }, returning: true });

      if (result > 0) {
        return res.status(200).json({
          status: 200,
          message: 'Post successfully deleted'
        });
      }

      return res.status(200).json({
        status: 200,
        message: 'Post successfully deleted'
      });
    } catch (e) {
      errorHandler.errorResponse(res, e);
    }
  }

  /**
   *
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @returns {object} response
   * @memberof Posts
   */
  static async like(req, res) {
    try {
      const result = await Post.findOne({
        where: { slug: req.params.slug }
      });
      console.log(`slug`, slug);
      
      if (!result) {
        return res.status(404).json({
          status: 404,
          message: 'Post not found'
        });
      }
      const { user } = req;
      const newLike = await PostLikes.findOrCreate({
        where: {
          postId: result.id,
          userId: user.id,
        },
        defaults: {
          postId: result.id,
          userId: user.id,
        },
      });
      if (!newLike[1]) {
        return res.status(409).json({
          status: 409,
          message: 'You already liked this post'
        });
      }

      const totOfLikes = await PostLikes.findAndCountAll({
        where: { postId: result.id }
      });
      const { slug } = req.params;
      await Post.update(
        {
          liked: true,
          likesCount: totOfLikes.count,
        },
        {
          where: { slug, },
          returning: true,
          plain: true
        }
        );
        return res.status(200).json({
          status: 200,
          message: 'You have successfully liked the post',
          likes: Post.likesCount
        });
       
      } catch (e) {
        console.log(`e`, e)
        errorHandler.errorResponse(res, e);
      }
    }
    
    /**
     *
     *
     * @static
     * @param {*} req
     * @param {*} res
     * @returns {object} response
     * @memberof Posts
     */
    static async unlike(req, res) {
      try {
        const { user } = req;
        
        const { slug } = req.params;
        const post = await Post.findOne({
          where: { slug }
        });
        
        if (!post) {
          return res.status(404).json({
          status: 404,
          message: 'Post not found'
        });
      }
      const isLiked = await PostLikes.findOne({
        where: {
          postId: post.id,
          userId: user.id,
        }
      });
      if (isLiked) {
        await PostLikes.destroy({
          where: {
            postId: post.id,
            userId: user.id,
          },
          returning: false,
        });

        const totOfLikes = await PostLikes.findAndCountAll({
          where: { postId: post.id }
        });
        
        if (totOfLikes.count > 0) {
         await Post.update(
            {
              likesCount: totOfLikes.count,
            },
            {
              where: { slug, },
              returning: true,
              plain: true
            }
          );
        } else {
          await Post.update(
            {
              liked: false,
              likesCount: totOfLikes.count,
            },
            {
              where: { slug, },
              returning: true,
              plain: true
            }
          );
        }
        return res.status(200).json({
          status: 200,
          message: 'You have successfully unliked the post',
          likes: Post.likesCount
        });
      }
      return res.status(409).json({
        status: 409,
        message: 'Post has to be liked first'
      });
    } catch (error) {
      errorHandler.errorResponse(res, error);
    }
  }


}
