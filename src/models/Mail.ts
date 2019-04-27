
import { Result } from "../common/Result";
import { EmailAddress } from "./EmailAddress";
import { Guard } from "../common/Guard";

export interface IMail {
  sourceAddress: EmailAddress;
  destinationAddress: EmailAddress;
  messageTitle: string;
  messageBody: string;
  replyToAddress?: EmailAddress;
}

export class Mail implements IMail {

  public sourceAddress: EmailAddress;
  public destinationAddress: EmailAddress;
  public messageTitle: string;
  public messageBody: string;
  public replyToAddress?: EmailAddress;

  private constructor (props: IMail) {
    this.sourceAddress = props.sourceAddress;
    this.destinationAddress = props.destinationAddress;
    this.messageTitle = props.messageTitle;
    this.messageBody = props.messageBody;
    this.replyToAddress = props.replyToAddress;
  }

  public static create (props: IMail): Result<Mail> {
    const sourceAddressOrError = Guard.againstNullOrUndefined(props.sourceAddress, 'sourceAddress');
    const destinationAddressOrError = Guard.againstNullOrUndefined(props.destinationAddress, 'destinationAddress');
    const titleOrError = Guard.againstNullOrUndefined(props.messageTitle, 'messageTitle');
    const bodyOrError = Guard.againstNullOrUndefined(props.messageBody, 'messageBody');
    const propsResult = Result.combine([ 
      sourceAddressOrError,
      destinationAddressOrError,
      titleOrError,
      bodyOrError
    ]);

    if (propsResult.isFailure) {
      return Result.fail<Mail>(propsResult.error);
    }

    // Validate creating emails
    return Result.ok<Mail>(new Mail(props));
  }
}