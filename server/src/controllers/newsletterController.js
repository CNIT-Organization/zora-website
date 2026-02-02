import { sendEmail, RECIPIENT_EMAILS } from "../config/email.js";
import { createNewsletterEmailHTML } from "../utils/emailTemplates.js";
import { newsletterSchema, validateRequest } from "../utils/validators.js";

export const handleNewsletterSubscription = async (req, res) => {
  try {
    const validation = validateRequest(newsletterSchema, req.body);

    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validation.errors,
      });
    }

    const { email } = validation.value;

    const htmlContent = createNewsletterEmailHTML({
      email,
      date: new Date().toISOString(),
    });

    const mailOptions = {
      to: RECIPIENT_EMAILS.INFO,
      subject: "🎉 New Newsletter Subscription - Zora",
      html: htmlContent,
      replyTo: {
        name: "Newsletter Subscriber",
        address: email,
      },
    };

    await sendEmail(mailOptions);

    return res.status(200).json({
      success: true,
      message: "Successfully subscribed to our newsletter!",
    });
  } catch (error) {
    console.error("Newsletter subscription error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to subscribe. Please try again later.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
