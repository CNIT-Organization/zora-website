import { escapeHtml } from './validators.js';

export const createContactEmailHTML = (data) => {
  const sanitizedName = escapeHtml(data.name);
  const sanitizedEmail = escapeHtml(data.email);
  const sanitizedSubject = escapeHtml(data.subject);
  const sanitizedMessage = escapeHtml(data.message).replace(/\n/g, '<br>');

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
        }
        .container {
          padding: 20px;
        }
        .header {
          background-color: #f4f4f4;
          padding: 20px;
          border-radius: 5px;
          margin-bottom: 20px;
        }
        .field {
          margin-bottom: 15px;
        }
        .label {
          font-weight: bold;
          color: #555;
        }
        .value {
          margin-top: 5px;
          word-break: break-word;
        }
        .message-content {
          background-color: #f9f9f9;
          padding: 15px;
          border-left: 4px solid #4CAF50;
          margin-top: 10px;
          word-break: break-word;
          white-space: pre-wrap;
        }
        .footer {
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid #ddd;
          font-size: 12px;
          color: #666;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>New Contact Form Submission</h2>
        </div>
        
        <div class="field">
          <div class="label">From:</div>
          <div class="value">${sanitizedName}</div>
        </div>
        
        <div class="field">
          <div class="label">Email:</div>
          <div class="value"><a href="mailto:${sanitizedEmail}">${sanitizedEmail}</a></div>
        </div>
        
        <div class="field">
          <div class="label">Subject:</div>
          <div class="value">${sanitizedSubject}</div>
        </div>
        
        <div class="field">
          <div class="label">Message:</div>
          <div class="message-content">${sanitizedMessage}</div>
        </div>
        
        <div class="footer">
          <p>This email was sent from the Zora website contact form.</p>
          <p>Reply directly to this email to contact ${sanitizedName}.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

export const createB2BEmailHTML = (data) => {
  const sanitizedName = escapeHtml(data.name);
  const sanitizedEmail = escapeHtml(data.email);
  const sanitizedCompany = escapeHtml(data.company);
  const sanitizedPhone = data.phone ? escapeHtml(data.phone) : '';
  const sanitizedRole = data.role ? escapeHtml(data.role) : '';
  const sanitizedCompanySize = data.companySize ? escapeHtml(data.companySize) : '';
  const sanitizedRequirements = data.requirements
    ? escapeHtml(data.requirements).replace(/\n/g, '<br>')
    : '';

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
        }
        .container {
          padding: 20px;
        }
        .header {
          background-color: #fff3cd;
          padding: 20px;
          border-radius: 5px;
          margin-bottom: 20px;
          border-left: 4px solid #ffc107;
        }
        .field {
          margin-bottom: 15px;
        }
        .label {
          font-weight: bold;
          color: #555;
        }
        .value {
          margin-top: 5px;
          word-break: break-word;
        }
        .highlight {
          background-color: #f9f9f9;
          padding: 15px;
          border-left: 4px solid #2196F3;
          margin-top: 10px;
          word-break: break-word;
          white-space: pre-wrap;
        }
        .footer {
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid #ddd;
          font-size: 12px;
          color: #666;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>🎯 New B2B Request</h2>
        </div>
        
        <div class="field">
          <div class="label">Contact Name:</div>
          <div class="value">${sanitizedName}</div>
        </div>
        
        <div class="field">
          <div class="label">Email:</div>
          <div class="value"><a href="mailto:${sanitizedEmail}">${sanitizedEmail}</a></div>
        </div>
        
        <div class="field">
          <div class="label">Company:</div>
          <div class="value">${sanitizedCompany}</div>
        </div>
        
        ${sanitizedPhone ? `
        <div class="field">
          <div class="label">Phone:</div>
          <div class="value"><a href="tel:${sanitizedPhone}">${sanitizedPhone}</a></div>
        </div>
        ` : ''}
        
        ${sanitizedRole ? `
        <div class="field">
          <div class="label">Role:</div>
          <div class="value">${sanitizedRole}</div>
        </div>
        ` : ''}
        
        ${sanitizedCompanySize ? `
        <div class="field">
          <div class="label">Company Size:</div>
          <div class="value">${sanitizedCompanySize} employees</div>
        </div>
        ` : ''}
        
        ${sanitizedRequirements ? `
        <div class="field">
          <div class="label">Requirements:</div>
          <div class="highlight">${sanitizedRequirements}</div>
        </div>
        ` : ''}
        
        <div class="footer">
          <p>This B2B request was submitted from the Zora website.</p>
          <p><strong>Action Required:</strong> Contact ${sanitizedName} within 24 hours.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};