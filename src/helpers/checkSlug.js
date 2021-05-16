import { Post} from '../models';
/**
    *
    * returning the post's id for the slug given in url param.
    * @static
    * @param {object} req
    * @param {object} res
    * @returns {id} post id
    * @memberof Comments
    */
const checkSlug = async (req, res) => {
  const postId = await Post.findOne({
    where: { slug: req.params.slug },
    attributes: ['id']
  });
  if (!postId) {
    return res.status(404).json({
      status: 404,
      message: 'Postis not found.'
    });
  }
  return postId.id;
};

export default checkSlug;
