export class UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  image?: string;

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }


}
