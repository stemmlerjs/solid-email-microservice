import { NodemailerEmailService } from "./services/nodemailer/NodemailerEmailService";
import { Mail } from "./models/Mail";
import { EmailAddress } from "./models/EmailAddress";
import { SendGridEmailService } from "./services/sendgrid/SendGridEmailService";
import sgMail from '@sendgrid/mail'
import { MailGunEmailService } from "./services/mailgun/MailgunEmailService";
import mailgun from 'mailgun-js';



async function main () {
  try {
    // const nodeMailerTransporter = await NodemailerEmailService.createTestTransporter();
    // const mailer = new NodemailerEmailService(nodeMailerTransporter);
    //const mailer = new SendGridEmailService('cccccccccccccccccc', sgMail)
    let mg = mailgun({ apiKey: 'key-0manwk43-4-6s6mfzotyh6mzwipaec13', domain: 'sandbox0dab64faaa744b479083d723f9443b4d.mailgun.org' })
    const mailer = new MailGunEmailService(mg)
    console.log("Started");

    const sourceAddressOrError = EmailAddress.create('acsandeep@gmail.com');
    const destinationAddressOrError = EmailAddress.create('sandeep@cloudnaut.com');
    const sourceAddress = sourceAddressOrError.getValue();
    const destinationAddress = destinationAddressOrError.getValue();

    const mailOrError = Mail.create({ 
      sourceAddress,
      destinationAddress,
      messageTitle: 'Hello world!',
      messageBody: 'This is an email Im sending.'
    });

    const mail = mailOrError.getValue();

    const result = await mailer.sendMail(mail);
    console.log(result);

  } catch (err) {
    console.log(err);
  }
}

main();

