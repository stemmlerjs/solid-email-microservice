
import { IMailService, IMailTransmissionResult } from "../../models/MailService";
import nodemailer from 'nodemailer'
import { Mail } from "../../models/Mail";
import { ITransporterConfig } from "./ITransporterConfig";

export class NodemailerEmailService implements IMailService {

  private transporter: nodemailer.Transporter;

  constructor (transporter: nodemailer.Transporter) {
    this.transporter = transporter;
  }

  // Factory method
  public static async createTransporter (transporterConfig: ITransporterConfig) : Promise<nodemailer.Transporter> {
    return nodemailer.createTransport({
      host: transporterConfig.host,
      port: transporterConfig.port,
      secure: transporterConfig.secure, // upgrade later with STARTTLS
      auth: {
        user: transporterConfig.userName,
        pass: transporterConfig.password
      }
    });
  }

  // Factory method
  public static async createTestTransporter (): Promise<nodemailer.Transporter> {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    return nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass // generated ethereal password
      }
    });
  }

  async sendMail (mail: Mail): Promise<IMailTransmissionResult> {
    try {
      let info = await this.transporter.sendMail({
        from: mail.sourceAddress.email, // sender address
        to: mail.destinationAddress.email, // list of receivers
        subject: mail.messageTitle, // Subject line
        text: mail.messageBody, // plain text body
        // html: "<b>Hello world?</b>" // html body
      });
      return { message: `Message sent: ${info.messageId}`, success: true }
    } catch (err) {
      return { message: err.toString(), success: false }
    }
  }
}