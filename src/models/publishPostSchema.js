import joi from "joi";

const publishSchema = joi.object({
  text: joi.string(),
  url: joi.string().uri().required(),
});

export default publishSchema;
