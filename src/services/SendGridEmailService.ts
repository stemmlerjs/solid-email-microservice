import { IMailService, IMailTransmissionResult } from "../models/MailService";
import { Mail } from "../models/Mail";
import sgMail from '@sendgrid/mail'

export class SendGridEmailService implements IMailService {
  private sendgrid: any;

  constructor (apiKey: string) {
    this.sendgrid = sgMail;
    this.sendgrid.setApiKey(apiKey);
  }

  async sendMail (email: Mail): Promise<IMailTransmissionResult> {
    const msg = {
      to: email.destinationAddress.email,
      from: email.sourceAddress.email,
      subject: email.messageTitle,
      text: email.messageBody,
      // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    
    try {
      await sgMail.send(msg);
      return { message: 'Success', success: true }
    } catch (err) {
      return { message: err.toString(), success: false }
    }
  }
}

