import * as path from 'path';
import * as Mustache from 'mustache';
import * as fs from 'fs';

type EmailPayload = {
  recipients: string[];
  subject: string;
  html: string;
};

export const sendOtpToUser = (user: any, otp: string) => {
  const templateString = fs.readFileSync(
    path.join(__dirname, '../../templates/otp.html'),
    'utf-8',
  );

  otp = otp.split('').join(' ');
  const rendered = Mustache.render(templateString, { otp });
  const emailData = {
    recipients: [user.email],
    subject: 'Your Verification token',
    html: rendered,
  };
  sendEmail(emailData);
};

export const getTemplateFile = (templateName: string) => {
  const templatePath = `../../templates/${templateName}.html`;
  return templatePath;
};

export const sendEmail = async (payload: EmailPayload) => {
  // const pubsub = new Pubsub();
  const data = {
    recipients: payload.recipients,
    subject: payload.subject,
    html: payload.html,
  };

  // pubsub.publish('EmailSendEvent', JSON.stringify(data));
};
