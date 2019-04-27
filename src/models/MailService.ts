import { IMail } from "./Mail";

export interface IMailTransmissionResult {
  success: boolean;
  message: string;
}

export interface IMailService {
  sendMail(mail: IMail): Promise<IMailTransmissionResult>; 
}