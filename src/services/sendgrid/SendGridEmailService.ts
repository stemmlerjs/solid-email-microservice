
import { IMailService, IMailTransmissionResult } from "../../models/MailService";
import { Mail } from "../../models/Mail";

export class SendGridEmailService implements IMailService {
  private sendgrid: any;

  constructor (apiKey: string, sgInstance: any) {
    this.sendgrid = sgInstance
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
      await this.sendgrid.send(msg);
      return { message: 'Success', success: true }
    } catch (err) {
      return { message: err.toString(), success: false }
    }
  }
}

