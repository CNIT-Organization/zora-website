import Joi from 'joi';

export const escapeHtml = (text) => {
  if (!text) return '';
  
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  
  return String(text).replace(/[&<>"']/g, (char) => map[char]);
};

export const contactFormSchema = Joi.object({
  name: Joi.string().min(2).max(100).trim().required().messages({
    'string.min': 'Name must be at least 2 characters long',
    'string.max': 'Name must not exceed 100 characters',
    'any.required': 'Name is required',
  }),
  email: Joi.string().email().max(254).trim().required().messages({
    'string.email': 'Please provide a valid email address',
    'string.max': 'Email must not exceed 254 characters',
    'any.required': 'Email is required',
  }),
  subject: Joi.string().min(1).max(200).trim().required().messages({
    'string.min': 'Subject is required',
    'string.max': 'Subject must not exceed 200 characters',
    'any.required': 'Subject is required',
  }),
  message: Joi.string().min(10).max(5000).trim().required().messages({
    'string.min': 'Message must be at least 10 characters long',
    'string.max': 'Message must not exceed 5000 characters',
    'any.required': 'Message is required',
  }),
});

export const b2bFormSchema = Joi.object({
  name: Joi.string().min(2).max(100).trim().required().messages({
    'string.min': 'Name must be at least 2 characters long',
    'string.max': 'Name must not exceed 100 characters',
    'any.required': 'Name is required',
  }),
  email: Joi.string().email().max(254).trim().required().messages({
    'string.email': 'Please provide a valid email address',
    'string.max': 'Email must not exceed 254 characters',
    'any.required': 'Email is required',
  }),
  company: Joi.string().min(2).max(200).trim().required().messages({
    'string.min': 'Company name must be at least 2 characters long',
    'string.max': 'Company name must not exceed 200 characters',
    'any.required': 'Company name is required',
  }),
  phone: Joi.string().min(8).max(20).trim().allow('').optional().messages({
    'string.min': 'Phone number must be at least 8 characters long',
    'string.max': 'Phone number must not exceed 20 characters',
  }),
  role: Joi.string().min(2).max(100).trim().allow('').optional().messages({
    'string.min': 'Role must be at least 2 characters long',
    'string.max': 'Role must not exceed 100 characters',
  }),
  companySize: Joi.string().valid('1-50', '51-200', '201-1000', '1000+').allow('').optional(),
  requirements: Joi.string().max(2000).trim().allow('').optional().messages({
    'string.max': 'Requirements must not exceed 2000 characters',
  }),
});

export const validateRequest = (schema, data) => {
  const { error, value } = schema.validate(data, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    const errors = error.details.map((detail) => ({
      field: detail.path[0],
      message: detail.message,
    }));
    
    return {
      isValid: false,
      errors,
      value: null,
    };
  }

  return {
    isValid: true,
    errors: null,
    value,
  };
};