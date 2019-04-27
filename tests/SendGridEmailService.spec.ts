

import { Mail } from '../src/models/Mail'
import { EmailAddress } from '../src/models/EmailAddress';
import { Result } from '../src/common/Result';
import { IMailTransmissionResult } from '../src/models/MailService';
import { SendGridEmailService } from '../src/services/sendgrid/SendGridEmailService';

let mail: Mail;
let mailOrError: Result<Mail>;
let sourceAddress: EmailAddress;
let destinationAddress: EmailAddress;
let mailer: SendGridEmailService;
let mailTransmissionResult: IMailTransmissionResult;

let sendgridMock = {
  send: jest.fn(async () => { }),
  setApiKey: jest.fn()
}

describe ('#SendGridEmailService', () => {

  beforeEach(() => {
    mail = null;
    mailOrError = null;
    sourceAddress = null;
    destinationAddress = null;
  });

  test('Can send mail from a nodemailer instance', async () => {
    mailer = new SendGridEmailService('hello', sendgridMock);

    sourceAddress = EmailAddress.create('khalilstemmler@gmail.com').getValue();
    destinationAddress = EmailAddress.create('dondraper@gmail.com').getValue();

    mailOrError = Mail.create({
      destinationAddress,
      sourceAddress,
      messageTitle: 'Hello world!',
      messageBody: 'This is a message body'
    });

    mail = mailOrError.getValue();

    mailTransmissionResult = await mailer.sendMail(mail);
    expect(mailTransmissionResult.success).toBeTruthy();

    expect(sendgridMock.send.mock.calls[0]).toEqual([{"from": "khalilstemmler@gmail.com", "subject": "Hello world!", "text": "This is a message body", "to": "dondraper@gmail.com"}]);
    expect(sendgridMock.send.mock.calls.length).toBe(1);
    expect(sendgridMock.setApiKey.mock.calls.length).toBe(1);
  });

});