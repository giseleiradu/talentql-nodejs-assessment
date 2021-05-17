import Joi from 'joi';

const schema = {
  // post schema

  create: Joi.object().keys({
    post: {
      title: Joi.string().required(),
      description: Joi.string().required(),
      body: Joi.string().required(),
      images: Joi.array(),
    }
  }),

  update: Joi.object().keys({
    post: {
      title: Joi.string(),
      description: Joi.string(),
      body: Joi.string()
    }
  }),

  //slug

  params: Joi.object().keys({
    slug: Joi.string().required().trim(),
  }),


  // commenting

  comment: Joi.object().keys({
    comment: {
      body: Joi.string().required().trim(),
    }
  }),

  idParam: Joi.object().keys({
    id: Joi.number().required(),
    slug: Joi.string().required().trim(),
  })
};

export default schema;
