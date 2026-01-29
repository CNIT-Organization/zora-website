import { sendEmail, RECIPIENT_EMAILS } from '../config/email.js';
import { createB2BEmailHTML } from '../utils/emailTemplates.js';
import { b2bFormSchema, validateRequest } from '../utils/validators.js';

export const handleB2BForm = async (req, res) => {
  try {
    const validation = validateRequest(b2bFormSchema, req.body);
    
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validation.errors,
      });
    }

    const { name, email, company, phone, role, companySize, requirements } = validation.value;

    const htmlContent = createB2BEmailHTML({
      name,
      email,
      company,
      phone,
      role,
      companySize,
      requirements,
    });

    const mailOptions = {
      to: RECIPIENT_EMAILS.SALES,
      cc: RECIPIENT_EMAILS.ADMIN,
      subject: `Zora B2B Request from ${company}`,
      html: htmlContent,
      replyTo: {
        name: name,
        address: email,
      },
    };

    await sendEmail(mailOptions);

    return res.status(200).json({
      success: true,
      message: 'B2B request received. We will contact you within 24 hours.',
    });
  } catch (error) {
    console.error('B2B form error:', error);
    
    return res.status(500).json({
      success: false,
      message: 'Failed to submit B2B request. Please try again or contact us directly.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};