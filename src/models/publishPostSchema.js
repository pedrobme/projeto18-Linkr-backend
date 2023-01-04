import joi from "joi";

const publishSchema = joi.object({
  url: joi.string().uri().required(),
});

export default publishSchema;
