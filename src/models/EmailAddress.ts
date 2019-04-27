import { Result } from "../common/Result";
import { validateEmailAddress } from '../utils/validateEmailAddress'

export interface IEmailAddress {
  email: string;
}

export class EmailAddress implements IEmailAddress {
  public email: string;

  get value (): string {
    return this.email;
  }

  private constructor (props: IEmailAddress) {
    this.email = props.email;
  }

  public static create (email: string): Result<EmailAddress> {
    
    if (!validateEmailAddress(email)) {
      return Result.fail<EmailAddress>(`Email address ${email} not valid`);
    }

    return Result.ok<EmailAddress>(new EmailAddress({ email }))
  }
}

