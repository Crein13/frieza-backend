import Joi from 'joi';

export const updateProfileSchema = Joi.object({
  email: Joi.string().email().optional(),
  name: Joi.string().min(2).max(50).optional(),
});
