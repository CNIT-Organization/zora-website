import { sendEmail, RECIPIENT_EMAILS } from "../config/email.js";
import { createContactEmailHTML } from "../utils/emailTemplates.js";
import { contactFormSchema, validateRequest } from "../utils/validators.js";

export const handleContactForm = async (req, res) => {
  try {
    const validation = validateRequest(contactFormSchema, req.body);

    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validation.errors,
      });
    }

    const { name, email, subject, message } = validation.value;

    let recipient = RECIPIENT_EMAILS.INFO;
    if (subject.toLowerCase().includes("sales")) {
      recipient = RECIPIENT_EMAILS.SALES;
    } else if (subject.toLowerCase().includes("support")) {
      recipient = RECIPIENT_EMAILS.SUPPORT;
    }

    const htmlContent = createContactEmailHTML({
      name,
      email,
      subject,
      message,
    });

    const mailOptions = {
      to: recipient,
      subject: `Zora Website Contact: ${subject}`,
      html: htmlContent,
      replyTo: {
        name: name,
        address: email,
      },
    };

    await sendEmail(mailOptions);

    return res.status(200).json({
      success: true,
      message: "Message sent successfully. We will get back to you soon.",
    });
  } catch (error) {
    console.error("Contact form error:", error);

    return res.status(500).json({
      success: false,
      message:
        "Failed to send message. Please try again or contact us directly.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
