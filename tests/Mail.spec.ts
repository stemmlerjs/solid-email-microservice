
import { Mail } from '../src/models/Mail'
import { EmailAddress } from '../src/models/EmailAddress';
import { Result } from '../src/common/Result';

let mail: Mail;
let mailOrError: Result<Mail>;
let sourceAddress: EmailAddress;
let destinationAddress: EmailAddress;
let replyToAddress: EmailAddress;

describe ('#Mail', () => {

  beforeEach(() => {
    mail = null;
    mailOrError = null;
    sourceAddress = null;
    destinationAddress = null;
    replyToAddress = null;
  })

  test('Can create mail object', () => {
    sourceAddress = EmailAddress.create('khalilstemmler@gmail.com').getValue();
    destinationAddress = EmailAddress.create('dondraper@gmail.com').getValue();

    mailOrError = Mail.create({
      destinationAddress,
      sourceAddress,
      messageTitle: 'Hello world!',
      messageBody: 'This is a message body'
    });

    expect(mailOrError.isSuccess).toBe(true);
    mail = mailOrError.getValue();
    expect(mail).toBeTruthy();
    expect(mail.destinationAddress.email).toBe('dondraper@gmail.com');
    expect(mail.sourceAddress.email).toBe('khalilstemmler@gmail.com');
    expect(mail.messageTitle).toBe('Hello world!');
    expect(mail.messageBody).toBe('This is a message body')
  });

  test('Should fail creating a mail object without source address', () => {
    sourceAddress = EmailAddress.create('khalilstemmler@gmail.com').getValue();

    mailOrError = Mail.create({
      destinationAddress,
      sourceAddress: null,
      messageTitle: 'Hello world!',
      messageBody: 'This is a message body'
    });

    expect(mailOrError.isFailure).toBeTruthy();
  });

  test('Should fail creating a mail object without destination address', () => {
    sourceAddress = EmailAddress.create('khalilstemmler@gmail.com').getValue();
    destinationAddress = EmailAddress.create('dondraper@gmail.com').getValue();

    mailOrError = Mail.create({
      destinationAddress: null,
      sourceAddress,
      messageTitle: 'Hello world!',
      messageBody: 'This is a message body'
    });

    expect(mailOrError.isFailure).toBeTruthy();
  });

})

