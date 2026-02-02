import Joi from "joi";

export const escapeHtml = (text) => {
  if (!text) return "";

  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };

  return String(text).replace(/[&<>"']/g, (char) => map[char]);
};

export const contactFormSchema = Joi.object({
  name: Joi.string().min(2).max(100).trim().required().messages({
    "string.min": "Name must be at least 2 characters long",
    "string.max": "Name must not exceed 100 characters",
    "any.required": "Name is required",
  }),
  email: Joi.string().email().max(254).trim().required().messages({
    "string.email": "Please provide a valid email address",
    "string.max": "Email must not exceed 254 characters",
    "any.required": "Email is required",
  }),
  subject: Joi.string().min(1).max(200).trim().required().messages({
    "string.min": "Subject is required",
    "string.max": "Subject must not exceed 200 characters",
    "any.required": "Subject is required",
  }),
  message: Joi.string().min(10).max(5000).trim().required().messages({
    "string.min": "Message must be at least 10 characters long",
    "string.max": "Message must not exceed 5000 characters",
    "any.required": "Message is required",
  }),
});

export const b2bFormSchema = Joi.object({
  name: Joi.string().min(2).max(100).trim().required().messages({
    "string.min": "Name must be at least 2 characters long",
    "string.max": "Name must not exceed 100 characters",
    "string.empty": "Name is required",
    "any.required": "Name is required",
  }),
  email: Joi.string().email().max(254).trim().required().messages({
    "string.email": "Please provide a valid email address",
    "string.max": "Email must not exceed 254 characters",
    "string.empty": "Email is required",
    "any.required": "Email is required",
  }),
  company: Joi.string().min(2).max(200).trim().required().messages({
    "string.min": "Institution name must be at least 2 characters long",
    "string.max": "Institution name must not exceed 200 characters",
    "string.empty": "Institution name is required",
    "any.required": "Institution name is required",
  }),
  phone: Joi.string()
    .pattern(/^[+]?[\d\s()-]{8,20}$/)
    .trim()
    .required()
    .messages({
      "string.pattern.base":
        "Please provide a valid phone number (at least 8 digits)",
      "string.empty": "Phone number is required",
      "any.required": "Phone number is required",
    }),
  institutionType: Joi.string()
    .valid("school", "university", "training_center", "other")
    .allow("")
    .optional(),
  estimatedStudents: Joi.number()
    .integer()
    .min(1)
    .allow("", null)
    .optional()
    .messages({
      "number.base": "Please provide a valid number of students",
      "number.min": "Number of students must be at least 1",
    }),
  requirements: Joi.string().max(2000).trim().allow("").optional().messages({
    "string.max": "Requirements must not exceed 2000 characters",
  }),
});

export const newsletterSchema = Joi.object({
  email: Joi.string().email().max(254).trim().required().messages({
    "string.email": "Please provide a valid email address",
    "string.max": "Email must not exceed 254 characters",
    "any.required": "Email is required",
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
