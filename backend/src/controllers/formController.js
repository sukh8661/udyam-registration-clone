const Joi = require('joi');
const FormSubmission = require('../models/FormSubmission');

const formSchema = Joi.object({
  aadhaarNumber: Joi.string().pattern(/^[0-9]{12}$/).required(),
  otp: Joi.string().pattern(/^[0-9]{6}$/).required(),
  panNumber: Joi.string().pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/).required(),
  entrepreneurName: Joi.string().min(2).required(),
  mobileNumber: Joi.string().pattern(/^[6-9][0-9]{9}$/).required(),
  emailId: Joi.string().email().required()
});

exports.submitForm = async (req, res) => {
  try {
    const { error, value } = formSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const form = await FormSubmission.create(value);
    res.status(201).json({ success: true, message: 'Form submitted successfully', data: form });
  } catch (err) {
    console.error('Error submitting form:', err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

exports.getAllSubmissions = async (req, res) => {
  try {
    const submissions = await FormSubmission.findAll({ order: [['createdAt', 'DESC']] });
    res.json({ success: true, data: submissions });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching submissions' });
  }
};
