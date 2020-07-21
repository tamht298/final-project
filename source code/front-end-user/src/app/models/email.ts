export class Email {
  fromAddress: string;
  subject: string;
  body: string;

  constructor(fromAddress: string, subject: string, body: string) {
    this.fromAddress = fromAddress;
    this.subject = subject;
    this.body = body;
  }
}
