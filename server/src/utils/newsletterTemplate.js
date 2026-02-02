export const createNewsletterEmailHTML = (data) => {
  const sanitizedEmail = data.email
    ? data.email.replace(/</g, "&lt;").replace(/>/g, "&gt;")
    : "";
  const formattedDate = data.date
    ? new Date(data.date).toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : new Date().toLocaleString();

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          background-color: #f4f4f4;
        }
        .container {
          padding: 20px;
          background-color: #ffffff;
          margin: 20px auto;
          border-radius: 10px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 30px;
          border-radius: 10px 10px 0 0;
          text-align: center;
        }
        .header h1 {
          color: #ffffff;
          margin: 0;
          font-size: 28px;
        }
        .content {
          padding: 30px;
        }
        .field {
          margin-bottom: 20px;
          padding: 15px;
          background-color: #f8f9fa;
          border-radius: 8px;
          border-left: 4px solid #667eea;
        }
        .label {
          font-weight: bold;
          color: #555;
          font-size: 14px;
          margin-bottom: 5px;
        }
        .value {
          font-size: 18px;
          color: #333;
          word-break: break-all;
        }
        .value a {
          color: #667eea;
          text-decoration: none;
        }
        .value a:hover {
          text-decoration: underline;
        }
        .footer {
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid #ddd;
          font-size: 12px;
          color: #666;
          text-align: center;
        }
        .badge {
          display: inline-block;
          padding: 5px 12px;
          background-color: #28a745;
          color: white;
          border-radius: 20px;
          font-size: 12px;
          margin-bottom: 15px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 New Newsletter Subscriber!</h1>
        </div>
        
        <div class="content">
          <div class="badge">NEW SUBSCRIPTION</div>
          
          <div class="field">
            <div class="label">Subscriber Email:</div>
            <div class="value">
              <a href="mailto:${sanitizedEmail}">${sanitizedEmail}</a>
            </div>
          </div>
          
          <div class="field">
            <div class="label">Subscription Date:</div>
            <div class="value">${formattedDate}</div>
          </div>
          
          <div class="field">
            <div class="label">Source:</div>
            <div class="value">Zora Website Footer</div>
          </div>
        </div>
        
        <div class="footer">
          <p>This newsletter subscription was submitted from the Zora website footer.</p>
          <p><strong>Action Required:</strong> Add ${sanitizedEmail} to your mailing list.</p>
          <p>© ${new Date().getFullYear()} Zora Education. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};
