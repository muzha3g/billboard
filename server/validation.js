// 要放在跟 server index.js 平級的地方
// 可以顯示訊息給使用者，因為 mongoose 的訊息，使用者不一定看的到(?)

const Joi = require("joi");

const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(6).max(50).required(),
    password: Joi.string().min(8).max(50).required(),
  });

  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(50).required(),
    password: Joi.string().min(8).max(50).required(),
  });

  return schema.validate(data);
};

const postValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(50).required(),
    text: Joi.string().min(10).max(500).required(),
  });

  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.postValidation = postValidation;
