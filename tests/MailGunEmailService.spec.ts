

import { Mail } from '../src/models/Mail'
import { EmailAddress } from '../src/models/EmailAddress';
import { Result } from '../src/common/Result';
import { IMailTransmissionResult } from '../src/models/MailService';
import { MailGunEmailService } from '../src/services/mailgun/MailgunEmailService';
import { send } from 'process';


let mail: Mail;
let mailOrError: Result<Mail>;
let sourceAddress: EmailAddress;
let destinationAddress: EmailAddress;
let mailer: MailGunEmailService;
let mailTransmissionResult: IMailTransmissionResult;

let mailgunMock = {
  messages: jest.fn(() => {
    return {
      send: jest.fn(async () => { })
    }
  })
}


describe ('#MailGunEmailService', () => {

  beforeEach(() => {
    jest.setTimeout(2000);
    mail = null;
    mailOrError = null;
    sourceAddress = null;
    destinationAddress = null;
  });

  test('Can send mail from a MailGunEmailService instance', async () => {
    mailer = new MailGunEmailService(mailgunMock);

    sourceAddress = EmailAddress.create('acsandeep@gmail.com').getValue();
    destinationAddress = EmailAddress.create('ranajit@cloudnaut.com').getValue();

    mailOrError = Mail.create({
      destinationAddress,
      sourceAddress,
      messageTitle: 'Hello world!',
      messageBody: 'This is a message body'
    });

    mail = mailOrError.getValue();

    mailTransmissionResult = await mailer.sendMail(mail);
    expect(mailTransmissionResult.success).toBeTruthy();

    //expect(mailgunMock.messages().send.mock.calls[0]).toEqual([{"from": "acsandeep@gmail.com", "subject": "Hello world!", "text": "This is a message body", "to": "ranajit@cloudnaut.com"}]);
    //expect(mailgunMock.messages().send.mock.calls.length).toBe(1);
  });

});