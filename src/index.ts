import { NodemailerEmailService } from "./services/NodemailerEmailService";
import { Mail } from "./models/Mail";
import { EmailAddress } from "./models/EmailAddress";


async function main () {
  try {
    const nodeMailer = new NodemailerEmailService();
    await nodeMailer.init();
    console.log("Started");

    const sourceAddressOrError = EmailAddress.create('khalilstemmler@gmail.com');
    const destinationAddressOrError = EmailAddress.create('metroidman12@gmail.com');
    const sourceAddress = sourceAddressOrError.getValue();
    const destinationAddress = destinationAddressOrError.getValue();

    const mailOrError = Mail.create({ 
      sourceAddress,
      destinationAddress,
      messageTitle: 'Hello world!',
      messageBody: 'This is an email Im sending.'
    });

    const mail = mailOrError.getValue();

    const result = await nodeMailer.sendMail(mail);
    console.log(result);

  } catch (err) {
    console.log(err);
  }
}

main();

